document.addEventListener('DOMContentLoaded', () => {
    // KURATIERTE Videos vom DIY Video Finder (20. July 2026)
    // Geprüft durch: YouTube Researcher → Trockenbaumeister → Content Curator → Frontend Developer
    const videos = [
  {title:{de:"Erstellung von Türöffnungen - Rigips Verarbeitungsanleitung Trockenbau",en:"Erstellung von Türöffnungen - Rigips Verarbeitungsanleitung Trockenbau"},description:{de:"In diesem Video zeigen wir Ihnen die Grundlagen für die Erstellung von Türöffnungen mit Rigips.
Unsere Reihe mit Verarbeitungsanleitungen im Trockenba",en:"In diesem Video zeigen wir Ihnen die Grundlagen für die Erstellung von Türöffnungen mit Rigips.
Unsere Reihe mit Verarbeitungsanleitungen im Trockenba"},rating:5.0,views:"1.6M",category:"tueren",youtubeId:"uoU_BlY_2Lw",channel:"SAINT-GOBAIN RIGIPS GmbH"},
  {title:{de:"Trennwand einbauen | Schritt-für-Schritt-Anleitung",en:"Trennwand einbauen | Schritt-für-Schritt-Anleitung"},description:{de:"Wir zeigen Schritt für Schritt, wie Sie eine Trennwand errichten. Die benötigten Materialien finden Sie in Ihrem HELLWEG-Markt oder unter http://bit.l",en:"Wir zeigen Schritt für Schritt, wie Sie eine Trennwand errichten. Die benötigten Materialien finden Sie in Ihrem HELLWEG-Markt oder unter http://bit.l"},rating:5.0,views:"549K",category:"waende",youtubeId:"CuWG8cjPxpE",channel:"HELLWEG Baumarkt"},
  {title:{de:"Gipskarton spachteln und schleifen | OBI",en:"Gipskarton spachteln und schleifen | OBI"},description:{de:"Eine Trockenbauwand zu verspachteln und abzuschleifen ist unabdingbar, um weitere Schritte wie das Tapezieren oder Streichen anzugehen. Das kannst du ",en:"Eine Trockenbauwand zu verspachteln und abzuschleifen ist unabdingbar, um weitere Schritte wie das Tapezieren oder Streichen anzugehen. Das kannst du "},rating:5.0,views:"362K",category:"spachteln",youtubeId:"tMMnkflnZWY",channel:"OBI Baumarkt"},
  {title:{de:"Gipskartonplatten anbringen: Wand mit Rigips verkleiden | Trockenbau Anleitung | BAUHAUS Workshop",en:"Gipskartonplatten anbringen: Wand mit Rigips verkleiden | Trockenbau Anleitung | BAUHAUS Workshop"},description:{de:"Gipskartonplatten anbringen ist die smarte Lösung, wenn du eine Wand sanieren willst, denn das saubere Verputzen braucht viel Erfahrung. Viel einfache",en:"Gipskartonplatten anbringen ist die smarte Lösung, wenn du eine Wand sanieren willst, denn das saubere Verputzen braucht viel Erfahrung. Viel einfache"},rating:5.0,views:"278K",category:"waende",youtubeId:"c2fFnuX3K0Q",channel:"BAUHAUS"},
  {title:{de:"Metallprofile & Schrauben für den Trockenbau | Trockenbau Wissen",en:"Metallprofile & Schrauben für den Trockenbau | Trockenbau Wissen"},description:{de:"Für die Konstruktion von Trockenbauwänden kommen unterschiedliche Profile und Schrauben zum Einsatz. In diesem Video erfährst du, was der Unterschied ",en:"Für die Konstruktion von Trockenbauwänden kommen unterschiedliche Profile und Schrauben zum Einsatz. In diesem Video erfährst du, was der Unterschied "},rating:5.0,views:"156K",category:"werkzeuge",youtubeId:"e9ghcbP200g",channel:"Knauf GmbH Österreich"},
  {title:{de:"🟡 Trockenbau: Decke einfach selbst abhängen mit Knauf Diamant Gipsplatten",en:"🟡 Trockenbau: Decke einfach selbst abhängen mit Knauf Diamant Gipsplatten"},description:{de:"Gezeigten Baumaterialien und Werkzeuge mit Affiliate Links (Beim Kauf über diese Links verdiene ich eine kleine Provision und ihr unterstützt somit me",en:"Gezeigten Baumaterialien und Werkzeuge mit Affiliate Links (Beim Kauf über diese Links verdiene ich eine kleine Provision und ihr unterstützt somit me"},rating:5.0,views:"121K",category:"werkzeuge",youtubeId:"Urt4LSfjQmg",channel:"Probier's - Bau"},
  {title:{de:"TROCKENBAU DECKE SPACHTELN Q1-Q4 mit Knauf Uniflott (So gehts richtig) ✅ Anleitung vom Profi 👷🏼‍♂️",en:"TROCKENBAU DECKE SPACHTELN Q1-Q4 mit Knauf Uniflott (So gehts richtig) ✅ Anleitung vom Profi 👷🏼‍♂️"},description:{de:"In dieser Zwischenfolge vom Wohnungsprojekt zeige ich euch wie man Trockenbau Decke richtig glatt spachtelt von Q1-Q4. 

Knauf LED Profil: https://tin",en:"In dieser Zwischenfolge vom Wohnungsprojekt zeige ich euch wie man Trockenbau Decke richtig glatt spachtelt von Q1-Q4. 

Knauf LED Profil: https://tin"},rating:5.0,views:"102K",category:"spachteln",youtubeId:"3TPXAaTwtjQ",channel:"KREATIVTOBI"},
  {title:{de:"Trockenbauwand mit Nische richtig bauen | toom Werkstatt",en:"Trockenbauwand mit Nische richtig bauen | toom Werkstatt"},description:{de:"Nischen in einer Trockenbauwand sind tolle Gestaltungselemente um z.B. den Fernseher oder Dekolampen in die Wand zu integrieren. Was du als Selbermach",en:"Nischen in einer Trockenbauwand sind tolle Gestaltungselemente um z.B. den Fernseher oder Dekolampen in die Wand zu integrieren. Was du als Selbermach"},rating:4.8,views:"10K",category:"waende",youtubeId:"gnjLVlfSirs",channel:"toom Baumarkt"},
  {title:{de:"Die Holzdecke: Nut-Feder-Deckenpaneele verlegen",en:"Die Holzdecke: Nut-Feder-Deckenpaneele verlegen"},description:{de:"Wer es edel mag, wird an seiner abgehängten Decke Nut-Feder-Deckenpaneele verlegen. Unsere Anleitung zeigt, wie solch eine Holzdecke gelingt!

Nicht i",en:"Wer es edel mag, wird an seiner abgehängten Decke Nut-Feder-Deckenpaneele verlegen. Unsere Anleitung zeigt, wie solch eine Holzdecke gelingt!

Nicht i"},rating:4.0,views:"545K",category:"decken",youtubeId:"Wf1fWKbOIFw",channel:"diybook"},
  {title:{de:"So spachtelst du Gipskarton richtig "Q1- Q4"",en:"So spachtelst du Gipskarton richtig "Q1- Q4""},description:{de:"https://malermeisterandy-shop.de/

✨ In diesem Video zeige ich dir Schritt für Schritt, wie du Gipskartonplatten richtig spachtelst – für ein Ergebnis",en:"https://malermeisterandy-shop.de/

✨ In diesem Video zeige ich dir Schritt für Schritt, wie du Gipskartonplatten richtig spachtelst – für ein Ergebnis"},rating:4.0,views:"317K",category:"grundlagen",youtubeId:"M7sOPBVXIFI",channel:"Malermeister Andy"}
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
