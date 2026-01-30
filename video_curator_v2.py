#!/usr/bin/env python3
"""
DIY Video Finder v2 - Lean & Reliable Video Curation
=====================================================

Architecture:
- YouTube API for search + video details (no LLM needed)
- Trust-Score system for quality ratings
- Optional single LLM call for descriptions (batch)
- Domain-config based (easily extendable to new topics)

Author: DIY Video Finder Team
"""

import argparse
import json
import os
import re
from datetime import datetime
from pathlib import Path

from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# =============================================================================
# CONFIGURATION
# =============================================================================

# API Keys
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# =============================================================================
# DOMAIN CONFIGURATIONS (Easily extendable!)
# =============================================================================

DOMAINS = {
    "trockenbau": {
        "name": {"de": "Trockenbau", "en": "Drywall"},
        "queries": [
            "Trockenbau Anleitung Profi",
            "Rigips Decke montieren Tutorial",
            "Trockenbau Wand bauen Schritt für Schritt",
            "Gipskarton spachteln Anleitung",
            "Dachausbau Trockenbau Dämmung",
            "Trockenbauwand selber bauen",
            "Rigips schneiden und befestigen",
        ],
        "trust_channels": [
            "SAINT-GOBAIN RIGIPS",
            "RIGIPS",
            "Knauf",
            "Knauf GmbH",
            "Knauf DIY",
            "HORNBACH",
            "OBI",
            "OBI Baumarkt",
            "BAUHAUS",
            "toom",
            "toom Baumarkt",
            "HELLWEG",
            "Siniat",
            "Fermacell",
        ],
        "categories": {
            "grundlagen": {
                "de": "📚 Grundlagen",
                "en": "📚 Basics",
                "keywords": ["grundlagen", "basics", "einführung", "anfänger", "erste schritte"],
            },
            "waende": {
                "de": "🧱 Wände",
                "en": "🧱 Walls",
                "keywords": ["wand", "ständerwand", "trennwand", "vorwand", "wall"],
            },
            "decken": {
                "de": "⬆️ Decken",
                "en": "⬆️ Ceilings",
                "keywords": ["decke", "abhängen", "ceiling", "deckenmontage"],
            },
            "spachteln": {
                "de": "✨ Spachteln",
                "en": "✨ Finishing",
                "keywords": ["spachteln", "verspachteln", "fugen", "finish", "schleifen"],
            },
            "dachausbau": {
                "de": "🏠 Dachausbau",
                "en": "🏠 Attic",
                "keywords": ["dach", "dachausbau", "dachschräge", "dämmung", "attic"],
            },
            "tueren": {
                "de": "🚪 Türen",
                "en": "🚪 Doors",
                "keywords": ["tür", "türzarge", "door", "öffnung"],
            },
            "werkzeuge": {
                "de": "🛠️ Werkzeuge",
                "en": "🛠️ Tools",
                "keywords": ["werkzeug", "tool", "schrauben", "profile", "material"],
            },
        },
        "clickbait_patterns": [
            r"(?i)krass",
            r"(?i)dieser trick",
            r"(?i)unfassbar",
            r"(?i)niemand kennt",
            r"(?i)geheim",
            r"(?i)schockierend",
            r"(?i)\d+\s*(euro|€).*gespart",
        ],
    },
    # Future: Add more domains here
    # "fliesen": {
    #     "name": {"de": "Fliesen", "en": "Tiles"},
    #     "queries": [...],
    #     "trust_channels": [...],
    #     ...
    # },
}

# Current active domain
ACTIVE_DOMAIN = "trockenbau"


# =============================================================================
# ARGUMENT PARSING
# =============================================================================

parser = argparse.ArgumentParser(description="DIY Video Finder v2 - Video Curation")
parser.add_argument("--domain", type=str, default="trockenbau", help="Domain to curate (default: trockenbau)")
parser.add_argument("--max-videos", type=int, default=10, help="Maximum videos to add (default: 10)")
parser.add_argument("--dry-run", action="store_true", help="Don't save, just show what would be added")
parser.add_argument("--skip-llm", action="store_true", help="Skip LLM descriptions, use YouTube data only")
parser.add_argument("--verbose", "-v", action="store_true", help="Verbose output")

args = parser.parse_args()
ACTIVE_DOMAIN = args.domain


# =============================================================================
# YOUTUBE API
# =============================================================================


def search_youtube(query: str, max_results: int = 15) -> list:
    """Search YouTube for videos"""
    if not YOUTUBE_API_KEY:
        print("❌ YOUTUBE_API_KEY not set!")
        return []

    try:
        from googleapiclient.discovery import build

        youtube = build("youtube", "v3", developerKey=YOUTUBE_API_KEY)

        response = (
            youtube.search()
            .list(
                q=query,
                part="id,snippet",
                type="video",
                maxResults=max_results,
                order="relevance",
                relevanceLanguage="de",
                videoDuration="medium",
            )
            .execute()
        )

        video_ids = [item["id"]["videoId"] for item in response.get("items", [])]

        if not video_ids:
            return []

        # Get detailed video info
        details = (
            youtube.videos()
            .list(
                part="snippet,statistics,contentDetails",
                id=",".join(video_ids),
            )
            .execute()
        )

        videos = []
        for item in details.get("items", []):
            snippet = item["snippet"]
            stats = item.get("statistics", {})
            content = item.get("contentDetails", {})

            videos.append(
                {
                    "id": item["id"],
                    "title": snippet.get("title", ""),
                    "description": snippet.get("description", "")[:500],
                    "channel": snippet.get("channelTitle", ""),
                    "published": snippet.get("publishedAt", ""),
                    "views": int(stats.get("viewCount", 0)),
                    "likes": int(stats.get("likeCount", 0)),
                    "duration": content.get("duration", ""),
                    "thumbnail": snippet.get("thumbnails", {}).get("high", {}).get("url", ""),
                }
            )

        return videos

    except Exception as e:
        print(f"❌ YouTube API error: {e}")
        return []


def parse_duration(duration: str) -> int:
    """Parse ISO 8601 duration to minutes"""
    match = re.match(r"PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", duration)
    if not match:
        return 0
    hours = int(match.group(1) or 0)
    minutes = int(match.group(2) or 0)
    seconds = int(match.group(3) or 0)
    return hours * 60 + minutes + (1 if seconds > 30 else 0)


# =============================================================================
# TRUST SCORE SYSTEM
# =============================================================================


def calculate_trust_score(video: dict, domain_config: dict) -> float:
    """
    Calculate trust score for a video (0.0 - 5.0)

    Factors:
    - Channel trust (manufacturer/store channels)
    - View count
    - Video duration (optimal: 5-20 min)
    - Clickbait detection
    - Like ratio
    """
    score = 3.0  # Base score

    channel = video.get("channel", "").lower()
    title = video.get("title", "").lower()
    views = video.get("views", 0)
    duration = parse_duration(video.get("duration", ""))

    # Trust channel bonus (+1.5)
    for trusted in domain_config.get("trust_channels", []):
        if trusted.lower() in channel:
            score += 1.5
            break

    # View count bonus
    if views >= 1_000_000:
        score += 0.8
    elif views >= 500_000:
        score += 0.6
    elif views >= 100_000:
        score += 0.4
    elif views >= 50_000:
        score += 0.2

    # Duration bonus (5-20 min is ideal for tutorials)
    if 5 <= duration <= 20:
        score += 0.3
    elif 3 <= duration <= 30:
        score += 0.1
    elif duration < 2 or duration > 60:
        score -= 0.3

    # Clickbait penalty
    for pattern in domain_config.get("clickbait_patterns", []):
        if re.search(pattern, title):
            score -= 0.8
            break

    # Clamp to 4.0-5.0 range (we only want good videos)
    return max(4.0, min(5.0, score))


def categorize_video(video: dict, domain_config: dict) -> str:
    """Categorize video based on title and description keywords"""
    text = f"{video.get('title', '')} {video.get('description', '')}".lower()

    best_category = "grundlagen"
    best_matches = 0

    for cat_id, cat_config in domain_config.get("categories", {}).items():
        matches = sum(1 for kw in cat_config.get("keywords", []) if kw in text)
        if matches > best_matches:
            best_matches = matches
            best_category = cat_id

    return best_category


# =============================================================================
# LLM DESCRIPTION GENERATION (Optional, Single Batch Call)
# =============================================================================


def generate_descriptions_batch(videos: list) -> list:
    """Generate DE+EN descriptions for all videos in ONE LLM call"""
    if not videos:
        return videos

    # Try Gemini first (has free tier), then OpenAI
    if GOOGLE_API_KEY:
        return _generate_with_gemini(videos)
    elif OPENAI_API_KEY:
        return _generate_with_openai(videos)
    else:
        print("⚠️  No LLM API key - using YouTube descriptions")
        return _use_youtube_descriptions(videos)


def _generate_with_gemini(videos: list) -> list:
    """Use Gemini for batch description generation"""
    try:
        import google.generativeai as genai

        genai.configure(api_key=GOOGLE_API_KEY)
        model = genai.GenerativeModel("gemini-2.0-flash")

        # Build batch prompt
        video_list = "\n".join(
            [f'{i+1}. "{v["title"]}" von {v["channel"]} ({v["views"]:,} Views)' for i, v in enumerate(videos)]
        )

        prompt = f"""Du bist ein Experte für Trockenbau-Tutorials. Erstelle kurze, informative Beschreibungen für diese YouTube-Videos.

VIDEOS:
{video_list}

Antworte NUR mit einem JSON Array. Für jedes Video:
{{"de": "Deutsche Beschreibung (max 150 Zeichen)", "en": "English description (max 150 chars)"}}

Beispiel:
[
  {{"de": "Professionelle Anleitung zum Verspachteln von Gipskarton nach DIN-Norm.", "en": "Professional guide to filling gypsum board joints according to DIN standards."}},
  ...
]

JSON Array (exakt {len(videos)} Einträge):"""

        response = model.generate_content(prompt)
        text = response.text.strip()

        # Extract JSON from response
        json_match = re.search(r"\[.*\]", text, re.DOTALL)
        if json_match:
            descriptions = json.loads(json_match.group())
            for i, video in enumerate(videos):
                if i < len(descriptions):
                    video["description_de"] = descriptions[i].get("de", "")
                    video["description_en"] = descriptions[i].get("en", "")
            return videos

    except Exception as e:
        print(f"⚠️  Gemini error: {e} - using YouTube descriptions")

    return _use_youtube_descriptions(videos)


def _generate_with_openai(videos: list) -> list:
    """Use OpenAI for batch description generation"""
    try:
        from openai import OpenAI

        client = OpenAI(api_key=OPENAI_API_KEY)

        video_list = "\n".join(
            [f'{i+1}. "{v["title"]}" von {v["channel"]} ({v["views"]:,} Views)' for i, v in enumerate(videos)]
        )

        response = client.chat.completions.create(
            model="gpt-4o-mini",  # Cheaper model for descriptions
            messages=[
                {
                    "role": "system",
                    "content": "Du erstellst kurze, informative Video-Beschreibungen für Trockenbau-Tutorials. Antworte NUR mit JSON.",
                },
                {
                    "role": "user",
                    "content": f"""Erstelle Beschreibungen für diese Videos:

{video_list}

JSON Array mit {len(videos)} Einträgen:
[{{"de": "Deutsche Beschreibung", "en": "English description"}}, ...]""",
                },
            ],
            max_tokens=2000,
        )

        text = response.choices[0].message.content.strip()
        json_match = re.search(r"\[.*\]", text, re.DOTALL)
        if json_match:
            descriptions = json.loads(json_match.group())
            for i, video in enumerate(videos):
                if i < len(descriptions):
                    video["description_de"] = descriptions[i].get("de", "")
                    video["description_en"] = descriptions[i].get("en", "")
            return videos

    except Exception as e:
        print(f"⚠️  OpenAI error: {e} - using YouTube descriptions")

    return _use_youtube_descriptions(videos)


def _use_youtube_descriptions(videos: list) -> list:
    """Fallback: Use YouTube description (truncated)"""
    for video in videos:
        desc = video.get("description", "")[:150]
        video["description_de"] = desc
        video["description_en"] = desc  # Same for both (YouTube is usually German)
    return videos


# =============================================================================
# OUTPUT GENERATION
# =============================================================================


def format_views(views: int) -> str:
    """Format view count: 1234567 -> '1.2M'"""
    if views >= 1_000_000:
        return f"{views/1_000_000:.1f}M"
    elif views >= 1_000:
        return f"{views/1_000:.0f}K"
    return str(views)


def load_existing_videos(script_path: Path) -> set:
    """Load existing video IDs from script.js"""
    existing_ids = set()
    if script_path.exists():
        content = script_path.read_text(encoding="utf-8")
        # Extract youtubeId values
        matches = re.findall(r'youtubeId:"([^"]+)"', content)
        existing_ids = set(matches)
    return existing_ids


def save_videos(videos: list, script_path: Path, domain_config: dict):
    """Save videos to script.js"""
    if not script_path.exists():
        print(f"❌ Script file not found: {script_path}")
        return

    content = script_path.read_text(encoding="utf-8")

    # Format videos as JavaScript
    video_entries = []
    for v in videos:
        entry = (
            f'  {{title:{{de:"{v["title"]}",en:"{v.get("title_en", v["title"])}"}}'
            f',description:{{de:"{v.get("description_de", "")}",en:"{v.get("description_en", "")}"}}'
            f',rating:{v["rating"]:.1f},views:"{v["views_formatted"]}",category:"{v["category"]}"'
            f',youtubeId:"{v["id"]}",channel:"{v["channel"]}"}}'
        )
        video_entries.append(entry)

    videos_js = "[\n" + ",\n".join(video_entries) + "\n]"

    # Update the videos array in script.js
    new_content = re.sub(
        r"const videos = \[[\s\S]*?\];",
        f"const videos = {videos_js};",
        content,
    )

    # Update comment with date
    date_str = datetime.now().strftime("%d. %B %Y")
    new_content = re.sub(
        r"// KURATIERTE Videos.*",
        f"// KURATIERTE Videos vom DIY Video Finder ({date_str})",
        new_content,
    )

    script_path.write_text(new_content, encoding="utf-8")
    print(f"✅ Saved {len(videos)} videos to {script_path}")


# =============================================================================
# MAIN PIPELINE
# =============================================================================


def run_curation():
    """Main curation pipeline"""
    domain_config = DOMAINS.get(ACTIVE_DOMAIN)
    if not domain_config:
        print(f"❌ Unknown domain: {ACTIVE_DOMAIN}")
        return

    print("\n" + "=" * 70)
    print("🎬 DIY VIDEO FINDER v2 - Lean & Reliable")
    print("=" * 70)
    print(f"📅 Date: {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"🎯 Domain: {domain_config['name']['de']}")
    print(f"📊 Max Videos: {args.max_videos}")
    print(f"🧪 Mode: {'DRY-RUN' if args.dry_run else 'LIVE'}")
    print(f"🤖 LLM: {'Disabled' if args.skip_llm else 'Enabled (1 batch call)'}")
    print("=" * 70 + "\n")

    # Load existing videos
    script_path = Path(__file__).parent / "output" / "script.js"
    existing_ids = load_existing_videos(script_path)
    print(f"📂 Existing videos: {len(existing_ids)}")

    # Search for videos
    all_videos = []
    seen_ids = set(existing_ids)

    for query in domain_config["queries"]:
        print(f"🔍 Searching: {query}")
        results = search_youtube(query, max_results=10)

        for video in results:
            if video["id"] not in seen_ids:
                seen_ids.add(video["id"])
                all_videos.append(video)

        if len(all_videos) >= args.max_videos * 2:  # Get extra for filtering
            break

    print(f"\n📥 Found {len(all_videos)} new videos")

    if not all_videos:
        print("⚠️  No new videos found!")
        return

    # Calculate trust scores and categorize
    for video in all_videos:
        video["rating"] = calculate_trust_score(video, domain_config)
        video["category"] = categorize_video(video, domain_config)
        video["views_formatted"] = format_views(video["views"])

    # Sort by rating (best first) and take top N
    all_videos.sort(key=lambda v: (v["rating"], v["views"]), reverse=True)
    selected_videos = all_videos[: args.max_videos]

    print(f"\n✅ Selected top {len(selected_videos)} videos:")
    for v in selected_videos:
        print(f"   ⭐ {v['rating']:.1f} | {v['views_formatted']:>6} | {v['channel'][:25]:<25} | {v['title'][:40]}")

    # Generate descriptions (optional LLM call)
    if not args.skip_llm:
        print("\n📝 Generating descriptions (1 LLM call)...")
        selected_videos = generate_descriptions_batch(selected_videos)
    else:
        selected_videos = _use_youtube_descriptions(selected_videos)

    # Note: Currently replaces all videos
    # Future: Merge with existing videos for incremental updates

    # Save to script.js
    if not args.dry_run:
        save_videos(selected_videos, script_path, domain_config)
    else:
        print("\n🧪 DRY-RUN - would save these videos:")
        for v in selected_videos:
            print(f"   {v['id']}: {v['title'][:50]}")

    print("\n" + "=" * 70)
    print("✅ CURATION COMPLETE")
    print("=" * 70)


if __name__ == "__main__":
    if not YOUTUBE_API_KEY:
        print("❌ ERROR: YOUTUBE_API_KEY not set in .env")
        exit(1)

    run_curation()
