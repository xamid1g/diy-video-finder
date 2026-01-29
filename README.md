# DIY Video Finder

> AI-powered Multi-Agent System for curating high-quality YouTube DIY tutorials

A CrewAI-powered pipeline that uses **5 specialized AI agents** to find, verify, categorize, and present the best German/English drywall (Trockenbau) tutorials.

##  Features

- **5-Agent Architecture**: Research  Quality Review  Curation  Development  Design
- **Expert Verification**: Trockenbaumeister agent validates videos against DIN standards
- **Real YouTube Data**: Fetches actual videos via YouTube Data API v3
- **Bilingual UI**: German (primary) & English with localStorage persistence
- **Professional Design**: Modern card-based responsive layout

##  Architecture

```

 YouTube          Trockenbaumeister     Content
 Researcher           (Quality Expert)          Curator
 (Find Videos)        (DIN 18181/18182)         (Categorize)



                        Senior UI/UX          Frontend
                        Designer                  Developer
                        (CSS Styles)              (JS Code)

```

##  Quick Start

### Prerequisites

- Python 3.10+
- [uv](https://github.com/astral-sh/uv) package manager
- **LLM API Key** (choose one):
  - Google Gemini API Key (recommended for simplicity) OR
  - Vertex AI credentials (recommended for production/high rate limits) OR
  - OpenAI API Key OR
  - GitHub Token
- YouTube Data API v3 Key

### Setup

1. Clone and create .env file:
```bash
cd diy-video-finder
cp .env.example .env
```

2. Add your API keys to `.env` (choose one LLM option):

**Option A: Google Gemini API (simplest)**
```env
GOOGLE_API_KEY=your_gemini_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key
```

**Option B: Vertex AI (recommended for production - uses global endpoint to prevent rate limits)**
```env
VERTEXAI_PROJECT=your-gcp-project-id
VERTEXAI_LOCATION=global
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
YOUTUBE_API_KEY=your_youtube_api_key
```

**Option C: OpenAI**
```env
OPENAI_API_KEY=sk-your_openai_api_key
YOUTUBE_API_KEY=your_youtube_api_key
```

3. Run the multi-agent pipeline:
```bash
uv run --no-project -p 3.11 --with crewai --with crewai-tools --with python-dotenv --with pydantic --with litellm --with google-api-python-client video_curator.py
```

4. Open `output/index.html` in your browser!

##  Project Structure

```
diy-video-finder/
 video_curator.py     # Multi-agent pipeline (5 agents, 5 tasks)
 pyproject.toml       # Dependencies
 .env                 # API keys (not committed)
 output/
    index.html       # Static HTML template
    script.js        # Generated video data + UI logic
    styles.css       # Generated/editable CSS
 README.md
```

##  The Agents

| Agent | Role | Tools |
|-------|------|-------|
| **YouTube Researcher** | Finds top Trockenbau videos | YouTube Search, Load Existing |
| **Trockenbaumeister** | Verifies technical correctness | Get Video Details |
| **Content Curator** | Categorizes & creates bilingual content | - |
| **Frontend Developer** | Generates JavaScript video array | Save Video Data |
| **Senior UI/UX Designer** | Creates professional CSS | Save Styles |

##  Video Categories

-  Grundlagen (Basics)
-  Vorwandinstallation (Wall Installation)
-  Deckenmontage (Ceiling Installation)
-  Dachausbau (Attic Conversion)
-  Reparatur (Repair)
-  T�ren & �ffnungen (Doors & Openings)
-  Spachteln & Finish (Taping & Finishing)
-  Werkzeuge (Tools)

##  API Keys

### LLM Providers (choose one)

#### Google Gemini API (Recommended for beginners)
- **Get one at**: https://aistudio.google.com/app/apikey
- **Pros**: Simple setup, free tier, 1M+ token context
- **Cons**: Lower rate limits than Vertex AI

#### Vertex AI (Recommended for production)
- **Setup**:
  1. Create GCP project at https://console.cloud.google.com/
  2. Enable Vertex AI API
  3. Create service account with "Vertex AI User" role
  4. Download service account JSON key
- **Pros**: Higher rate limits, global endpoint prevents rate limit errors, enterprise-grade
- **Cons**: More complex setup, requires GCP account
- **Note**: Uses `locations/global` endpoint to maximize availability and prevent regional rate limits

#### OpenAI
- **Get one at**: https://platform.openai.com/api-keys
- **Note**: GPT-4o has 128K token context (vs 1M+ for Gemini)

#### GitHub Models (Fallback)
- **Get one at**: https://github.com/settings/tokens
- **Note**: Limited to 8K token context, only recommended as fallback

### YouTube Data API v3
1. Go to https://console.cloud.google.com/apis/credentials
2. Create a new API key
3. Enable "YouTube Data API v3"

##  License

MIT License

##  Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request
