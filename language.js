// ==========================================
// FloraVerse - Language Selector
// Browser Translation Friendly Version
// ==========================================

const floraLanguages = [
    { code: "en", name: "English", flag: "🇬🇧" },

    // Indian Languages
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "mr", name: "मराठी", flag: "🇮🇳" },
    { code: "gu", name: "ગુજરાતી", flag: "🇮🇳" },
    { code: "bn", name: "বাংলা", flag: "🇮🇳" },
    { code: "ta", name: "தமிழ்", flag: "🇮🇳" },
    { code: "te", name: "తెలుగు", flag: "🇮🇳" },
    { code: "kn", name: "ಕನ್ನಡ", flag: "🇮🇳" },
    { code: "ml", name: "മലയാളം", flag: "🇮🇳" },
    { code: "pa", name: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
    { code: "as", name: "অসমীয়া", flag: "🇮🇳" },
    { code: "or", name: "ଓଡ଼ିଆ", flag: "🇮🇳" },
    { code: "ur", name: "اردو", flag: "🇮🇳" },

    // Other Popular Languages
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "it", name: "Italian", flag: "🇮🇹" },
    { code: "pt", name: "Portuguese", flag: "🇵🇹" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "ar", name: "العربية", flag: "🇸🇦" }
];


// ==========================================
// Create Language Selector
// ==========================================

function createLanguageSelector() {

    // Don't create twice
    if (document.getElementById("languageSelector")) {
        return;
    }

    const selector = document.createElement("div");

    selector.id = "languageSelector";

    selector.innerHTML = `
        <button id="languageButton" type="button">
            <span class="language-icon">🌐</span>
            <span class="language-text">Language</span>
        </button>

        <div id="languageMenu">

            <div class="language-search-box">
                <input
                    type="text"
                    id="languageSearch"
                    placeholder="Search language..."
                    autocomplete="off"
                >
            </div>

            <div id="languageList"></div>

        </div>
    `;


    // ==========================================
    // Add selector to navbar
    // ==========================================

    const navbar = document.querySelector("nav");

    if (navbar) {

        navbar.appendChild(selector);

    } else {

        // Fallback if navbar is not found
        document.body.prepend(selector);

    }


    // ==========================================
    // Elements
    // ==========================================

    const button = document.getElementById("languageButton");
    const menu = document.getElementById("languageMenu");
    const search = document.getElementById("languageSearch");
    const list = document.getElementById("languageList");


    // ==========================================
    // Show Languages
    // ==========================================

    function showLanguages(filter = "") {

        const searchText = filter.toLowerCase().trim();

        const filteredLanguages = floraLanguages.filter(language =>
            language.name.toLowerCase().includes(searchText) ||
            language.code.toLowerCase().includes(searchText)
        );


        // No language found
        if (filteredLanguages.length === 0) {

            list.innerHTML = `
                <div class="no-language-found">
                    No language found
                </div>
            `;

            return;
        }


        // Create language buttons
        list.innerHTML = filteredLanguages.map(language => `
            
            <button
                class="language-option"
                type="button"
                data-language="${language.code}"
            >

                <span class="language-flag">
                    ${language.flag}
                </span>

                <span>
                    ${language.name}
                </span>

            </button>

        `).join("");


        // Add click event
        const options = list.querySelectorAll(".language-option");

        options.forEach(option => {

            option.addEventListener("click", () => {

                const languageCode =
                    option.getAttribute("data-language");

                selectLanguage(languageCode);

            });

        });

    }


    // ==========================================
    // Open / Close Language Menu
    // ==========================================

    button.addEventListener("click", (event) => {

        event.stopPropagation();

        menu.classList.toggle("show");

        if (menu.classList.contains("show")) {

            showLanguages();

            search.value = "";

            setTimeout(() => {
                search.focus();
            }, 100);

        }

    });


    // ==========================================
    // Search Languages
    // ==========================================

    search.addEventListener("input", () => {

        showLanguages(search.value);

    });


    // ==========================================
    // Prevent menu from closing
    // ==========================================

    menu.addEventListener("click", (event) => {

        event.stopPropagation();

    });


    // ==========================================
    // Close when clicking outside
    // ==========================================

    document.addEventListener("click", () => {

        menu.classList.remove("show");

    });


    // Initial language list
    showLanguages();
}


// ==========================================
// Select Language
// ==========================================

function selectLanguage(languageCode) {

    const language = floraLanguages.find(
        item => item.code === languageCode
    );


    if (!language) {
        return;
    }


    // Save selected language
    localStorage.setItem(
        "floraVerseLanguage",
        languageCode
    );


    // Tell browser the selected page language
    document.documentElement.lang = languageCode;


    // Update button text
    const languageText =
        document.querySelector(".language-text");

    if (languageText) {

        languageText.textContent = language.name;

    }


    // Close menu
    const menu =
        document.getElementById("languageMenu");

    if (menu) {

        menu.classList.remove("show");

    }


    // ==========================================
    // Browser Translation Message
    // ==========================================

    showTranslationMessage(language);

}


// ==========================================
// Browser Translation Helper
// ==========================================

function showTranslationMessage(language) {

    // Remove old message
    const oldMessage =
        document.getElementById("translationMessage");

    if (oldMessage) {
        oldMessage.remove();
    }


    // English selected
    if (language.code === "en") {
        return;
    }


    const message = document.createElement("div");

    message.id = "translationMessage";

    message.innerHTML = `
        <div class="translation-icon">🌐</div>

        <div class="translation-content">

            <strong>
                Translate FloraVerse
            </strong>

            <span>
                Your browser can translate this page
                to <b>${language.name}</b>.
                Use your browser's Translate option.
            </span>

        </div>

        <button
            type="button"
            id="closeTranslationMessage"
            aria-label="Close"
        >
            ×
        </button>
    `;


    document.body.appendChild(message);


    // Close button
    const closeButton =
        document.getElementById(
            "closeTranslationMessage"
        );


    if (closeButton) {

        closeButton.addEventListener("click", () => {

            message.remove();

        });

    }


    // Automatically hide after 8 seconds
    setTimeout(() => {

        if (message) {
            message.remove();
        }

    }, 8000);

}


// ==========================================
// Detect Browser Language
// ==========================================

function detectBrowserLanguage() {

    const savedLanguage =
        localStorage.getItem("floraVerseLanguage");


    // User already selected a language
    if (savedLanguage) {

        return savedLanguage;

    }


    // Get browser language
    const browserLanguage =
        navigator.language
            .toLowerCase()
            .split("-")[0];


    // Check if supported
    const supported =
        floraLanguages.some(
            language =>
                language.code === browserLanguage
        );


    if (supported) {

        return browserLanguage;

    }


    // Default
    return "en";
}


// ==========================================
// Apply Initial Language
// ==========================================

function applyInitialLanguage() {

    const languageCode =
        detectBrowserLanguage();


    const language =
        floraLanguages.find(
            item => item.code === languageCode
        );


    // Set HTML language
    document.documentElement.lang =
        languageCode;


    // Update button
    const languageText =
        document.querySelector(".language-text");


    if (languageText && language) {

        languageText.textContent =
            language.name;

    }

}


// ==========================================
// Start FloraVerse Language System
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        createLanguageSelector();

        applyInitialLanguage();

    }
);