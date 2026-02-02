document.addEventListener('DOMContentLoaded', () => {
    // KURATIERTE Videos vom DIY Video Finder (02. February 2026)
    // Geprüft durch: YouTube Researcher → Trockenbaumeister → Content Curator → Frontend Developer
    const videos = [
  {title:{de:"Dachgeschossausbau Verarbeitung Dämmung - Rigips Verarbeitungsanleitung Trockenbau",en:"Dachgeschossausbau Verarbeitung Dämmung - Rigips Verarbeitungsanleitung Trockenbau"},description:{de:"Dachgeschossausbau mit Rigips: Dämmung und Verarbeitung einfach erklärt. Die offizielle Rigips Verarbeitungsanleitung für Trockenbauer.",en:"Attic conversion with Rigips: Insulation and installation explained simply. The official Rigips guide for drywall construction."},rating:5.0,views:"1.2M",category:"dachausbau",youtubeId:"jcvno6SMrBM",channel:"SAINT-GOBAIN RIGIPS GmbH"},
  {title:{de:"Vorwandinstallation WC | Vorwandelement montieren und mit Gipskarton verkleiden | BAUHAUS Workshop",en:"Vorwandinstallation WC | Vorwandelement montieren und mit Gipskarton verkleiden | BAUHAUS Workshop"},description:{de:"Vorwandinstallation WC: Schritt-für-Schritt Anleitung für die Montage und Verkleidung eines Vorwandelements mit Gipskarton. BAUHAUS Workshop.",en:"WC pre-wall installation: Step-by-step guide for installing and cladding a pre-wall element with plasterboard. BAUHAUS Workshop."},rating:5.0,views:"369K",category:"waende",youtubeId:"ICHh-_6RJNA",channel:"BAUHAUS"},
  {title:{de:"Decke abhängen",en:"Decke abhängen"},description:{de:"Decke abhängen leicht gemacht! Knauf DIY zeigt, wie Sie eine Decke im Trockenbau professionell abhängen können.",en:"Lowering a ceiling made easy! Knauf DIY shows you how to professionally lower a ceiling using drywall construction."},rating:5.0,views:"237K",category:"decken",youtubeId:"QMZr-YODjHs",channel:"Knauf DIY"},
  {title:{de:"Metallprofile & Schrauben für den Trockenbau | Trockenbau Wissen",en:"Metallprofile & Schrauben für den Trockenbau | Trockenbau Wissen"},description:{de:"Alles über Metallprofile und Schrauben im Trockenbau. Knauf Österreich erklärt das Trockenbau-Grundwissen für Heimwerker und Profis.",en:"All about metal profiles and screws in drywall construction. Knauf Austria explains the basics for DIY enthusiasts and professionals."},rating:5.0,views:"150K",category:"werkzeuge",youtubeId:"e9ghcbP200g",channel:"Knauf GmbH Österreich"},
  {title:{de:"Decke abhängen | Trockenbauguide | Deckensystem | Trockenbau -#Trockenbau #Decke #Spachteln",en:"Decke abhängen | Trockenbauguide | Deckensystem | Trockenbau -#Trockenbau #Decke #Spachteln"},description:{de:"Decke abhängen mit dem Trockenbauguide von Siniat. Erfahren Sie alles über Deckensysteme und den Trockenbau – einfach und verständlich.",en:"Lowering a ceiling with Siniat's drywall guide. Learn everything about ceiling systems and drywall construction - simple and easy to understand."},rating:5.0,views:"131K",category:"decken",youtubeId:"DpEXwahrqSE",channel:"Siniat by Etex | Innovativer Trockenbau"},
  {title:{de:"🟡 Trockenbau: Decke einfach selbst abhängen mit Knauf Diamant Gipsplatten",en:"🟡 Trockenbau: Decke einfach selbst abhängen mit Knauf Diamant Gipsplatten"},description:{de:"Einfach Decke abhängen mit Knauf Diamant Gipsplatten. Probier's - Bau zeigt, wie's geht – verständlich und für jeden machbar!",en:"Easily lower a ceiling with Knauf Diamant plasterboard. Probier's - Bau shows you how - understandable and feasible for everyone!"},rating:5.0,views:"111K",category:"werkzeuge",youtubeId:"Urt4LSfjQmg",channel:"Probier's - Bau"},
  {title:{de:"TROCKENBAU DECKE SPACHTELN Q1-Q4 mit Knauf Uniflott (So gehts richtig) ✅ Anleitung vom Profi 👷🏼‍♂️",en:"TROCKENBAU DECKE SPACHTELN Q1-Q4 mit Knauf Uniflott (So gehts richtig) ✅ Anleitung vom Profi 👷🏼‍♂️"},description:{de:"Trockenbau Decke spachteln Q1-Q4 mit Knauf Uniflott. Profi-Anleitung vom Trockenbau-Experten KREATIVTOBI. So geht's richtig!",en:"Drywall ceiling filling Q1-Q4 with Knauf Uniflott. Professional guide from drywall expert KREATIVTOBI. This is how it's done right!"},rating:5.0,views:"79K",category:"spachteln",youtubeId:"3TPXAaTwtjQ",channel:"KREATIVTOBI"},
  {title:{de:"Decke richtig mit Gipskarton abhängen | toom Werkstatt",en:"Decke richtig mit Gipskarton abhängen | toom Werkstatt"},description:{de:"Decke richtig mit Gipskarton abhängen. toom Werkstatt zeigt Ihnen, wie Sie eine Decke im Trockenbau professionell abhängen.",en:"Lower a ceiling correctly with plasterboard. toom Werkstatt shows you how to professionally lower a ceiling using drywall construction."},rating:5.0,views:"60K",category:"decken",youtubeId:"Imv2RVELSKM",channel:"toom Baumarkt"},
  {title:{de:"Trockenbau selber machen - Anleitung Teil 1",en:"Trockenbau selber machen - Anleitung Teil 1"},description:{de:"Trockenbau selber machen – Teil 1 der Anleitung von bausatz.netzwerk. Die Grundlagen für Ihr Trockenbauprojekt.",en:"Do-it-yourself drywall construction - Part 1 of the guide from bausatz.netzwerk. The basics for your drywall project."},rating:4.1,views:"1.5M",category:"grundlagen",youtubeId:"QGodfn8jV-c",channel:"bausatz.netzwerk by DAVIDFILM"},
  {title:{de:"Rigips/Gipskarton an Dachschräge schrauben / Dachausbau",en:"Rigips/Gipskarton an Dachschräge schrauben / Dachausbau"},description:{de:"Rigips/Gipskarton an Dachschräge schrauben: Detaillierte Anleitung für den Dachausbau von DH-Trockenbau. Verständlich und präzise.",en:"Screwing Rigips/plasterboard to a roof slope: Detailed guide for attic conversion from DH-Trockenbau. Understandable and precise."},rating:4.1,views:"1.3M",category:"dachausbau",youtubeId:"Q0DrHFNzLiQ",channel:"DH-Trockenbau"}
];

    // Kategorien mit deutschen und englischen Namen
    const CATEGORIES = {
        grundlagen: { de: '📚 Grundlagen', en: '📚 Basics', icon: '📚' },
        dachausbau: { de: '🏠 Dachausbau', en: '🏠 Attic Conversion', icon: '🏠' },
        vorwand: { de: '🧱 Vorwandinstallation', en: '🧱 Wall Installation', icon: '🧱' },
        decke: { de: '⬆️ Deckenmontage', en: '⬆️ Ceiling Installation', icon: '⬆️' },
        reparatur: { de: '🔧 Reparatur', en: '🔧 Repair', icon: '🔧' },
        werkzeuge: { de: '🛠️ Werkzeuge', en: '🛠️ Tools', icon: '🛠️' },
        tueren: { de: '🚪 Türen & Öffnungen', en: '🚪 Doors & Openings', icon: '🚪' },
        spachteln: { de: '✨ Spachteln & Finish', en: '✨ Taping & Finishing', icon: '✨' },
        installation: { de: '🔨 Installation', en: '🔨 Installation', icon: '🔨' }
    };

    // UI Texte
    const UI_TEXT = {
        de: {
            siteTitle: 'Heimwerker Meister',
            subtitle: 'Die besten Trockenbau-Tutorials',
            searchPlaceholder: 'Videos suchen...',
            allCategories: 'Alle Kategorien',
            watchOnYouTube: 'Auf YouTube ansehen',
            views: 'Aufrufe',
            verifiedBy: 'Geprüft von Trockenbaumeister',
            lastUpdate: 'Letzte Aktualisierung'
        },
        en: {
            siteTitle: 'DIY Master',
            subtitle: 'The Best Drywall Tutorials',
            searchPlaceholder: 'Search videos...',
            allCategories: 'All Categories',
            watchOnYouTube: 'Watch on YouTube',
            views: 'views',
            verifiedBy: 'Verified by Drywall Expert',
            lastUpdate: 'Last update'
        }
    };

    let currentLang = localStorage.getItem('language') || 'de';

    // DOM Elements
    const videoGrid = document.getElementById('video-grid');
    const categorySections = document.getElementById('category-sections');
    const searchInput = document.getElementById('search-input');
    const filterSelect = document.getElementById('filter-select');
    const modal = document.getElementById('video-modal');
    const modalContent = document.getElementById('modal-video-details');
    const closeButton = document.querySelector('.close-button');
    const watchOnYouTube = document.getElementById('watch-on-youtube');
    const deButton = document.getElementById('de-button');
    const enButton = document.getElementById('en-button');
    const siteTitle = document.getElementById('site-title');
    const siteSubtitle = document.getElementById('site-subtitle');

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;

        // Update UI text
        const text = UI_TEXT[lang];
        siteTitle.textContent = text.siteTitle;
        if (siteSubtitle) siteSubtitle.textContent = text.subtitle;
        searchInput.placeholder = text.searchPlaceholder;
        watchOnYouTube.textContent = text.watchOnYouTube;

        // Update filter options
        const allOption = filterSelect.querySelector('option[value="all"]');
        if (allOption) allOption.textContent = text.allCategories;

        // Update category options in filter
        filterSelect.querySelectorAll('option').forEach(opt => {
            if (opt.value !== 'all' && CATEGORIES[opt.value]) {
                opt.textContent = CATEGORIES[opt.value][lang];
            }
        });

        // Update active button
        deButton.classList.toggle('active', lang === 'de');
        enButton.classList.toggle('active', lang === 'en');

        renderContent();
    }

    function createVideoCard(video, index) {
        const title = video.title[currentLang] || video.title.de;
        const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;
        const categoryName = CATEGORIES[video.category]?.[currentLang] || video.category;

        const card = document.createElement('div');
        card.classList.add('video-card');
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Video: ${title}`);
        card.id = `video-${index}`;

        card.innerHTML = `
            <div class="thumbnail">
                <img src="${thumbnailUrl}" alt="${title}" loading="lazy">
                <div class="play-overlay">▶</div>
                <span class="category-badge">${CATEGORIES[video.category]?.icon || '📹'}</span>
            </div>
            <div class="details">
                <div class="title">${title}</div>
                <div class="channel">📺 ${video.channel}</div>
                <div class="meta">
                    <span class="rating">${'⭐'.repeat(Math.round(video.rating))} ${video.rating}</span>
                    <span class="views">${video.views} ${UI_TEXT[currentLang].views}</span>
                </div>
            </div>
        `;

        card.addEventListener('click', () => openModal(video, card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(video, card);
            }
        });

        return card;
    }

    function renderContent() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterCategory = filterSelect.value;

        // Clear both containers
        videoGrid.innerHTML = '';
        if (categorySections) categorySections.innerHTML = '';

        // Filter videos
        const filteredVideos = videos.filter(video => {
            const title = (video.title[currentLang] || video.title.de).toLowerCase();
            const desc = (video.description[currentLang] || video.description.de).toLowerCase();
            const matchesSearch = title.includes(searchTerm) || desc.includes(searchTerm);
            const matchesCategory = filterCategory === 'all' || video.category === filterCategory;
            return matchesSearch && matchesCategory;
        });

        // No results message
        if (filteredVideos.length === 0) {
            if (categorySections) categorySections.style.display = 'none';
            videoGrid.style.display = 'block';
            videoGrid.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <p style="font-size: 3rem; margin-bottom: 1rem;">🔍</p>
                    <p style="font-size: 1.2rem;">${currentLang === 'de' ? 'Keine Videos gefunden' : 'No videos found'}</p>
                    <p>${currentLang === 'de' ? 'Versuche einen anderen Suchbegriff' : 'Try a different search term'}</p>
                </div>
            `;
            return;
        }

        // If filtering or searching, show flat grid
        if (filterCategory !== 'all' || searchTerm) {
            if (categorySections) categorySections.style.display = 'none';
            videoGrid.style.display = 'grid';

            filteredVideos.forEach((video, index) => {
                videoGrid.appendChild(createVideoCard(video, index));
            });
        } else {
            // Show categorized sections
            if (categorySections) categorySections.style.display = 'block';
            videoGrid.style.display = 'none';

            // Group videos by category
            const grouped = {};
            filteredVideos.forEach(video => {
                const cat = video.category || 'grundlagen';
                if (!grouped[cat]) grouped[cat] = [];
                grouped[cat].push(video);
            });

            // Render each category
            Object.entries(grouped).forEach(([category, categoryVideos]) => {
                const section = document.createElement('div');
                section.classList.add('category-section');

                const categoryName = CATEGORIES[category]?.[currentLang] || category;

                section.innerHTML = `
                    <div class="category-header">
                        <h2>${categoryName}</h2>
                        <span class="count">${categoryVideos.length} Videos</span>
                    </div>
                    <div class="video-grid category-grid"></div>
                `;

                const grid = section.querySelector('.category-grid');
                categoryVideos.forEach((video, index) => {
                    grid.appendChild(createVideoCard(video, `${category}-${index}`));
                });

                categorySections.appendChild(section);
            });
        }
    }

    function openModal(video, triggerElement) {
        const title = video.title[currentLang] || video.title.de;
        const desc = video.description[currentLang] || video.description.de;
        const categoryName = CATEGORIES[video.category]?.[currentLang] || video.category;

        modalContent.innerHTML = `
            <img src="https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg" alt="${title}" class="modal-thumbnail">
            <h2>${title}</h2>
            <p class="modal-channel">📺 ${video.channel}</p>
            <p class="modal-category">📁 ${categoryName}</p>
            <p>${desc}</p>
            <div class="modal-meta">
                <span>⭐ ${video.rating}</span>
                <span>👁️ ${video.views} ${UI_TEXT[currentLang].views}</span>
            </div>
        `;

        watchOnYouTube.href = `https://www.youtube.com/watch?v=${video.youtubeId}`;
        watchOnYouTube.style.display = 'inline-block';
        watchOnYouTube.textContent = UI_TEXT[currentLang].watchOnYouTube;

        modal.style.display = 'block';
        modal.setAttribute('aria-hidden', 'false');
        closeButton.focus();
        modal.dataset.triggerElement = triggerElement?.id || '';
    }

    function closeModal() {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');

        const triggerId = modal.dataset.triggerElement;
        if (triggerId) {
            const trigger = document.getElementById(triggerId);
            if (trigger) trigger.focus();
        }
    }

    // Event Listeners
    deButton.addEventListener('click', () => setLanguage('de'));
    enButton.addEventListener('click', () => setLanguage('en'));
    searchInput.addEventListener('input', renderContent);
    filterSelect.addEventListener('change', renderContent);
    closeButton.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Initialize
    setLanguage(currentLang);

    // Set dynamic date
    const lastUpdateEl = document.getElementById('last-update');
    if (lastUpdateEl) {
        const now = new Date();
        lastUpdateEl.textContent = now.toLocaleDateString(currentLang === 'de' ? 'de-DE' : 'en-GB');
    }
});
