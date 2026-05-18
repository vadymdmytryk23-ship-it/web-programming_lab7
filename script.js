const mainContent = document.getElementById("mainContent");
const catalogLink = document.getElementById("catalogLink");

catalogLink.addEventListener("click", function (event) {
    event.preventDefault();
    loadCatalog();
});

function loadJSON(url) {
    return fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("HTTP error");
            }
            return response.json();
        });
}

function loadCatalog() {
    loadJSON("data/categories.json")
        .then(function (categories) {
            let html = "<h2>Catalog</h2>";
            html += "<div class='categories'>";

            categories.forEach(function (category) {
                html += `
                    <div class="category-card" onclick="loadCategory('${category.shortname}')">
                        <h3>${category.name}</h3>
                        <p>${category.notes}</p>
                    </div>
                `;
            });

            html += `
                <div class="category-card" onclick="loadSpecials()">
                    <h3>Specials</h3>
                    <p>Open random category</p>
                </div>
            `;

            html += "</div>";
            mainContent.innerHTML = html;
        })
        .catch(function (error) {
            mainContent.innerHTML = "<p>Error loading catalog.</p>";
            console.log(error);
        });
}

function loadCategory(shortname) {
    loadJSON("data/" + shortname + ".json")
        .then(function (categoryData) {
            let html = `<h2>${categoryData.categoryName}</h2>`;
            html += "<div class='products'>";

            categoryData.items.forEach(function (item) {
                html += `
                    <div class="product-card">
                        <img src="https://placehold.co/200x200?text=${item.shortname}" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p class="price">${item.price}</p>
                    </div>
                `;
            });

            html += "</div>";
            mainContent.innerHTML = html;
        })
        .catch(function (error) {
            mainContent.innerHTML = "<p>Error loading category.</p>";
            console.log(error);
        });
}

function loadSpecials() {
    loadJSON("data/categories.json")
        .then(function (categories) {
            const randomIndex = Math.floor(Math.random() * categories.length);
            const randomCategory = categories[randomIndex];
            loadCategory(randomCategory.shortname);
        });
}
