class UI {
    static displayRates(rates) {
        const ratesContainer = document.getElementById("rates-container");
        ratesContainer.innerHTML = ""; // Clear previous results

        if (!rates) {
            ratesContainer.innerHTML = "<p>Failed to load exchange rates.</p>";
            return;
        }

        Object.entries(rates).forEach(([currencyCode, rate]) => {
            const rateElement = document.createElement("p");
            rateElement.textContent = `1 USD = ${rate.toFixed(2)} ${currencyCode}`;

            const favButton = document.createElement("button");
            favButton.textContent = "⭐";
            favButton.onclick = () => UI.addToFavorites(currencyCode, rate);

            rateElement.appendChild(favButton);
            ratesContainer.appendChild(rateElement);
        });
    }

    static displaySingleRate(currency, rate) {
        const ratesContainer = document.getElementById("rates-container");
        ratesContainer.innerHTML = `<p>1 USD = ${rate.toFixed(2)} ${currency}</p>`;
    }

    static addToFavorites(currency, rate) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || {};
        favorites[currency] = rate;
        localStorage.setItem("favorites", JSON.stringify(favorites));
        UI.displayFavorites();
    }

    static displayFavorites() {
        const favoritesList = document.getElementById("favorites-list");
        favoritesList.innerHTML = "";

        const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
        Object.entries(favorites).forEach(([currency, rate]) => {
            const li = document.createElement("li");
            li.textContent = `${currency}: ${rate.toFixed(2)}`;

            const removeButton = document.createElement("button");
            removeButton.textContent = "❌";
            removeButton.onclick = () => UI.removeFavorite(currency);

            li.appendChild(removeButton);
            favoritesList.appendChild(li);
        });
    }

    static removeFavorite(currency) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || {};
        delete favorites[currency];
        localStorage.setItem("favorites", JSON.stringify(favorites));
        UI.displayFavorites();
    }
}

export default UI;
