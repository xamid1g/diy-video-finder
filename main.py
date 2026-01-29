#!/usr/bin/env python3
"""
Advanced Multi-Agent Website Builder with Delegation
Agents work together with the developer creating code and reviewer providing feedback.
"""

from crewai import Agent, Task, Crew, Process

# Define the Developer Agent
developer_agent = Agent(
    role="Senior Web Developer",
    goal="Create clean, modern, and functional website code based on requirements",
    backstory="""You are an experienced web developer with 10+ years of experience.
    You specialize in creating responsive, accessible websites using HTML, CSS, and JavaScript.
    You follow best practices and write clean, well-commented code.
    When receiving feedback from the reviewer, you incorporate improvements thoughtfully.""",
    verbose=True,
    allow_delegation=False
)

# Define the Code Reviewer Agent
reviewer_agent = Agent(
    role="Code Quality Reviewer",
    goal="Review website code for quality, security, performance, and accessibility",
    backstory="""You are a meticulous code reviewer with expertise in web standards.
    You focus on code quality, security vulnerabilities, performance optimization, and accessibility.
    You provide constructive, specific feedback and suggest concrete improvements.
    Your feedback helps developers write better code.""",
    verbose=True,
    allow_delegation=False
)

# Define the tasks with context passing
code_creation_task = Task(
    description="""Create a professional website based on these requirements:
    {requirements}
    
    Provide complete code for:
    1. HTML structure (index.html)
    2. CSS styling (styles.css)  
    3. JavaScript functionality (script.js)
    
    Focus on:
    - Responsive design
    - Clean, semantic HTML
    - Modern CSS with proper organization
    - Well-commented code
    - User experience
    
    Output the complete code in your response.""",
    agent=developer_agent,
    expected_output="Complete website code with HTML, CSS, and JavaScript"
)

code_review_task = Task(
    description="""Review the website code created by the developer.
    
    Previous code:
    {code_to_review}
    
    Analyze and provide feedback on:
    1. Code Quality - Is it clean, readable, and well-organized?
    2. Security - Are there any security vulnerabilities?
    3. Performance - Can it be optimized? (file sizes, load times, etc.)
    4. Accessibility - Does it meet WCAG 2.1 AA standards?
    5. Best Practices - Does it follow modern web development standards?
    6. Browser Compatibility - Will it work across different browsers?
    
    Format your review as:
    - STRENGTHS: What was done well
    - ISSUES: Problems that need fixing
    - SUGGESTIONS: Specific improvements
    - PRIORITY: Mark critical vs nice-to-have improvements""",
    agent=reviewer_agent,
    expected_output="Detailed code review with specific feedback and improvement suggestions"
)

improvement_task = Task(
    description="""Improve the website code based on the code review feedback.
    
    Review Feedback:
    {review_feedback}
    
    Create an improved version of the code that:
    - Addresses all critical issues
    - Implements important suggestions
    - Maintains code quality
    - Improves performance and accessibility
    
    Output the complete improved code.""",
    agent=developer_agent,
    expected_output="Improved website code addressing all review feedback"
)

# Create the crew with sequential process to ensure proper handoff
crew = Crew(
    agents=[developer_agent, reviewer_agent],
    tasks=[code_creation_task, code_review_task, improvement_task],
    process=Process.sequential,
    verbose=True
)

def main():
    """Run the multi-agent website builder."""
    
    requirements = """
    Create a DIY Video Tutorial Aggregator Website with these specifications:
    
    Project Name: 
    - German: "Heimwerker Meister - Dein Ratgeber für Heimwerken"
    - English: "DIY Master - Your Guide to Home Improvement"
    
    CRITICAL: Multilingual Support
    - Default/Primary language: German (DE)
    - Secondary language: English (EN)
    - Language switcher in header (DE | EN flags/buttons)
    - All content must be provided in BOTH languages
    - Use JavaScript to toggle between languages dynamically
    - Store language preference in localStorage
    
    Core Purpose:
    Help DIY enthusiasts find the best rated YouTube tutorial videos for home improvement projects,
    starting with "Dry Wall Installation" (German: "Trockenbau") as the first featured domain.
    
    Sections Needed:
    - Header with language switcher (DE 🇩🇪 | EN 🇬🇧)
    - Hero section with bilingual tagline:
      * DE: "Meistere jedes Heimwerker-Projekt - Ein Video zur Zeit"
      * EN: "Master Any DIY Project - One Video at a Time"
    - Search bar with bilingual placeholder text:
      * DE: "Suche nach Heimwerker-Projekten..."
      * EN: "Search for DIY projects..."
    - Featured domain section:
      * DE: "Trockenbau - Installation & Reparatur"
      * EN: "Dry Wall Installation & Repair"
    - Video grid/cards displaying tutorials with:
      * Video thumbnail (placeholder images for now)
      * Video title
      * Star rating (out of 5 stars)
      * View count
      * Duration
      * Channel name
      * Brief description
      * Comments preview showing top-rated comments
    - Filter options (bilingual labels):
      * Sort by (Sortieren nach / Sort by): Rating (Bewertung), Views (Aufrufe), Recent (Neueste), Duration (Dauer)
      * Filter by (Filtern nach / Filter by): Beginner (Anfänger), Intermediate (Fortgeschritten), Advanced (Experte)
    - Categories sidebar for other DIY domains (future expansion) - bilingual category names
    
    Design Requirements:
    - Clean, professional, accessible design
    - Bright, friendly color scheme (Orange #ff6b35 primary, Blue #004e89 secondary)
    - Card-based layout for video tutorials
    - Star rating visualization (filled/empty stars)
    - Mobile-first responsive design
    - Clear call-to-action buttons
    
    Technical Requirements:
    - Fully responsive (mobile, tablet, desktop)
    - Semantic HTML5 with lang attribute switching
    - CSS Grid for video cards layout
    - JavaScript for:
      * Language switching functionality (toggle between DE/EN)
      * Store selected language in localStorage
      * Dynamic content replacement based on selected language
      * Star rating display
      * Filtering and sorting functionality
      * Search functionality (frontend only for now)
      * Modal/lightbox for video details
    - All text content stored in JavaScript translation object/JSON
    - Accessibility: ARIA labels in current language, keyboard navigation, screen reader friendly
    - Include placeholder data for 6-8 example dry wall tutorial videos with bilingual titles/descriptions
    
    Example Video Content (Dry Wall Domain - provide in both languages):
    
    German Titles:
    1. "Trockenbau wie ein Profi - Komplette Anleitung für Anfänger" (4.8 stars, 2.5M views)
    2. "Trockenbau Reparatur: Löcher in 5 Minuten reparieren" (4.9 stars, 1.8M views)
    3. "Trockenbau Spachteln - Schritt für Schritt Anleitung" (4.7 stars, 3.2M views)
    4. "Beste Trockenbau Werkzeuge für Anfänger 2026" (4.6 stars, 950K views)
    5. "Häufige Trockenbau Fehler und wie man sie vermeidet" (4.8 stars, 1.2M views)
    6. "Trockenbau an der Decke montieren - Komplette Anleitung" (4.5 stars, 780K views)
    
    English Titles:
    1. "How to Install Drywall Like a Pro - Complete Beginner's Guide" (4.8 stars, 2.5M views)
    2. "Drywall Repair: Fix Holes in 5 Minutes" (4.9 stars, 1.8M views)
    3. "Taping and Mudding Drywall - Step by Step Tutorial" (4.7 stars, 3.2M views)
    4. "Best Drywall Tools for Beginners 2026" (4.6 stars, 950K views)
    5. "Common Drywall Mistakes and How to Avoid Them" (4.8 stars, 1.2M views)
    6. "Hanging Drywall on Ceiling - Complete Guide" (4.5 stars, 780K views)
    
    User Experience Features:
    - Language switcher in prominent position (top right header)
    - Each video card shows star rating prominently
    - Display 2-3 top comments with star icons showing comment sentiment
    - "Watch on YouTube" button with bilingual text:
      * DE: "Auf YouTube ansehen"
      * EN: "Watch on YouTube"
    - Bookmark/save for later functionality (UI only) with bilingual labels
    - Progress indicator showing video difficulty level (Anfänger/Beginner, etc.)
    
    Language Implementation:
    - Create a translations object in JavaScript with all text strings
    - Use data-lang attributes or classes for easy content switching
    - Smooth transition when changing languages (no page reload)
    - Language preference persists across sessions
    
    Future Expansion Ready:
    - Structure code to easily add more DIY domains (plumbing, electrical, painting, etc.)
    - Comment that YouTube API integration would fetch real-time data
    - Responsive design that scales to many video cards
    
    Notes:
    - Use placeholder/mock data for now (would connect to YouTube Data API v3 later)
    - Focus on creating an excellent user experience for discovering quality tutorials
    - Emphasize rating system and comment quality indicators
    - Make it easy to scan and find the best tutorials quickly
    """
    
    print("\n" + "=" * 100)
    print("🚀  MULTI-AGENT WEBSITE BUILDER - CREW AI")
    print("=" * 100)
    print("\n📋 PROJECT REQUIREMENTS:")
    print(requirements)
    print("\n" + "=" * 100)
    print("Starting agent collaboration...\n")
    
    try:
        # Run the crew
        result = crew.kickoff(inputs={"requirements": requirements})
        
        print("\n" + "=" * 100)
        print("✅ COLLABORATION COMPLETE")
        print("=" * 100)
        print("\n" + result)
        
    except Exception as e:
        print(f"\n❌ Error during execution: {e}")
        raise


if __name__ == "__main__":
    main()
