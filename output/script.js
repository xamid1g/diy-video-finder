document.addEventListener('DOMContentLoaded', () => {
    // KURATIERTE Videos vom DIY Video Finder (13. July 2026)
    // Geprüft durch: YouTube Researcher → Trockenbaumeister → Content Curator → Frontend Developer
    const videos = [
  {title:{de:"Erstellung von Montagedecken - Rigips Verarbeitungsanleitung Trockenbau",en:"Erstellung von Montagedecken - Rigips Verarbeitungsanleitung Trockenbau"},description:{de:"In diesem Video zeigen wir Ihnen die Grundlagen für die Erstellung von Montagedecken mit Rigips.
Unsere Reihe mit Verarbeitungsanleitungen im Trockenb",en:"In diesem Video zeigen wir Ihnen die Grundlagen für die Erstellung von Montagedecken mit Rigips.
Unsere Reihe mit Verarbeitungsanleitungen im Trockenb"},rating:5.0,views:"1.7M",category:"grundlagen",youtubeId:"obvKgvIv_Vg",channel:"SAINT-GOBAIN RIGIPS GmbH"},
  {title:{de:"Verarbeitung freitragender Decken F 30 - Rigips Verarbeitung Trockenbau",en:"Verarbeitung freitragender Decken F 30 - Rigips Verarbeitung Trockenbau"},description:{de:"ACHTUNG: 
Bei Min. 1:27 hat sich ein Fehler eingeschlichen, die dort angegebenen Maße sind falsch, richtig ist:
625 mm + 2.000 mm (Standardmaß) oder
6",en:"ACHTUNG: 
Bei Min. 1:27 hat sich ein Fehler eingeschlichen, die dort angegebenen Maße sind falsch, richtig ist:
625 mm + 2.000 mm (Standardmaß) oder
6"},rating:5.0,views:"624K",category:"grundlagen",youtubeId:"AHTM1fYmvB4",channel:"SAINT-GOBAIN RIGIPS GmbH"},
  {title:{de:"Unterkonstruktion einer Ständerwand errichten | Trockenbauwand bauen - Teil 2",en:"Unterkonstruktion einer Ständerwand errichten | Trockenbauwand bauen - Teil 2"},description:{de:"In dieser Episode von "So geht Trockenbau" Serie lernst du, wie du für deine selbstgebaute Trockenbauwand das Ständerwerk mit Tür aufstellst. Die Unte",en:"In dieser Episode von "So geht Trockenbau" Serie lernst du, wie du für deine selbstgebaute Trockenbauwand das Ständerwerk mit Tür aufstellst. Die Unte"},rating:5.0,views:"570K",category:"waende",youtubeId:"ihp8HXwQDl8",channel:"Knauf GmbH Österreich"},
  {title:{de:"Perfekt Verspachteln: So machst du keine Fehler - So geht Trockenbau",en:"Perfekt Verspachteln: So machst du keine Fehler - So geht Trockenbau"},description:{de:"Willst du spachteln wie ein echter Meisterspachtler? Unser Vorfürmeister Adi ist unser Mann wenns ums Verspachteln von Trockenbauwänden geht. In diese",en:"Willst du spachteln wie ein echter Meisterspachtler? Unser Vorfürmeister Adi ist unser Mann wenns ums Verspachteln von Trockenbauwänden geht. In diese"},rating:5.0,views:"469K",category:"spachteln",youtubeId:"ZrHqNdZzCw0",channel:"Knauf GmbH Österreich"},
  {title:{de:"Bilder, Schrank, Regal und Fernseher an Trockenbauwand montieren (Anleitung)",en:"Bilder, Schrank, Regal und Fernseher an Trockenbauwand montieren (Anleitung)"},description:{de:"Dass man keine schweren Lasten auf eine Trockenbauwand montieren kann ist ein Mythos! Wir zeigen dir in diesem Video wie du Bilder, Boards, Kästen ode",en:"Dass man keine schweren Lasten auf eine Trockenbauwand montieren kann ist ein Mythos! Wir zeigen dir in diesem Video wie du Bilder, Boards, Kästen ode"},rating:5.0,views:"328K",category:"waende",youtubeId:"-hdH2xctAYg",channel:"Knauf GmbH Österreich"},
  {title:{de:"Doppelbeplankte Trockenbauwand mit Tür bauen und dämmen | OBI",en:"Doppelbeplankte Trockenbauwand mit Tür bauen und dämmen | OBI"},description:{de:"Mit Gipskartonplatten kannst du ohne großen Arbeitsaufwand oder Vorkenntnisse flexibel Räume aufteilen, um so den Grundriss deines Zuhauses zu verände",en:"Mit Gipskartonplatten kannst du ohne großen Arbeitsaufwand oder Vorkenntnisse flexibel Räume aufteilen, um so den Grundriss deines Zuhauses zu verände"},rating:5.0,views:"307K",category:"werkzeuge",youtubeId:"NlOS-hPiubc",channel:"OBI Baumarkt"},
  {title:{de:"Drei schlimme FEHLER beim Trockenbau - und wie man sie vermeiden kann",en:"Drei schlimme FEHLER beim Trockenbau - und wie man sie vermeiden kann"},description:{de:"Leider schon häufig gesehen. Es gibt drei große Fehler, die man beim Trockenbau machen kann und welche schlimme Folgen mit sich bringen, die sich erst",en:"Leider schon häufig gesehen. Es gibt drei große Fehler, die man beim Trockenbau machen kann und welche schlimme Folgen mit sich bringen, die sich erst"},rating:4.0,views:"818K",category:"waende",youtubeId:"ILUF74CsSf8",channel:"Der Wandprofi - Andreas Neufeld"},
  {title:{de:"Decke abhängen - 2D",en:"Decke abhängen - 2D"},description:{de:"Decke abhängen - Die Anleitung! Es gibt viele Gründe, eine Zimmerdecke abzuhängen. In einem Altbau zum Beispiel lassen sich durch das verringerte Raum",en:"Decke abhängen - Die Anleitung! Es gibt viele Gründe, eine Zimmerdecke abzuhängen. In einem Altbau zum Beispiel lassen sich durch das verringerte Raum"},rating:4.0,views:"557K",category:"decken",youtubeId:"DOqitqywzjk",channel:"diybook"},
  {title:{de:"Alles rund um den Hohlraumdübel: Montage & Funktion",en:"Alles rund um den Hohlraumdübel: Montage & Funktion"},description:{de:"Welcher Dübel für Rigipswände? In unserem neuen Video stellen wir fünf verschiedene Dübel vor und demonstrieren, was sie wirklich draufhaben!

Immer w",en:"Welcher Dübel für Rigipswände? In unserem neuen Video stellen wir fünf verschiedene Dübel vor und demonstrieren, was sie wirklich draufhaben!

Immer w"},rating:4.0,views:"375K",category:"waende",youtubeId:"1ofu_1cv0eA",channel:"diybook"},
  {title:{de:"Verspachtelung für Wände. [Q3 +Q4] Glatter gehts nicht!",en:"Verspachtelung für Wände. [Q3 +Q4] Glatter gehts nicht!"},description:{de:"Nutzen Sie für eine hochqualitative Oberfläche unseren fertiggemischten, bindemittelstarken, mineralischen Flächenspachtel Palmcolor Handspachtel Dolo",en:"Nutzen Sie für eine hochqualitative Oberfläche unseren fertiggemischten, bindemittelstarken, mineralischen Flächenspachtel Palmcolor Handspachtel Dolo"},rating:4.0,views:"348K",category:"waende",youtubeId:"4381LAWPLv4",channel:"einzA Farben und Lacke"}
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
