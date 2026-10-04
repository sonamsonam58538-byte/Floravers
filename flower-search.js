// ==========================================
// 🌸 FLORAVERSE FLOWER SEARCH
// ==========================================

const flowerSearchData = [
    "Lotus",
    "Rose",
    "Sunflower",
    "Tulip",
    "Marigold",
    "Orchid",
    "Jasmine",
    "Lily",
    "Carnation",
    "Daffodil",
    "Daisy",
    "Hibiscus",
    "Lavender",
    "Magnolia",
    "Peony",
    "Coreopsis",
    "Cherry Blossom",
    "Dandelion",
    "Poppy",
    "Iris",
    "Cosmos",
    "Gerbera",
    "Zinnia",
    "Dahlia",
    "Chrysanthemum",
    "Gardenia",
    "Plumeria",
    "Periwinkle",
    "Snapdragon",
    "Morning Glory",
    "Bluebell",
    "Freesia",
    "Jasmine Sambac",
    "Bougainvillea",
    "Petunia",
    "Begonia",
    "Camellia",
    "Azalea",
    "Anemone",
    "Aster",
    "Calendula",
    "Calla Lily",
    "Foxglove",
    "Gladiolus",
    "Heather",
    "Honeysuckle",
    "Hydrangea",
    "Impatiens",
    "Lilac",
    "Nasturtium",
    "Pansy",
    "Primrose",
    "Ranunculus",
    "Rhododendron",
    "Sweet Pea",
    "Violet",
    "Wisteria",
    "Yarrow",
    "Amaryllis",
    "Bird of Paradise",
    "Bleeding Heart",
    "Buttercup",
    "Columbine",
    "Crocus",
    "Delphinium",
    "Edelweiss",
    "Forget-Me-Not",
    "Fuchsia",
    "Hollyhock",
    "Jacaranda",
    "Lantana",
    "Lupine",
    "Mimosa",
    "Narcissus",
    "Oleander",
    "Passion Flower",
    "Queen Anne's Lace",
    "Salvia",
    "Snowdrop",
    "Statice",
    "Tuberose",
    "Verbena",
    "Wallflower",
    "Water Lily",
    "Cosmos Sulphureus",
    "Fox and Cubs",
    "Goldenrod",
    "Morning Glory Blue",
    "Moonflower",
    "Nasturtium Yellow",
    "Poinsettia",
    "Protea",
    "Saffron Crocus",
    "Sea Holly",
    "Star Jasmine",
    "Torch Ginger",
    "Trumpet Vine",
    "Wild Rose",
    "Winter Jasmine"
];


// ==========================================
// SEARCH INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("flowerSearch");

    if (!searchInput) {
        return;
    }

    createSuggestionBox(searchInput);

    searchInput.addEventListener("input", function () {
        showFlowerSuggestions(searchInput.value);
    });

    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            searchFlower();

        }

    });

});


// ==========================================
// CREATE SUGGESTION BOX
// ==========================================

function createSuggestionBox(input) {

    const suggestionBox = document.createElement("div");

    suggestionBox.id = "flowerSuggestions";

    suggestionBox.className = "flower-suggestions";

    input.parentElement.style.position = "relative";

    input.parentElement.appendChild(suggestionBox);

}


// ==========================================
// SHOW SUGGESTIONS
// ==========================================

function showFlowerSuggestions(value) {

    const suggestionBox =
        document.getElementById("flowerSuggestions");

    if (!suggestionBox) {
        return;
    }

    const searchText =
        value.trim().toLowerCase();

    suggestionBox.innerHTML = "";

    if (searchText === "") {

        suggestionBox.style.display = "none";

        return;

    }


    const matches = flowerSearchData
        .filter(function (flower) {

            return flower
                .toLowerCase()
                .includes(searchText);

        })
        .slice(0, 6);


    if (matches.length === 0) {

        suggestionBox.innerHTML =
            `<div class="no-suggestion">
                🌸 No flower found
            </div>`;

        suggestionBox.style.display = "block";

        return;

    }


    matches.forEach(function (flower) {

        const item =
            document.createElement("div");

        item.className = "flower-suggestion-item";

        item.innerHTML = `
            <span class="suggestion-icon">🌸</span>
            <span>${flower}</span>
        `;


        item.addEventListener("click", function () {

            document.getElementById("flowerSearch").value =
                flower;

            suggestionBox.style.display =
                "none";

            searchFlower();

        });


        suggestionBox.appendChild(item);

    });


    suggestionBox.style.display = "block";

}


// ==========================================
// SEARCH FLOWER
// ==========================================

function searchFlower() {

    const input =
        document.getElementById("flowerSearch");

    if (!input) {
        return;
    }

    const searchText =
        input.value.trim().toLowerCase();


    const cards =
        document.querySelectorAll(".flower-card");


    if (searchText === "") {

        cards.forEach(function (card) {

            card.style.display = "";

        });

        return;

    }


    let found = false;


    cards.forEach(function (card) {

        const title =
            card.querySelector("h2");


        if (!title) {
            return;
        }


        const flowerName =
            title.textContent
                .trim()
                .toLowerCase();


        if (flowerName.includes(searchText)) {

            card.style.display = "";

            found = true;

        } else {

            card.style.display = "none";

        }

    });


    const suggestionBox =
        document.getElementById("flowerSuggestions");

    if (suggestionBox) {

        suggestionBox.style.display =
            "none";

    }


    if (found) {

        const firstResult =
            document.querySelector(
                '.flower-card[style=""]'
            );

        if (firstResult) {

            firstResult.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        }

    } else {

        alert(
            "🌸 Flower not found in the current collection."
        );

    }

}