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
- GitHub Token (for GPT-4o-mini via GitHub Models)
- YouTube Data API v3 Key

### Setup

1. Clone and create .env file:
```bash
cd diy-video-finder
cp .env.example .env
```

2. Add your API keys to `.env`:
```env
GITHUB_TOKEN=ghp_your_github_token
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
-  Türen & Öffnungen (Doors & Openings)
-  Spachteln & Finish (Taping & Finishing)
-  Werkzeuge (Tools)

##  API Keys

### GitHub Token
Get one at: https://github.com/settings/tokens
Required scopes: None (public model access)

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
