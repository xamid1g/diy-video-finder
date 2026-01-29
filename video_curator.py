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
# CONFIGURATION
# =============================================================================
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

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
# LLM CONFIGURATION
# =============================================================================
print("🤖 Initializing Multi-Agent System (GPT-4o-mini)...")

# Using gpt-4o-mini: 150 requests/day limit (vs gpt-4o: 50/day)
gpt4o_llm = LLM(
    model="openai/gpt-4o-mini",
    api_key=GITHUB_TOKEN,
    base_url=GITHUB_API_BASE,
)

# =============================================================================
# YOUTUBE SEARCH TOOL
# =============================================================================
class YouTubeSearchTool(BaseTool):
    """Search YouTube for real drywall tutorial videos"""
    
    name: str = "YouTube Video Search"
    description: str = """Search YouTube for Trockenbau videos. Input: search query. Returns: JSON with top 5 videos."""
    
    def _run(self, query: str) -> str:
        if not YOUTUBE_API_KEY:
            return json.dumps({"error": "YOUTUBE_API_KEY not set"})
        
        try:
            from googleapiclient.discovery import build
            youtube = build('youtube', 'v3', developerKey=YOUTUBE_API_KEY)
            
            search_response = youtube.search().list(
                q=query,
                part='id,snippet',
                type='video',
                maxResults=5,  # Reduced from 10
                order='viewCount',  # Sort by views
                relevanceLanguage='de',
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
        try:
            output_dir = Path(__file__).parent / "output"
            output_dir.mkdir(exist_ok=True)
            
            styles_path = output_dir / "styles.css"
            
            with open(styles_path, 'w', encoding='utf-8') as f:
                f.write(css_code)
            
            return f"✅ Updated output/styles.css"
            
        except Exception as e:
            return f"❌ Error saving styles: {str(e)}"


class SaveVideoDataTool(BaseTool):
    """Save curated video data directly to output/script.js"""
    
    name: str = "Save Video Data"
    description: str = """Save the video data directly to output/script.js.
    Input: JavaScript code starting with 'const videos = [...]'
    Returns: Confirmation message."""
    
    def _run(self, js_code: str) -> str:
        try:
            output_dir = Path(__file__).parent / "output"
            output_dir.mkdir(exist_ok=True)
            
            script_path = output_dir / "script.js"
            
            # Read existing script.js to preserve other code
            existing_content = ""
            if script_path.exists():
                with open(script_path, 'r', encoding='utf-8') as f:
                    existing_content = f.read()
            
            # Extract just the videos array from input
            clean_code = js_code.strip()
            if not clean_code.startswith("const videos"):
                # Try to find const videos in the input
                import re
                match = re.search(r'(const videos\s*=\s*\[[\s\S]*?\];)', clean_code)
                if match:
                    clean_code = match.group(1)
                else:
                    return "❌ Error: Input must contain 'const videos = [...]'"
            
            # Replace existing videos array or append
            if "const videos" in existing_content:
                import re
                # Non-greedy match bis zum ersten ];
                new_content = re.sub(
                    r'const videos\s*=\s*\[.*?\];',
                    clean_code,
                    existing_content,
                    flags=re.DOTALL
                )
            else:
                new_content = clean_code + "\n\n" + existing_content
            
            with open(script_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            # Count videos
            video_count = clean_code.count("youtubeId")
            
            return f"✅ Updated output/script.js with {video_count} videos"
            
        except Exception as e:
            return f"❌ Error saving: {str(e)}"


class GetVideoDetailsTool(BaseTool):
    """Get detailed information about a YouTube video for quality review"""
    
    name: str = "Get Video Details"
    description: str = """Ruft detaillierte Informationen zu einem YouTube-Video ab.
    Input: YouTube Video ID (z.B. "mwEnTFm80-M")
    Returns: Titel, Beschreibung, Kanal, Tags, Views - wichtig für die Qualitätsprüfung."""
    
    def _run(self, video_id: str) -> str:
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

# Task 1: Load existing data and research new videos
research_task = Task(
    description="""Search YouTube for Trockenbau videos.
    
    1. Load existing videos with "Load Existing Videos" tool
    2. Search these queries with "YouTube Video Search" tool:
       - "Trockenbau Anleitung"
       - "Rigips Decke"
       - "Trockenbau reparieren"
    3. Return JSON array with top 10 videos (id, title, channel, views)""",
    agent=video_research_agent,
    expected_output="JSON array of 10 videos with id, title, channel, views"
)

# Task 2: Quality review by Trockenbaumeister
quality_review_task = Task(
    description="""Als Trockenbaumeister prüfst du die gefundenen Videos auf fachliche Korrektheit.

    VORGEHEN:
    1. Nutze "Get Video Details" für mindestens 3-5 Videos um Beschreibung, Tags und aktuelle Views zu prüfen
    2. Bewerte basierend auf Titel, Kanal, Beschreibung und Tags
    
    PRÜFKRITERIEN (basierend auf DIN 18181, 18182, 4102):
    
    1. UNTERKONSTRUKTION:
       - Korrekte Profilwahl (CW50/75/100, UW-Profile)?
       - Richtiger Achsabstand (max. 62,5cm bei einfacher Beplankung)?
    
    2. BEPLANKUNG:
       - Schraubenabstand korrekt (max. 25cm Wand, 17cm Decke)?
       - Fugenversatz bei mehrlagiger Beplankung (min. 40cm)?
    
    3. QUELLE:
       - Vertrauenswürdige Kanäle: RIGIPS, HORNBACH, Knauf, professionelle Handwerker
       - Skeptisch bei: Clickbait-Titeln, "Lifehacks", sehr kurzen Videos
    
    BEWERTUNG pro Video:
    - 5 Sterne: Professionell, Hersteller-Kanal oder Meisterbetrieb
    - 4 Sterne: Gut, erfahrener Handwerker
    - 3 Sterne: Akzeptabel für Einsteiger
    - ABLEHNEN: Unsichere oder falsche Techniken
    
    WICHTIG: Übernimm die AKTUELLEN Views aus "Get Video Details"!
    
    Return: JSON Array mit {videoId, views, rating, approved: true/false, reason}""",
    agent=trockenbaumeister_agent,
    context=[research_task],
    expected_output="JSON array mit Video-IDs, Views, Bewertungen und Begründungen"
)

# Task 3: Categorize and curate
curation_task = Task(
    description="""Kategorisiere die GENEHMIGTEN Videos (approved: true) und erstelle zweisprachige Inhalte.
    
    WICHTIG: 
    - Behalte die YouTube Video-IDs (id/videoId) aus dem Kontext bei!
    - Übernimm die VIEWS aus der Qualitätsprüfung (z.B. "1M", "500K")!
    
    KATEGORIEN (wähle die PASSENDSTE basierend auf Videoinhalt):
    - grundlagen: Einführung in Trockenbau, Materialien, Werkzeuge für Anfänger
    - vorwand: Vorsatzschalen, Wandverkleidungen, Installationswände (NICHT Dachschrägen!)
    - decke: Abgehängte Decken, Montagedecken, Deckenbekleidungen
    - dachausbau: Dachschrägen verkleiden, Dachgeschoss-Ausbau
    - reparatur: Löcher reparieren, Risse ausbessern, Beschädigungen beheben
    - tueren: Türzargen, Türöffnungen in Trockenbauwänden
    - spachteln: Fugenspachtel, Q1-Q4 Oberflächen, Finish-Arbeiten
    - werkzeuge: Werkzeugkunde, Maschinenbedienung
    
    Für jedes genehmigte Video erstelle:
    - youtubeId: Die Original Video-ID (z.B. "mwEnTFm80-M")
    - title.de, title.en (Originalsprache beibehalten oder übersetzen)
    - description.de, description.en (1 Satz)
    - channel: Der Original Kanalname
    - category: Eine der Kategorien (basierend auf INHALT, nicht Titel!)
    - rating: 4.0-5.0 basierend auf Trockenbaumeister-Bewertung
    - views: Die AKTUELLEN Views aus der Qualitätsprüfung (z.B. "1M", "500K", "100K")
    
    NUR Videos mit approved: true aus der Qualitätsprüfung aufnehmen!
    
    Return: JSON Array mit allen Feldern.""",
    agent=curator_agent,
    context=[research_task, quality_review_task],
    expected_output="JSON array mit youtubeId, title, description, channel, category, rating, views"
)

# Task 4: Generate website code
development_task = Task(
    description="""Generiere das JavaScript videos Array für die Website.
    
    WICHTIG: Übernimm die youtubeId aus dem Curation-Kontext! Setze NIEMALS "N/A"!
    
    Format:
    const videos = [
      {title:{de:"...",en:"..."},description:{de:"...",en:"..."},rating:4.8,views:"1M",category:"grundlagen",youtubeId:"mwEnTFm80-M",channel:"HORNBACH"},
    ];
    
    Nutze das "Save Video Data" Tool um den Code direkt in output/script.js zu speichern!""",
    agent=developer_agent,
    context=[curation_task],
    expected_output="JavaScript const videos = [...] code mit echten youtubeIds, saved to output/script.js"
)

# Task 5: Redesign the website styles
design_task = Task(
    description="""Erstelle ein VOLLSTÄNDIGES, professionelles CSS für die Trockenbau-Tutorial Website.
    
    WICHTIG: Erstelle CSS für ALLE diese HTML-Klassen (existieren bereits in index.html):
    
    BENÖTIGTE CSS-SELEKTOREN:
    - body, header, main, footer
    - header h1, header .subtitle
    - .language-switcher, .lang-btn, .lang-btn.active
    - .search-filter, .search-filter input, .search-filter select
    - .category-section, .category-section h2
    - .video-grid (CSS Grid!)
    - .video-card, .video-card:hover
    - .video-thumbnail, .video-thumbnail img
    - .video-info, .video-info h3, .video-info p
    - .video-meta, .video-channel, .video-rating, .video-stats
    - .category-badge, .play-overlay
    - .modal, .modal-content, .close-button
    - .youtube-button
    - @media queries für responsive design
    
    FARBPALETTE (CSS Custom Properties verwenden!):
    --primary: #1e3a5f; --primary-light: #2d5a87;
    --accent: #f59e0b; --background: #f8fafc;
    --card-bg: #ffffff; --text-primary: #1f2937;
    --text-secondary: #6b7280; --border: #e5e7eb;
    
    DESIGN-REGELN:
    - Header: gradient background, zentrierter Titel
    - Cards: border-radius: 12px, shadow, hover-lift Effekt
    - Video-Thumbnails: 16:9 aspect-ratio mit padding-top: 56.25%
    - Grid: repeat(auto-fill, minmax(340px, 1fr))
    - Transitions: all 0.2s ease
    
    Speichere das KOMPLETTE CSS mit dem "Save Styles" Tool!""",
    agent=senior_designer_agent,
    expected_output="Vollständiges CSS mit allen Selektoren gespeichert in output/styles.css"
)

# =============================================================================
# CREW CONFIGURATION
# =============================================================================
crew = Crew(
    agents=[video_research_agent, trockenbaumeister_agent, curator_agent, developer_agent, senior_designer_agent],
    tasks=[research_task, quality_review_task, curation_task, development_task, design_task],
    process=Process.sequential,
    verbose=True,
    memory=False
)


def run_video_curation():
    """Run the video curation pipeline"""
    print("\n" + "="*70)
    print("🎬 DIY VIDEO FINDER - Multi-Agent Video Curation System")
    print("="*70)
    print(f"📅 Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"🔑 YouTube API: {'✅ Configured' if YOUTUBE_API_KEY else '❌ Missing'}")
    print(f"🤖 Agents: Research → Trockenbaumeister → Curator → Developer → Designer")
    print("="*70 + "\n")
    
    if not YOUTUBE_API_KEY:
        print("❌ ERROR: YOUTUBE_API_KEY not set in .env")
        return None
    
    # Run the crew
    result = crew.kickoff()
    
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
        if styles_path.exists():
            print(f"✅ Styles saved to: {styles_path}")
        
        print("\n🌐 Open output/index.html in browser to view the website!")
