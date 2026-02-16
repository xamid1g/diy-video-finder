document.addEventListener('DOMContentLoaded', () => {
    // KURATIERTE Videos vom DIY Video Finder (16. February 2026)
    // Geprüft durch: YouTube Researcher → Trockenbaumeister → Content Curator → Frontend Developer
    const videos = [
  {title:{de:"Erstellung von Vorsatzschalen mit Unterkonstruktion - Rigips Verarbeitungsanleitung Trockenbau",en:"Erstellung von Vorsatzschalen mit Unterkonstruktion - Rigips Verarbeitungsanleitung Trockenbau"},description:{de:"Rigips zeigt: Schritt-für-Schritt Vorsatzschalen erstellen. Unterkonstruktion & Montage leicht gemacht! Ideal für Schall- & Wärmedämmung.",en:"Rigips tutorial: Creating furring strips with substructure. Easy installation for sound and thermal insulation."},rating:5.0,views:"1.5M",category:"grundlagen",youtubeId:"i7jZ9suB9y8",channel:"SAINT-GOBAIN RIGIPS GmbH"},
  {title:{de:"Dachgeschossausbau Verarbeitung Dämmung - Rigips Verarbeitungsanleitung Trockenbau",en:"Dachgeschossausbau Verarbeitung Dämmung - Rigips Verarbeitungsanleitung Trockenbau"},description:{de:"Dachgeschossausbau leicht gemacht! Rigips zeigt, wie Sie richtig dämmen. Schritt-für-Schritt Anleitung für den Trockenbau.",en:"Attic conversion made easy! Rigips shows how to insulate correctly. Step-by-step guide for drywall construction."},rating:5.0,views:"1.2M",category:"dachausbau",youtubeId:"jcvno6SMrBM",channel:"SAINT-GOBAIN RIGIPS GmbH"},
  {title:{de:"Erstellung/Aufbau von Holzständerwänden, Rigidur Gipsfaserplatten - Rigips Verarbeitung Trockenbau",en:"Erstellung/Aufbau von Holzständerwänden, Rigidur Gipsfaserplatten - Rigips Verarbeitung Trockenbau"},description:{de:"Holzständerwände bauen mit Rigidur Gipsfaserplatten: Rigips zeigt den Aufbau. Perfekt für stabilen & nachhaltigen Trockenbau.",en:"Building stud walls with Rigidur gypsum fiberboards: Rigips shows the structure. Perfect for stable & sustainable drywall."},rating:5.0,views:"911K",category:"grundlagen",youtubeId:"kyfTjpbcr_g",channel:"SAINT-GOBAIN RIGIPS GmbH"},
  {title:{de:"Trockenbauwand bauen – so geht’s richtig | BAUHAUS",en:"Trockenbauwand bauen – so geht’s richtig | BAUHAUS"},description:{de:"BAUHAUS zeigt: Trockenbauwand selber bauen – Schritt für Schritt erklärt. Einfache Anleitung für Heimwerker!",en:"BAUHAUS shows: Build a drywall yourself - explained step by step. Simple guide for DIY enthusiasts!"},rating:5.0,views:"865K",category:"waende",youtubeId:"-1gU2JrwAqo",channel:"BAUHAUS"},
  {title:{de:"Trennwand einbauen | Schritt-für-Schritt-Anleitung",en:"Trennwand einbauen | Schritt-für-Schritt-Anleitung"},description:{de:"HELLWEG zeigt: Trennwand einbauen – leicht verständliche Schritt-für-Schritt-Anleitung. So teilen Sie Räume einfach auf!",en:"HELLWEG shows: Installing a partition wall - easy to understand step-by-step instructions. Easily divide rooms!"},rating:5.0,views:"537K",category:"waende",youtubeId:"CuWG8cjPxpE",channel:"HELLWEG Baumarkt"},
  {title:{de:"Gipskarton spachteln und schleifen | OBI",en:"Gipskarton spachteln und schleifen | OBI"},description:{de:"OBI zeigt: Gipskarton spachteln und schleifen – die besten Tipps und Tricks für glatte Wände im Trockenbau.",en:"OBI shows: Filling and sanding plasterboard - the best tips and tricks for smooth walls in drywall construction."},rating:5.0,views:"332K",category:"spachteln",youtubeId:"tMMnkflnZWY",channel:"OBI Baumarkt"},
  {title:{de:"Beplanken mit Gipsplatten | Trockenbauwand bauen - Teil 3",en:"Beplanken mit Gipsplatten | Trockenbauwand bauen - Teil 3"},description:{de:"Knauf erklärt: Gipsplatten beplanken im Trockenbau. Teil 3 einer Serie zum Trockenbauwand bauen.",en:"Knauf explains: Planking with gypsum boards in drywall construction. Part 3 of a series on building a drywall."},rating:5.0,views:"257K",category:"waende",youtubeId:"Sq_y8rqNYjs",channel:"Knauf GmbH Österreich"},
  {title:{de:"Metallprofile & Schrauben für den Trockenbau | Trockenbau Wissen",en:"Metallprofile & Schrauben für den Trockenbau | Trockenbau Wissen"},description:{de:"Knauf Wissen: Metallprofile & Schrauben für den Trockenbau. Alles, was Sie über die richtigen Materialien wissen müssen.",en:"Knauf knowledge: Metal profiles & screws for drywall construction. Everything you need to know about the right materials."},rating:5.0,views:"150K",category:"werkzeuge",youtubeId:"e9ghcbP200g",channel:"Knauf GmbH Österreich"},
  {title:{de:"Decke abhängen | Trockenbauguide | Deckensystem | Trockenbau -#Trockenbau #Decke #Spachteln",en:"Decke abhängen | Trockenbauguide | Deckensystem | Trockenbau -#Trockenbau #Decke #Spachteln"},description:{de:"Siniat Trockenbauguide: Decke abhängen leicht gemacht! Alles über Deckensysteme & Spachteln im Trockenbau.",en:"Siniat drywall guide: Suspended ceiling made easy! All about ceiling systems & filling in drywall construction."},rating:5.0,views:"131K",category:"decken",youtubeId:"DpEXwahrqSE",channel:"Siniat by Etex | Innovativer Trockenbau"},
  {title:{de:"Doppelbeplankte Trockenbauwand mit Tür bauen und dämmen | OBI",en:"Doppelbeplankte Trockenbauwand mit Tür bauen und dämmen | OBI"},description:{de:"OBI Schweiz zeigt: Doppelbeplankte Trockenbauwand mit Tür bauen und dämmen. Profi-Tipps für Schallschutz & Stabilität.",en:"OBI Switzerland shows: Building and insulating a double-planked drywall with a door. Professional tips for soundproofing & stability."},rating:4.8,views:"6K",category:"waende",youtubeId:"KxZYO-KoTCc",channel:"OBI Schweiz"}
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
