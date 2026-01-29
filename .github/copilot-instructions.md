# DIY Video Finder - AI Agent Development Guide

## Project Overview

**DIY Video Finder** is a CrewAI-powered multi-agent system that generates a multilingual (German/English) website for discovering highly-rated DIY tutorial videos. The architecture uses a collaborative workflow where a Developer Agent creates code and a Reviewer Agent provides quality feedback.

### Core Architecture

- **Two-Agent Pattern**: Sequential process with Developer → Reviewer → Improved Code feedback loop
- **No Traditional Package Structure**: Single `main.py` entry point with inline agent/task definitions (not using @CrewBase decorator pattern)
- **Output-Focused**: Agents generate complete website code (HTML/CSS/JS) as text output, not file operations
- **Bilingual by Design**: All content requirements specify German (primary) + English variants

## Essential Patterns

### Agent Definition Pattern

Agents are defined inline without the @CrewBase decorator:
```python
developer_agent = Agent(
    role="Senior Web Developer",
    goal="Create clean, modern, and functional website code",
    backstory="...",
    verbose=True,
    allow_delegation=False
)
```

**Key pattern**: `allow_delegation=False` prevents unnecessary sub-tasks. Use `verbose=True` for debugging LLM interactions.

### Task Design with Context Passing

Tasks use string templates `{variable_name}` for context injection:
```python
code_creation_task = Task(
    description="""Create a website based on: {requirements}""",
    agent=developer_agent,
    expected_output="Complete website code with HTML, CSS, and JavaScript"
)
```

The `kickoff(inputs={"requirements": requirements})` call populates these templates. This is how feedback flows between agents.

### Sequential Crew Process

```python
crew = Crew(
    agents=[developer_agent, reviewer_agent],
    tasks=[task1, task2, task3],
    process=Process.sequential,  # NOT hierarchical/parallel
    verbose=True
)
```

Sequential ensures Task 1 output feeds into Task 2's context via the task description templates.

## Multilingual Implementation Requirements

Every content requirement must specify BOTH languages:

```
- German (DE): "Heimwerker Meister - ..."
- English (EN): "DIY Master - ..."
```

The agents should generate:
1. HTML with `lang` attribute switching
2. JavaScript translation objects containing all UI strings in both languages
3. A language switcher UI component
4. localStorage persistence for language preference

When modifying requirements, ensure bilingual parity in all UI elements, labels, and helper text.

## Critical Integration Points

### Environment: LLM Configuration

Agents require an LLM provider. **Default is OpenAI**, but you can use alternatives.

#### Option 1: OpenAI (Default)

```powershell
$env:OPENAI_API_KEY = "sk-..."
```

#### Option 2: Anthropic Claude

```powershell
$env:ANTHROPIC_API_KEY = "sk-ant-..."
```

Modify agent definitions:
```python
from crewai import Agent, LLM

developer_agent = Agent(
    role="Senior Web Developer",
    goal="...",
    llm=LLM(model="claude-3-5-sonnet-20241022", provider="anthropic"),
)
```

#### Option 3: Local/Self-Hosted (Ollama, LM Studio)

```python
llm=LLM(
    model="llama2",
    provider="ollama",
    base_url="http://localhost:11434"
)
```

#### Option 4: Other Providers (DeepSeek, Groq, etc.)

Check CrewAI's LLM documentation for supported providers and required environment variables.

**Setup**: Create `.env` file in project root with your chosen provider's API key. Agent instantiation will fail if no valid LLM credentials exist.

### Dependency Management: UV + PyPI

- Uses `uv` package manager (standalone, not pip-dependent)
- Dependencies from PyPI: `crewai>=0.50.0`, `crewai-tools>=0.10.0`, `python-dotenv`, `pydantic`
- No local development setup; always pulls from published PyPI versions
- Run with: `uv run --no-project -p 3.11 --with crewai main.py`

### File Structure

```
diy-video-finder/
├── main.py              # Single entry point: agents, tasks, crew, main()
├── README.md            # Project documentation
├── .env                 # Environment variables (OPENAI_API_KEY)
├── .github/
│   └── copilot-instructions.md  # This file
└── pyproject.toml       # Project metadata (simplified, no package structure)
```

No `src/` directory, no modules, no tests—this is a single-script application for now.

## Development Workflow

### Running the Agents

```bash
cd diy-video-finder
uv run --no-project -p 3.11 --with crewai --with crewai-tools --with python-dotenv --with pydantic main.py
```

### Modifying Requirements

Edit the `requirements` variable in `main()`:
- Keep bilingual structure (DE / EN)
- Update feature descriptions
- Adjust color schemes, domains, or content examples
- Agents will regenerate all code based on changes

### Expected Output

The final crew output is a string containing:
1. Complete HTML structure
2. Complete CSS stylesheet
3. Complete JavaScript code
4. Bilingual translations object
5. Implementation notes

This is NOT automatically saved to files; you must extract and save manually or enhance the `main()` function.

## Common Pitfalls

- **Missing LLM credentials**: Agents fail at instantiation (not kickoff) if no valid provider is configured
- **OpenAI quota exceeded**: Check usage at https://platform.openai.com/usage
- **Wrong LLM specified**: Mismatch between model name and provider causes runtime errors
- **Forgetting bilingual requirements**: Agents may default to English-only without explicit German variants in prompt
- **Expecting file output**: Agents generate code as text; you must implement file writing yourself
- **Not using `verbose=True`**: Hard to debug LLM failures without seeing the prompts and responses
- **Modifying task descriptions**: Changes to task templates affect context passing; test incrementally

## Future Enhancements

These are mentioned in README but NOT yet implemented:
- YouTube Data API v3 integration for real-time video fetching
- Additional DIY domains beyond Drywall
- User authentication and saved videos
- File output automation to `output/index.html`, `output/style.css`, etc.

Do not implement these unless explicitly requested by modifying the requirements string.

## References

- CrewAI documentation: Sequential process vs Hierarchical
- Pydantic validation for LLM outputs
- OpenAI API key setup: https://platform.openai.com/api-keys
