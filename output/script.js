document.addEventListener('DOMContentLoaded', () => {
    // KURATIERTE Videos vom DIY Video Finder (23. February 2026)
    // Geprüft durch: YouTube Researcher → Trockenbaumeister → Content Curator → Frontend Developer
    const videos = [
  {title:{de:"Erstellung von Montagedecken - Rigips Verarbeitungsanleitung Trockenbau",en:"Erstellung von Montagedecken - Rigips Verarbeitungsanleitung Trockenbau"},description:{de:"Rigips-Experten zeigen: Schritt-für-Schritt-Anleitung zur Erstellung professioneller Montagedecken im Trockenbau. Jetzt informieren!",en:"Rigips experts show: Step-by-step guide to creating professional suspended ceilings in drywall construction. Learn more now!"},rating:5.0,views:"1.7M",category:"grundlagen",youtubeId:"obvKgvIv_Vg",channel:"SAINT-GOBAIN RIGIPS GmbH"},
  {title:{de:"Erstellung von Türöffnungen - Rigips Verarbeitungsanleitung Trockenbau",en:"Erstellung von Türöffnungen - Rigips Verarbeitungsanleitung Trockenbau"},description:{de:"Professionelle Türöffnungen im Trockenbau erstellen: Die Rigips Verarbeitungsanleitung zeigt, wie es richtig geht! Jetzt ansehen.",en:"Creating professional door openings in drywall construction: The Rigips processing instructions show you how! Watch now."},rating:5.0,views:"1.6M",category:"tueren",youtubeId:"uoU_BlY_2Lw",channel:"SAINT-GOBAIN RIGIPS GmbH"},
  {title:{de:"Unterkonstruktion einer Ständerwand errichten | Trockenbauwand bauen - Teil 2",en:"Unterkonstruktion einer Ständerwand errichten | Trockenbauwand bauen - Teil 2"},description:{de:"Trockenbauwand selber bauen – Teil 2: Knauf zeigt, wie die Unterkonstruktion einer Ständerwand fachgerecht errichtet wird.",en:"Build your own drywall - Part 2: Knauf shows how to properly construct the substructure of a stud wall."},rating:5.0,views:"543K",category:"waende",youtubeId:"ihp8HXwQDl8",channel:"Knauf GmbH Österreich"},
  {title:{de:"Perfekt Verspachteln: So machst du keine Fehler - So geht Trockenbau",en:"Perfekt Verspachteln: So machst du keine Fehler - So geht Trockenbau"},description:{de:"Fehlerfrei verspachteln: Knauf erklärt, wie perfekte Oberflächen im Trockenbau gelingen. Vermeide typische Fehler! Jetzt Tutorial ansehen.",en:"Perfect filling: Knauf explains how to achieve perfect surfaces in drywall construction. Avoid typical mistakes! Watch the tutorial now."},rating:5.0,views:"440K",category:"spachteln",youtubeId:"ZrHqNdZzCw0",channel:"Knauf GmbH Österreich"},
  {title:{de:"Doppelbeplankte Trockenbauwand mit Tür bauen und dämmen | OBI",en:"Doppelbeplankte Trockenbauwand mit Tür bauen und dämmen | OBI"},description:{de:"Doppelbeplankte Trockenbauwand mit Tür selber bauen & dämmen: OBI zeigt, wie's geht! Profi-Tipps und Tricks für dein Projekt.",en:"Build & insulate a double-layered drywall with a door yourself: OBI shows you how! Professional tips and tricks for your project."},rating:5.0,views:"281K",category:"werkzeuge",youtubeId:"NlOS-hPiubc",channel:"OBI Baumarkt"},
  {title:{de:"Dachschrägen richtig verkleiden | toom Werkstatt",en:"Dachschrägen richtig verkleiden | toom Werkstatt"},description:{de:"Dachschrägen verkleiden leicht gemacht: toom zeigt dir, wie du deine Dachschräge im Trockenbau professionell verkleidest. Jetzt loslegen!",en:"Cladding roof slopes made easy: toom shows you how to professionally clad your roof slope using drywall. Get started now!"},rating:5.0,views:"215K",category:"dachausbau",youtubeId:"6HYYRFgMv1Q",channel:"toom Baumarkt"},
  {title:{de:"Trockenbau selber machen - Anleitung Teil 1",en:"Trockenbau selber machen - Anleitung Teil 1"},description:{de:"Trockenbau selber machen – Anleitung Teil 1: Die Grundlagen für dein Trockenbau-Projekt. Schritt für Schritt erklärt von bausatz.netzwerk.",en:"Do-it-yourself drywall - Part 1: The basics for your drywall project. Explained step by step by bausatz.netzwerk."},rating:4.1,views:"1.5M",category:"grundlagen",youtubeId:"QGodfn8jV-c",channel:"bausatz.netzwerk by DAVIDFILM"},
  {title:{de:"Rigips/Gipskarton an Dachschräge schrauben / Dachausbau",en:"Rigips/Gipskarton an Dachschräge schrauben / Dachausbau"},description:{de:"Rigips/Gipskarton an Dachschräge schrauben: DH-Trockenbau zeigt, wie du deinen Dachausbau mit Trockenbauplatten meisterst.",en:"Screwing Rigips/gypsum board to a roof slope: DH-Trockenbau shows you how to master your attic conversion with drywall boards."},rating:4.1,views:"1.3M",category:"dachausbau",youtubeId:"Q0DrHFNzLiQ",channel:"DH-Trockenbau"},
  {title:{de:"Abgehängte Decke...so geht das.",en:"Abgehängte Decke...so geht das."},description:{de:"Abgehängte Decke selber machen: bauXpertTV zeigt dir, wie du eine abgehängte Decke einfach und professionell montierst. Los geht's!",en:"DIY suspended ceiling: bauXpertTV shows you how to install a suspended ceiling easily and professionally. Let's go!"},rating:4.1,views:"1.2M",category:"decken",youtubeId:"Qy0y81hIKN0",channel:"bauXpertTV"},
  {title:{de:"Drei schlimme FEHLER beim Trockenbau - und wie man sie vermeiden kann",en:"Drei schlimme FEHLER beim Trockenbau - und wie man sie vermeiden kann"},description:{de:"3 schlimme Fehler im Trockenbau vermeiden: Der Wandprofi zeigt, welche Fehler du unbedingt vermeiden solltest. Jetzt ansehen & lernen!",en:"Avoid 3 bad mistakes in drywall construction: The wall professional shows which mistakes you should definitely avoid. Watch now & learn!"},rating:4.0,views:"790K",category:"waende",youtubeId:"ILUF74CsSf8",channel:"Der Wandprofi - Andreas Neufeld"}
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
