import CurrencyAPI from './api.js';
import UI from './ui.js';

document.addEventListener("DOMContentLoaded", () => {
    const fetchButton = document.getElementById('fetch-rates');
    const searchButton = document.getElementById('search-rate');

    fetchButton.addEventListener('click', async () => {
        const rates = await CurrencyAPI.fetchRates();
        UI.displayRates(rates);
    });

    searchButton.addEventListener('click', async () => {
        const currencyInput = document.getElementById('currency-input').value.toUpperCase();
        if (!currencyInput) {
            alert("Please enter a currency code.");
            return;
        }

        const rates = await CurrencyAPI.fetchRates();
        if (rates && rates[currencyInput]) {
            UI.displaySingleRate(currencyInput, rates[currencyInput]);
        } else {
            alert("Currency not found.");
        }
    });

    UI.displayFavorites(); // Show favorites on load
});
