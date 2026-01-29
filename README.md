# DIY Video Finder 🛠️📹

> Multilingual AI-powered DIY video tutorial aggregator using CrewAI multi-agent system

Find the best rated YouTube tutorials for home improvement projects. Starting with Drywall (Trockenbau) domain, featuring German and English language support.

## 🌟 Features

- **Multi-Agent Architecture**: Developer and Reviewer agents collaborate to build quality websites
- **Multilingual Support**: German (primary) and English with seamless language switching
- **Smart Video Curation**: Focus on highly-rated tutorials with quality comments
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Rating System**: Star ratings and comment quality indicators
- **DIY Domains**: Starting with Drywall, expandable to plumbing, electrical, painting, etc.

## 🚀 Quick Start

### Prerequisites

- Python 3.10 or higher
- [uv](https://github.com/astral-sh/uv) package manager

### Installation

```bash
# Install dependencies
uv sync

# Run the multi-agent website builder
uv run main.py
```

### Using pip (alternative)

```bash
# Install dependencies
pip install -e .

# Run the application
python main.py
```

## 🏗️ How It Works

The project uses **CrewAI** to orchestrate two AI agents:

1. **Developer Agent** 🧑‍💻
   - Creates HTML, CSS, and JavaScript code
   - Implements responsive design and accessibility features
   - Incorporates bilingual content (German/English)

2. **Reviewer Agent** 🔍
   - Reviews code quality and security
   - Checks performance and accessibility (WCAG compliance)
   - Provides detailed improvement suggestions

### Workflow

```
Requirements → Developer → Reviewer → Improved Code → Final Website
```

The agents work sequentially to produce high-quality, production-ready code.

## 📁 Project Structure

```
diy-video-finder/
├── main.py              # Multi-agent orchestration script
├── pyproject.toml       # Project configuration & dependencies
├── README.md            # This file
├── .gitignore           # Git ignore patterns
└── output/              # Generated website files (created on run)
```

## 🎯 Current Domain: Drywall (Trockenbau)

The initial release focuses on drywall installation and repair tutorials with example videos:

- German: "Trockenbau wie ein Profi", "Trockenbau Reparatur", etc.
- English: "How to Install Drywall Like a Pro", "Drywall Repair", etc.

## 🔧 Customization

Edit the `requirements` variable in [main.py](main.py) to:
- Change design preferences
- Add new DIY domains
- Modify color schemes
- Adjust content requirements

## 🌍 Language Support

- **Primary**: German (Deutsch) 🇩🇪
- **Secondary**: English 🇬🇧
- Language switcher in header
- Persistent language preference via localStorage

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

This is a business project, but contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 🔮 Future Enhancements

- [ ] YouTube Data API v3 integration for real-time data
- [ ] More DIY domains (plumbing, electrical, painting)
- [ ] User authentication and saved videos
- [ ] Community ratings and comments
- [ ] Mobile app version
- [ ] Additional languages (Spanish, French)

## 📧 Contact

For business inquiries or support, contact: your.email@example.com
