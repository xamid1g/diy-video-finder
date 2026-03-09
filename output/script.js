document.addEventListener('DOMContentLoaded', () => {
    // KURATIERTE Videos vom DIY Video Finder (09. March 2026)
    // Geprüft durch: YouTube Researcher → Trockenbaumeister → Content Curator → Frontend Developer
    const videos = [
  {title:{de:"Erstellung von Montagedecken - Rigips Verarbeitungsanleitung Trockenbau",en:"Erstellung von Montagedecken - Rigips Verarbeitungsanleitung Trockenbau"},description:{de:"Rigips Anleitung: Schritt für Schritt zur perfekten Montagedecke im Trockenbau. Jetzt einfach selbst machen!",en:"Rigips guide: Step-by-step to the perfect suspended ceiling in drywall construction. Do it yourself now!"},rating:5.0,views:"1.7M",category:"grundlagen",youtubeId:"obvKgvIv_Vg",channel:"SAINT-GOBAIN RIGIPS GmbH"},
  {title:{de:"Erstellung von Türöffnungen - Rigips Verarbeitungsanleitung Trockenbau",en:"Erstellung von Türöffnungen - Rigips Verarbeitungsanleitung Trockenbau"},description:{de:"Türöffnungen im Trockenbau erstellen: Die Rigips Verarbeitungsanleitung zeigt, wie's geht! Einfach und professionell.",en:"Creating door openings in drywall: The Rigips processing instructions show how! Simple and professional."},rating:5.0,views:"1.6M",category:"tueren",youtubeId:"uoU_BlY_2Lw",channel:"SAINT-GOBAIN RIGIPS GmbH"},
  {title:{de:"Unterkonstruktion einer Ständerwand errichten | Trockenbauwand bauen - Teil 2",en:"Unterkonstruktion einer Ständerwand errichten | Trockenbauwand bauen - Teil 2"},description:{de:"Trockenbauwand Teil 2: Knauf zeigt den Aufbau der Unterkonstruktion einer Ständerwand. Verständlich erklärt!",en:"Drywall Part 2: Knauf shows the construction of the substructure of a stud wall. Clearly explained!"},rating:5.0,views:"546K",category:"waende",youtubeId:"ihp8HXwQDl8",channel:"Knauf GmbH Österreich"},
  {title:{de:"Perfekt Verspachteln: So machst du keine Fehler - So geht Trockenbau",en:"Perfekt Verspachteln: So machst du keine Fehler - So geht Trockenbau"},description:{de:"Trockenbau verspachteln leicht gemacht: Knauf zeigt, wie's richtig geht und Fehler vermieden werden. Profi-Tipps!",en:"Easy drywall filling: Knauf shows how to do it right and avoid mistakes. Pro tips!"},rating:5.0,views:"444K",category:"spachteln",youtubeId:"ZrHqNdZzCw0",channel:"Knauf GmbH Österreich"},
  {title:{de:"Vorwandelement WC einbauen | Vorwandinstallation mit Gipskarton verkleiden | BAUHAUS Workshop",en:"Vorwandelement WC einbauen | Vorwandinstallation mit Gipskarton verkleiden | BAUHAUS Workshop"},description:{de:"BAUHAUS Workshop: Vorwandelement für WC einbauen und mit Gipskarton verkleiden. Schritt-für-Schritt Anleitung.",en:"BAUHAUS Workshop: Install a pre-wall element for the toilet and clad it with plasterboard. Step-by-step instructions."},rating:5.0,views:"378K",category:"waende",youtubeId:"ICHh-_6RJNA",channel:"BAUHAUS"},
  {title:{de:"Doppelbeplankte Trockenbauwand mit Tür bauen und dämmen | OBI",en:"Doppelbeplankte Trockenbauwand mit Tür bauen und dämmen | OBI"},description:{de:"Doppelbeplankte Trockenbauwand mit Tür bauen und dämmen: OBI zeigt, wie's geht. Inklusive Dämmung!",en:"Build and insulate a double-planked drywall wall with a door: OBI shows how. Insulation included!"},rating:5.0,views:"284K",category:"werkzeuge",youtubeId:"NlOS-hPiubc",channel:"OBI Baumarkt"},
  {title:{de:"🟡 Trockenbau: Decke einfach selbst abhängen mit Knauf Diamant Gipsplatten",en:"🟡 Trockenbau: Decke einfach selbst abhängen mit Knauf Diamant Gipsplatten"},description:{de:"Knauf Diamant: Decke einfach selbst abhängen! Die einfache Anleitung für den Trockenbau von Probier's - Bau.",en:"Knauf Diamant: Easily suspend the ceiling yourself! The simple instructions for drywall construction from Probier's - Bau."},rating:5.0,views:"114K",category:"werkzeuge",youtubeId:"Urt4LSfjQmg",channel:"Probier's - Bau"},
  {title:{de:"TROCKENBAU DECKE SPACHTELN Q1-Q4 mit Knauf Uniflott (So gehts richtig) ✅ Anleitung vom Profi 👷🏼‍♂️",en:"TROCKENBAU DECKE SPACHTELN Q1-Q4 mit Knauf Uniflott (So gehts richtig) ✅ Anleitung vom Profi 👷🏼‍♂️"},description:{de:"Trockenbau Decke spachteln Q1-Q4: Profi-Anleitung mit Knauf Uniflott von KREATIVTOBI. So wird's perfekt!",en:"Drywall ceiling filling Q1-Q4: Professional guide with Knauf Uniflott from KREATIVTOBI. That's how it becomes perfect!"},rating:5.0,views:"84K",category:"spachteln",youtubeId:"3TPXAaTwtjQ",channel:"KREATIVTOBI"},
  {title:{de:"Gipsplatten für den Innenausbau | Trockenbau Wissen",en:"Gipsplatten für den Innenausbau | Trockenbau Wissen"},description:{de:"Gipsplatten für den Innenausbau: Knauf erklärt alles Wissenswerte rund um den Trockenbau. Jetzt informieren!",en:"Gypsum boards for interior finishing: Knauf explains everything you need to know about drywall construction. Get informed now!"},rating:5.0,views:"54K",category:"grundlagen",youtubeId:"ecQ5Cj7bH6w",channel:"Knauf GmbH Österreich"},
  {title:{de:"Drei schlimme FEHLER beim Trockenbau - und wie man sie vermeiden kann",en:"Drei schlimme FEHLER beim Trockenbau - und wie man sie vermeiden kann"},description:{de:"Drei schlimme Fehler im Trockenbau und wie man sie vermeidet: Tipps vom Profi Der Wandprofi - Andreas Neufeld.",en:"Three bad mistakes in drywall construction and how to avoid them: Tips from the pro Der Wandprofi - Andreas Neufeld."},rating:4.0,views:"794K",category:"waende",youtubeId:"ILUF74CsSf8",channel:"Der Wandprofi - Andreas Neufeld"}
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
