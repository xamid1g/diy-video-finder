#!/usr/bin/env python3
"""
DIY Video Finder - Multi-Agent System with YouTube Integration
=============================================================

Agents:
1. Video Research Agent - Searches YouTube for real videos
2. Trockenbaumeister Agent - Quality & standards review  
3. Content Curator Agent - Categorizes and organizes videos
4. Developer Agent - Creates/updates the website code

Uses iterative improvement: loads existing data and enhances it.
"""

# Suppress noisy logging from LLM libraries
import logging
import warnings
warnings.filterwarnings("ignore")
logging.getLogger("httpx").setLevel(logging.ERROR)
logging.getLogger("openai").setLevel(logging.ERROR)
logging.getLogger("litellm").setLevel(logging.ERROR)
logging.getLogger("LiteLLM").setLevel(logging.ERROR)
logging.getLogger("crewai").setLevel(logging.WARNING)
logging.basicConfig(level=logging.ERROR)

import os
import json
import argparse
from pathlib import Path
from datetime import datetime
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, Process, LLM
from crewai.tools import BaseTool
from pydantic import Field
from typing import Optional

# Load environment variables
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path, override=True)

# =============================================================================
# CLI ARGUMENTS
# =============================================================================
def parse_args():
    parser = argparse.ArgumentParser(
        description="DIY Video Finder - Multi-Agent Video Curation System",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python video_curator.py                    # Full pipeline
  python video_curator.py --dry-run          # Test without API calls
  python video_curator.py --skip-design      # Skip CSS regeneration
  python video_curator.py --max-videos 5     # Limit to 5 videos
        """
    )
    parser.add_argument(
        "--dry-run", "-d",
        action="store_true",
        help="Run without API calls (uses mock data for testing)"
    )
    parser.add_argument(
        "--skip-design", "-s",
        action="store_true",
        help="Skip the CSS design task (faster iteration)"
    )
    parser.add_argument(
        "--max-videos", "-m",
        type=int,
        default=10,
        help="Maximum number of videos to process (default: 10)"
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Show detailed agent output"
    )
    parser.add_argument(
        "--queries", "-q",
        nargs="+",
        default=["Trockenbau Anleitung", "Rigips Decke", "Trockenbau reparieren"],
        help="YouTube search queries (default: Trockenbau Anleitung, Rigips Decke, Trockenbau reparieren)"
    )
    return parser.parse_args()

# Parse CLI args early (before any API calls)
args = parse_args()

# =============================================================================
# CONFIGURATION
# =============================================================================
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
DRY_RUN = args.dry_run

if not GITHUB_TOKEN:
    raise ValueError("GITHUB_TOKEN not found in .env")

if not YOUTUBE_API_KEY:
    print("⚠️  WARNING: YOUTUBE_API_KEY not set - YouTube search will not work!")
    print("   Get one at: https://console.cloud.google.com/apis/credentials")

GITHUB_API_BASE = "https://models.inference.ai.azure.com"
os.environ["OPENAI_API_KEY"] = GITHUB_TOKEN
os.environ["OPENAI_API_BASE"] = GITHUB_API_BASE

# Video categories for Trockenbau
CATEGORIES = {
    "grundlagen": {
        "de": "Grundlagen",
        "en": "Basics",
        "keywords": ["anleitung", "grundlagen", "basics", "einführung", "anfänger", "tutorial", "lernen"]
    },
    "dachausbau": {
        "de": "Dachausbau", 
        "en": "Attic Conversion",
        "keywords": ["dach", "dachgeschoss", "dachschräge", "dämmung", "attic", "roof"]
    },
    "vorwand": {
        "de": "Vorwandinstallation",
        "en": "Wall Installation", 
        "keywords": ["vorwand", "vorsatzschale", "installation", "wand", "wall"]
    },
    "decke": {
        "de": "Deckenmontage",
        "en": "Ceiling Installation",
        "keywords": ["decke", "montagedecke", "abhängen", "ceiling"]
    },
    "reparatur": {
        "de": "Reparatur",
        "en": "Repair",
        "keywords": ["reparatur", "reparieren", "loch", "riss", "repair", "fix", "hole", "crack"]
    },
    "werkzeuge": {
        "de": "Werkzeuge",
        "en": "Tools",
        "keywords": ["werkzeug", "tool", "zubehör", "equipment"]
    },
    "tueren": {
        "de": "Türen & Öffnungen",
        "en": "Doors & Openings",
        "keywords": ["tür", "türöffnung", "door", "opening", "ausschnitt"]
    },
    "spachteln": {
        "de": "Spachteln & Finish",
        "en": "Taping & Finishing",
        "keywords": ["spachtel", "verspachteln", "fugen", "finish", "schleifen", "tape", "mud"]
    }
}

# =============================================================================
# MOCK DATA FOR DRY-RUN MODE
# =============================================================================
MOCK_VIDEOS = [
    {"id": "mwEnTFm80-M", "title": "Wand einziehen | HORNBACH Meisterschmiede", "channel": "HORNBACH", "views": "1.2M"},
    {"id": "obvKgvIv_Vg", "title": "Erstellung von Montagedecken - Rigips", "channel": "SAINT-GOBAIN RIGIPS", "views": "890K"},
    {"id": "uoU_BlY_2Lw", "title": "Erstellung von Türöffnungen - Rigips", "channel": "SAINT-GOBAIN RIGIPS", "views": "650K"},
    {"id": "i7jZ9suB9y8", "title": "Vorsatzschalen mit Unterkonstruktion", "channel": "SAINT-GOBAIN RIGIPS", "views": "720K"},
    {"id": "abc123test", "title": "Trockenbau Grundlagen für Anfänger", "channel": "Handwerker Tips", "views": "450K"},
    {"id": "def456test", "title": "Rigips Decke abhängen Anleitung", "channel": "DIY Academy", "views": "380K"},
]

MOCK_VIDEO_DETAILS = {
    "mwEnTFm80-M": {"title": "Wand einziehen | HORNBACH Meisterschmiede", "channel": "HORNBACH", "description": "Professionelle Anleitung zum Errichten einer Trockenbauwand mit Metallständerwerk.", "tags": ["Trockenbau", "Rigips", "Wand", "DIY"], "views": "1.2M", "viewCount": 1200000},
    "obvKgvIv_Vg": {"title": "Erstellung von Montagedecken - Rigips", "channel": "SAINT-GOBAIN RIGIPS", "description": "Offizielle RIGIPS Anleitung für abgehängte Decken nach DIN 18181.", "tags": ["Decke", "Rigips", "Montage"], "views": "890K", "viewCount": 890000},
    "uoU_BlY_2Lw": {"title": "Erstellung von Türöffnungen - Rigips", "channel": "SAINT-GOBAIN RIGIPS", "description": "Türzargen und Öffnungen in Trockenbauwänden fachgerecht erstellen.", "tags": ["Tür", "Öffnung", "Trockenbau"], "views": "650K", "viewCount": 650000},
    "i7jZ9suB9y8": {"title": "Vorsatzschalen mit Unterkonstruktion", "channel": "SAINT-GOBAIN RIGIPS", "description": "Vorsatzschalen zur Wandverkleidung mit CW/UW-Profilen.", "tags": ["Vorsatzschale", "Dämmung", "Wand"], "views": "720K", "viewCount": 720000},
}

# =============================================================================
# LLM CONFIGURATION
# =============================================================================
if not DRY_RUN:
    print("🤖 Initializing Multi-Agent System (GPT-4o)...")
else:
    print("🧪 DRY-RUN MODE - Using mock data, no API calls")

# Using gpt-4o: 50 requests/day, 128K context (vs gpt-4o-mini: 150/day, 8K context)
# gpt-4o is better for complex reasoning and longer prompts
gpt4o_llm = LLM(
    model="openai/gpt-4o",
    api_key=GITHUB_TOKEN,
    base_url=GITHUB_API_BASE,
)

# =============================================================================
# YOUTUBE SEARCH TOOL
# =============================================================================
class YouTubeSearchTool(BaseTool):
    """Search YouTube for real drywall tutorial videos"""
    
    name: str = "YouTube Video Search"
    description: str = """Search YouTube for Trockenbau videos. Input: search query. Returns: JSON with videos (up to 15 results)."""
    
    def _run(self, query: str) -> str:
        # DRY-RUN: Return mock data
        if DRY_RUN:
            return json.dumps({"videos": MOCK_VIDEOS[:args.max_videos], "mock": True}, ensure_ascii=False)
        
        if not YOUTUBE_API_KEY:
            return json.dumps({"error": "YOUTUBE_API_KEY not set"})
        
        try:
            from googleapiclient.discovery import build
            youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)
            
            search_response = youtube.search().list(
                q=query,
                part='id,snippet',
                type='video',
                maxResults=15,  # More results to find new videos
                order='relevance',  # Better for finding quality tutorials
                relevanceLanguage='de',
                videoDuration='medium',  # Filter out very short clips
            ).execute()
            
            videos = []
            video_ids = []
            
            for item in search_response.get('items', []):
                video_id = item['id']['videoId']
                video_ids.append(video_id)
                videos.append({
                    'id': video_id,
                    'title': item['snippet']['title'][:60],  # Truncate
                    'channel': item['snippet']['channelTitle'][:30],
                })
            
            # Get view counts
            if video_ids:
                stats_response = youtube.videos().list(
                    part='statistics',
                    id=','.join(video_ids)
                ).execute()
                
                for stats_item in stats_response.get('items', []):
                    vid_id = stats_item['id']
                    for video in videos:
                        if video['id'] == vid_id:
                            views = int(stats_item.get('statistics', {}).get('viewCount', 0))
                            if views >= 1000000:
                                video['views'] = f"{views//1000000}M"
                            elif views >= 1000:
                                video['views'] = f"{views//1000}K"
                            else:
                                video['views'] = str(views)
                            break
            
            return json.dumps({"videos": videos}, ensure_ascii=False)
            
        except Exception as e:
            return json.dumps({"error": str(e)[:100]})


class LoadExistingDataTool(BaseTool):
    """Load existing video data from output/script.js"""
    
    name: str = "Load Existing Videos"
    description: str = "Load current video data from the website. Returns JSON with video count and IDs."
    
    def _run(self, _: str = "") -> str:
        try:
            import re
            script_path = Path(__file__).parent / "output" / "script.js"
            if script_path.exists():
                with open(script_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Extract youtubeId values from the script
                youtube_ids = re.findall(r'youtubeId:\s*["\']([^"\']+)["\']', content)
                categories = re.findall(r'category:\s*["\']([^"\']+)["\']', content)
                
                if youtube_ids:
                    summary = [{"id": vid, "cat": cat} for vid, cat in zip(youtube_ids, categories)]
                    return json.dumps({
                        "count": len(youtube_ids), 
                        "existing": summary,
                        "message": "Diese Video-IDs bereits auf der Website - keine Duplikate hinzufügen!"
                    }, ensure_ascii=False)
            return json.dumps({"count": 0, "message": "Keine existierenden Videos gefunden"})
        except Exception as e:
            return json.dumps({"error": str(e)[:50]})


class SaveStylesTool(BaseTool):
    """Save CSS styles directly to output/styles.css"""
    
    name: str = "Save Styles"
    description: str = """Save CSS styles directly to output/styles.css.
    Input: Complete CSS code
    Returns: Confirmation message."""
    
    def _run(self, css_code: str) -> str:
        # DRY-RUN: Don't write files
        if DRY_RUN:
            return "🧪 DRY-RUN: Would save CSS to output/styles.css (no file written)"
        
        try:
            output_dir = Path(__file__).parent / "output"
            output_dir.mkdir(exist_ok=True)
            
            styles_path = output_dir / "styles.css"
            
            with open(styles_path, 'w', encoding='utf-8') as f:
                f.write(css_code)
            
            return f"✅ Updated output/styles.css"
            
        except Exception as e:
            return f"❌ Error saving styles: {str(e)}"


# Maximum videos per category
MAX_VIDEOS_PER_CATEGORY = 5


class SaveVideoDataTool(BaseTool):
    """Save curated video data directly to output/script.js with smart merging"""
    
    name: str = "Save Video Data"
    description: str = """Save the video data directly to output/script.js.
    Input: JavaScript code starting with 'const videos = [...]'
    Returns: Confirmation message.
    
    Smart features:
    - Merges new videos with existing ones (no duplicates)
    - Keeps max 5 videos per category (subdomain)
    - Sorts by rating (best first)"""
    
    def _parse_videos_from_js(self, js_content: str) -> list:
        """Extract video objects from JavaScript code or JSON"""
        import re
        import json
        
        content = js_content.strip()
        
        # Try 1: Direct JSON array
        if content.startswith('['):
            try:
                return json.loads(content)
            except:
                pass
        
        # Try 2: JSON with videos key
        if content.startswith('{'):
            try:
                data = json.loads(content)
                if 'videos' in data:
                    return data['videos']
                return [data] if 'youtubeId' in data else []
            except:
                pass
        
        # Try 3: Find const videos = [...]; - use greedy match to ];
        match = re.search(r'const videos\s*=\s*(\[[\s\S]*\]);', content)
        if match:
            array_str = match.group(1)
        else:
            # Try 4: Find any array starting with [ and containing youtubeId
            match = re.search(r'(\[[\s\S]*\])', content)
            if match and 'youtubeId' in match.group(1):
                array_str = match.group(1)
            else:
                return []
        
        # Convert JS object syntax to JSON-compatible
        json_str = array_str
        
        # Replace single quotes with double quotes (careful not to break apostrophes)
        json_str = re.sub(r"'([^']*)'", r'"\1"', json_str)
        
        # Add quotes around unquoted keys (word followed by colon)
        json_str = re.sub(r'([{,]\s*)(\w+)(\s*):', r'\1"\2"\3:', json_str)
        
        # Fix already-quoted keys that got double-quoted
        json_str = re.sub(r'""(\w+)""', r'"\1"', json_str)
        
        # Remove trailing commas before ] or }
        json_str = re.sub(r',(\s*[}\]])', r'\1', json_str)
        
        try:
            return json.loads(json_str)
        except json.JSONDecodeError as e:
            print(f"JSON parse error: {e}")
            # Fallback: extract individual video objects
            videos = []
            # Find all youtubeId values and build minimal objects
            for m in re.finditer(r'youtubeId["\s:]+["\']?([a-zA-Z0-9_-]+)["\']?', content):
                vid = m.group(1)
                # Try to find associated data
                videos.append({
                    'youtubeId': vid,
                    'title': {'de': f'Video {vid}', 'en': f'Video {vid}'},
                    'description': {'de': '', 'en': ''},
                    'category': 'grundlagen',
                    'rating': 4.0,
                    'views': '0',
                    'channel': 'Unknown'
                })
            return videos
    
    def _merge_videos(self, existing: list, new_videos: list) -> list:
        """Merge videos, remove duplicates, sort by rating, limit per category"""
        # Build dict by youtubeId to remove duplicates (new videos override existing)
        video_map = {}
        
        # Add existing videos
        for v in existing:
            vid = v.get('youtubeId')
            if vid:
                video_map[vid] = v
        
        # Add/override with new videos
        for v in new_videos:
            vid = v.get('youtubeId')
            if vid:
                video_map[vid] = v
        
        # Group by category
        by_category = {}
        for v in video_map.values():
            cat = v.get('category', 'grundlagen')
            if cat not in by_category:
                by_category[cat] = []
            by_category[cat].append(v)
        
        # Sort each category by rating (descending) and limit to MAX_VIDEOS_PER_CATEGORY
        result = []
        for cat, videos in by_category.items():
            # Sort by rating (best first)
            sorted_videos = sorted(videos, key=lambda x: float(x.get('rating', 0)), reverse=True)
            # Keep only top N per category
            top_videos = sorted_videos[:MAX_VIDEOS_PER_CATEGORY]
            result.extend(top_videos)
        
        # Final sort: by rating overall
        result.sort(key=lambda x: float(x.get('rating', 0)), reverse=True)
        
        return result
    
    def _videos_to_js(self, videos: list) -> str:
        """Convert video list back to JavaScript code"""
        lines = ["const videos = ["]
        for v in videos:
            # Build each video object manually to preserve the desired format
            title = v.get('title', {})
            desc = v.get('description', {})
            
            title_de = title.get('de', '') if isinstance(title, dict) else str(title)
            title_en = title.get('en', title_de) if isinstance(title, dict) else str(title)
            desc_de = desc.get('de', '') if isinstance(desc, dict) else str(desc)
            desc_en = desc.get('en', desc_de) if isinstance(desc, dict) else str(desc)
            
            line = '  {title:{de:"%s",en:"%s"},description:{de:"%s",en:"%s"},rating:%.1f,views:"%s",category:"%s",youtubeId:"%s",channel:"%s"},' % (
                title_de.replace('"', '\\"'),
                title_en.replace('"', '\\"'),
                desc_de.replace('"', '\\"'),
                desc_en.replace('"', '\\"'),
                float(v.get('rating', 0)),
                v.get('views', '0'),
                v.get('category', 'grundlagen'),
                v.get('youtubeId', ''),
                v.get('channel', 'Unknown')
            )
            lines.append(line)
        lines.append("];")
        return "\n".join(lines)
    
    def _run(self, js_code: str) -> str:
        # DRY-RUN: Don't write files
        if DRY_RUN:
            video_count = js_code.count("youtubeId")
            return f"🧪 DRY-RUN: Would process {video_count} new videos (no file written)"
        
        try:
            output_dir = Path(__file__).parent / "output"
            output_dir.mkdir(exist_ok=True)
            
            script_path = output_dir / "script.js"
            
            # Read existing script.js
            existing_content = ""
            existing_videos = []
            if script_path.exists():
                with open(script_path, 'r', encoding='utf-8') as f:
                    existing_content = f.read()
                existing_videos = self._parse_videos_from_js(existing_content)
            
            # Parse new videos from input
            new_videos = self._parse_videos_from_js(js_code)
            
            if not new_videos:
                # Show first 500 chars of input for debugging
                preview = js_code[:500].replace('\n', ' ')
                return f"❌ Error: Could not parse any videos from input. Preview: {preview}..."
            
            # Merge: deduplicate, sort by rating, limit per category
            merged_videos = self._merge_videos(existing_videos, new_videos)
            
            # Generate new JS code
            new_js_code = self._videos_to_js(merged_videos)
            
            # Replace videos array in existing content or create new
            if "const videos" in existing_content:
                import re
                new_content = re.sub(
                    r'const videos\s*=\s*\[[\s\S]*?\];',
                    new_js_code,
                    existing_content
                )
            else:
                new_content = new_js_code + "\n\n" + existing_content
            
            with open(script_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            # Stats
            new_count = len(new_videos)
            existing_count = len(existing_videos)
            merged_count = len(merged_videos)
            
            # Count per category
            cat_counts = {}
            for v in merged_videos:
                cat = v.get('category', 'other')
                cat_counts[cat] = cat_counts.get(cat, 0) + 1
            
            cat_summary = ", ".join(f"{k}:{v}" for k, v in sorted(cat_counts.items()))
            
            return f"✅ Merged videos: {existing_count} existing + {new_count} new → {merged_count} total (max {MAX_VIDEOS_PER_CATEGORY}/category)\n📊 Per category: {cat_summary}"
            
        except Exception as e:
            import traceback
            return f"❌ Error saving: {str(e)}\n{traceback.format_exc()}"


class GetVideoDetailsTool(BaseTool):
    """Get detailed information about a YouTube video for quality review"""
    
    name: str = "Get Video Details"
    description: str = """Ruft detaillierte Informationen zu einem YouTube-Video ab.
    Input: YouTube Video ID (z.B. "mwEnTFm80-M")
    Returns: Titel, Beschreibung, Kanal, Tags, Views - wichtig für die Qualitätsprüfung."""
    
    def _run(self, video_id: str) -> str:
        vid_id = video_id.strip()
        
        # DRY-RUN: Return mock data
        if DRY_RUN:
            if vid_id in MOCK_VIDEO_DETAILS:
                return json.dumps({"id": vid_id, **MOCK_VIDEO_DETAILS[vid_id], "mock": True}, ensure_ascii=False)
            return json.dumps({"id": vid_id, "title": f"Mock Video {vid_id}", "channel": "Mock Channel", "description": "Mock description for testing", "tags": ["mock"], "views": "100K", "viewCount": 100000, "mock": True})
        
        if not YOUTUBE_API_KEY:
            return json.dumps({"error": "YOUTUBE_API_KEY not set"})
        
        try:
            from googleapiclient.discovery import build
            youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)
            
            response = youtube.videos().list(
                part='snippet,contentDetails,statistics',
                id=video_id.strip()
            ).execute()
            
            if not response.get('items'):
                return json.dumps({"error": f"Video {video_id} not found"})
            
            item = response['items'][0]
            snippet = item.get('snippet', {})
            stats = item.get('statistics', {})
            
            # Beschreibung kürzen für Token-Limit
            description = snippet.get('description', '')[:500]
            
            # Views formatieren
            views = int(stats.get('viewCount', 0))
            if views >= 1000000:
                views_formatted = f"{views//1000000}M"
            elif views >= 1000:
                views_formatted = f"{views//1000}K"
            else:
                views_formatted = str(views)
            
            return json.dumps({
                "id": video_id,
                "title": snippet.get('title', ''),
                "channel": snippet.get('channelTitle', ''),
                "description": description,
                "tags": snippet.get('tags', [])[:10],  # Nur erste 10 Tags
                "duration": item.get('contentDetails', {}).get('duration', ''),
                "views": views_formatted,
                "viewCount": views,
                "likeCount": stats.get('likeCount', 0),
            }, ensure_ascii=False)
            
        except Exception as e:
            return json.dumps({"error": str(e)[:100]})


# Initialize tools
youtube_tool = YouTubeSearchTool()
load_data_tool = LoadExistingDataTool()
save_data_tool = SaveVideoDataTool()
save_styles_tool = SaveStylesTool()
video_details_tool = GetVideoDetailsTool()

# =============================================================================
# AGENT DEFINITIONS
# =============================================================================

# 1. Video Research Agent
video_research_agent = Agent(
    role="YouTube Researcher",
    goal="Find top Trockenbau tutorial videos on YouTube",
    backstory="Expert at finding high-quality German DIY drywall videos with high view counts.",
    llm=gpt4o_llm,
    tools=[youtube_tool, load_data_tool],
    verbose=True,
    memory=False
)

# 2. Trockenbaumeister Agent (Quality Expert)
trockenbaumeister_agent = Agent(
    role="Geprüfter Trockenbaumeister",
    goal="Prüfe Videos auf fachliche Korrektheit nach DIN 18181, DIN 18182 und DIN 4102 Standards",
    backstory="""Du bist ein geprüfter Trockenbaumeister mit 25 Jahren Berufserfahrung und Meisterbrief der Handwerkskammer.
    
    Dein Fachwissen umfasst:
    - DIN 18181: Gipsplatten - Verarbeitung (Schraubenabstände: max. 25cm bei Wänden, 17cm bei Decken)
    - DIN 18182: Zubehör für Gipsplatten (CW/UW-Profile, Direktabhänger, Noniusabhänger)
    - DIN 4102: Brandschutz (F30, F60, F90 Klassifizierungen, Fugenversatz bei Doppelbeplankung)
    - Schallschutz nach DIN 4109 (Rw-Werte, entkoppelte Beplankung, Mineralwolle-Dämmung)
    
    Du erkennst häufige Fehler:
    - Falsche Schraubenabstände oder Schraubentypen (Schnellbauschrauben vs. Bohrspitzschrauben)
    - Fehlende Randdämmstreifen bei Wand-Boden-Anschlüssen
    - Kreuzfugen statt versetzter Fugen
    - Falsche Verspachtelung (Q1-Q4 Qualitätsstufen)
    - Unzureichende Unterkonstruktion für Lasten (Waschtische, Hängeschränke)
    
    WICHTIG: Du MUSST das "Get Video Details" Tool verwenden um die Beschreibung und Tags jedes Videos zu prüfen, bevor du es bewertest!
    
    Du bewertest Videos kritisch und lehnst solche ab, die gefährliche oder falsche Techniken zeigen.""",
    llm=gpt4o_llm,  # GPT-4o ist besser bei Tool-Nutzung als Llama
    tools=[video_details_tool],  # Tool um Video-Beschreibungen und Tags zu prüfen
    verbose=True,
    memory=False
)

# 3. Content Curator Agent
curator_agent = Agent(
    role="Content Curator",
    goal="Categorize videos and create bilingual DE/EN content",
    backstory="Organizes videos into categories: grundlagen, dachausbau, vorwand, decke, reparatur, werkzeuge, tueren, spachteln.",
    llm=gpt4o_llm,
    verbose=True,
    memory=False
)

# 4. Developer Agent
developer_agent = Agent(
    role="Frontend Developer",
    goal="Generate JavaScript video array for the website",
    backstory="Creates clean JS code with bilingual video data.",
    llm=gpt4o_llm,
    tools=[save_data_tool],
    verbose=True,
    memory=False
)

# 5. Senior Frontend Designer Agent
senior_designer_agent = Agent(
    role="Senior UI/UX Designer",
    goal="Create a modern, professional design for the Trockenbau tutorial website",
    backstory="""Du bist ein preisgekrönter UI/UX Designer mit 15 Jahren Erfahrung bei führenden Design-Agenturen.
    
    Dein Designstil:
    - CLEAN & MODERN: Viel Whitespace, klare Typografie, keine überladenen Elemente
    - PROFESSIONELLE FARBPALETTE: Dunkles Blau (#1a365d) als Hauptfarbe für Vertrauen,
      kombiniert mit einem warmen Akzent (#f6ad55 Orange/Amber) für CTAs
    - SUBTILE GRADIENTEN: Sanfte Verläufe statt harte Farben
    - MICRO-INTERACTIONS: Smooth Hover-Effekte, Transitions (0.2-0.3s ease)
    - CARD-BASED DESIGN: Abgerundete Ecken (12-16px), subtile Schatten
    - DARK MODE READY: Farben die auch invertiert gut aussehen
    
    Du vermeidest:
    - Grelle, unprofessionelle Farben (knalliges Orange, Neonfarben)
    - Zu viele verschiedene Farben (max. 3-4 Hauptfarben)
    - Überladene Gradients oder Patterns
    - Schlechte Kontraste (Accessibility ist wichtig!)
    
    Inspiriert von: Linear.app, Stripe, Vercel - moderne SaaS Ästhetik.""",
    llm=gpt4o_llm,
    tools=[save_styles_tool],
    verbose=True,
    memory=False
)

# =============================================================================
# TASK DEFINITIONS
# =============================================================================

# Task 1: Research NEW videos
research_task = Task(
    description="""1. Use "Load Existing Videos" to get current video IDs
2. Search YouTube with "YouTube Video Search" for: "Trockenbau Anleitung", "Rigips montieren"
3. Return ONLY videos NOT in existing list
Output: JSON array [{id, title, channel, views}]""",
    agent=video_research_agent,
    expected_output="JSON array of NEW videos with id, title, channel, views"
)

# Task 2: Quality review
quality_review_task = Task(
    description="""Review videos from research. Use "Get Video Details" for 3-5 videos.
Rate 4-5 stars for: RIGIPS, HORNBACH, Knauf, professional channels.
Reject: clickbait, unsafe techniques.
Output: JSON [{videoId, views, rating, approved: true/false}]""",
    agent=trockenbaumeister_agent,
    context=[research_task],
    expected_output="JSON array with videoId, views, rating, approved"
)

# Task 3: Categorize
curation_task = Task(
    description="""For approved videos, create bilingual content.
Categories: grundlagen, vorwand, decke, dachausbau, reparatur, tueren, spachteln
Output: JSON [{youtubeId, title:{de,en}, description:{de,en}, category, rating, views, channel}]""",
    agent=curator_agent,
    context=[research_task, quality_review_task],
    expected_output="JSON array with youtubeId, title, description, category, rating, views, channel"
)

# Task 4: Save to website
development_task = Task(
    description="""Convert curated videos to JavaScript and save.
Format: const videos = [{title:{de:"...",en:"..."},description:{de:"...",en:"..."},rating:5.0,views:"1M",category:"vorwand",youtubeId:"VIDEO_ID",channel:"Channel"}];
Use "Save Video Data" tool to save!""",
    agent=developer_agent,
    context=[curation_task],
    expected_output="Videos saved to output/script.js"
)

# Task 5: Update CSS styles
design_task = Task(
    description="""Create modern CSS for the drywall tutorial website.
Include: body, header, .video-grid, .video-card, .modal, responsive @media.
Colors: --primary: #1e3a5f, --accent: #f59e0b.
Use "Save Styles" tool to save to output/styles.css.""",
    agent=senior_designer_agent,
    expected_output="CSS saved to output/styles.css"
)

# =============================================================================
# CREW CONFIGURATION
# =============================================================================
crew = Crew(
    agents=[video_research_agent, trockenbaumeister_agent, curator_agent, developer_agent, senior_designer_agent],
    tasks=[research_task, quality_review_task, curation_task, development_task, design_task],
    process=Process.sequential,
    verbose=args.verbose if 'args' in dir() else True,
    memory=False
)

# Crew without design task (for --skip-design)
crew_no_design = Crew(
    agents=[video_research_agent, trockenbaumeister_agent, curator_agent, developer_agent],
    tasks=[research_task, quality_review_task, curation_task, development_task],
    process=Process.sequential,
    verbose=args.verbose if 'args' in dir() else True,
    memory=False
)


def run_video_curation():
    """Run the video curation pipeline"""
    print("\n" + "="*70)
    print("🎬 DIY VIDEO FINDER - Multi-Agent Video Curation System")
    print("="*70)
    print(f"📅 Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"🧪 Mode: {'DRY-RUN (mock data)' if DRY_RUN else 'LIVE (real APIs)'}")
    print(f"🔑 YouTube API: {'✅ Configured' if YOUTUBE_API_KEY else '⚠️ Missing (OK for dry-run)'}")
    print(f"📊 Max Videos: {args.max_videos}")
    print(f"🎨 Design Task: {'⏭️ Skipped' if args.skip_design else '✅ Enabled'}")
    print(f"🤖 Agents: Research → Trockenbaumeister → Curator → Developer{'' if args.skip_design else ' → Designer'}")
    print("="*70 + "\n")
    
    if not DRY_RUN and not YOUTUBE_API_KEY:
        print("❌ ERROR: YOUTUBE_API_KEY not set in .env (use --dry-run to test without API)")
        return None
    
    # Select crew based on --skip-design flag
    active_crew = crew_no_design if args.skip_design else crew
    
    # Run the crew
    result = active_crew.kickoff()
    
    print("\n" + "="*70)
    print("✅ VIDEO CURATION COMPLETE")
    print("="*70)
    
    return result


if __name__ == "__main__":
    result = run_video_curation()
    
    if result:
        print("\n📄 Final Output:")
        print("-"*70)
        print(str(result)[:2000])  # Print first 2000 chars
        
        # Verify output files
        script_path = Path(__file__).parent / "output" / "script.js"
        styles_path = Path(__file__).parent / "output" / "styles.css"
        
        if script_path.exists():
            print(f"\n✅ Video data saved to: {script_path}")
        if styles_path.exists() and not args.skip_design:
            print(f"✅ Styles saved to: {styles_path}")
        
        print("\n🌐 Open output/index.html in browser to view the website!")
        
        if DRY_RUN:
            print("\n⚠️  DRY-RUN completed - no real API calls were made")
            print("   Run without --dry-run for production use")
