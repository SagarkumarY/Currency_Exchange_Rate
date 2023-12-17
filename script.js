
const countries = [
    { country: "United States", shortName: "US", currency: "USD" },
    { country: "Eurozone", shortName: "EU", currency: "EUR" },
    { country: "United Kingdom", shortName: "UK", currency: "GBP" },
    { country: "Japan", shortName: "JP", currency: "JPY" },
    { country: "Australia", shortName: "AU", currency: "AUD" },
    { country: "Canada", shortName: "CA", currency: "CAD" },
    { country: "Switzerland", shortName: "CH", currency: "CHF" },
    { country: "China", shortName: "CN", currency: "CNY" },
    { country: "India", shortName: "IN", currency: "INR" },
    { country: "Brazil", shortName: "BR", currency: "BRL" },
    { country: "South Africa", shortName: "ZA", currency: "ZAR" },
    { country: "New Zealand", shortName: "NZ", currency: "NZD" },
    { country: "Singapore", shortName: "SG", currency: "SGD" },
    { country: "South Korea", shortName: "KR", currency: "KRW" },
    { country: "Hong Kong", shortName: "HK", currency: "HKD" },
    { country: "Malaysia", shortName: "MY", currency: "MYR" },
    { country: "Thailand", shortName: "TH", currency: "THB" },
    { country: "Indonesia", shortName: "ID", currency: "IDR" },
    { country: "Mexico", shortName: "MX", currency: "MXN" },
    { country: "Russia", shortName: "RU", currency: "RUB" },
    { country: "Turkey", shortName: "TR", currency: "TRY" },
    { country: "Egypt", shortName: "EG", currency: "EGP" },
];

const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

function getFlagImageUrl(countryCode) {
    return `https://flagsapi.com/${countryCode}/flat/64.png`;
}

function handleCountryChange(selectElement, flagImageElement) {
    const selectedCountryFlagName = selectElement.options[selectElement.selectedIndex].text;
    const flagImageUrl = getFlagImageUrl(selectedCountryFlagName);
    flagImageElement.src = flagImageUrl;
}

const btn_submit = document.getElementById("btn_submit");
const fromCurr = document.getElementById('sourceCurrency');
const toCurr = document.getElementById("targetCurrency");
const resultElement = document.getElementById("result");
const inputAmount = document.getElementById("amount");

btn_submit.addEventListener('click', async (eve) => {
    eve.preventDefault();

    // Validate the amount
    const amountValue = parseFloat(inputAmount.value);
    if (isNaN(amountValue) || amountValue <= 0) {
        alert("Please provide a valid positive number for the amount");
        return;
    }

    // Validate the currency selections
    const fromCurrValue = fromCurr.value.toLowerCase();
    const toCurrValue = toCurr.value.toLowerCase();
    if (!fromCurrValue || !toCurrValue) {
        alert("Please select both source and target currencies");
        return;
    }

    // Construct the URL
    const URL = `${BASE_URL}/${fromCurrValue}/${toCurrValue}.json`;

    try {
        const res = await fetch(URL);
        if (!res.ok) {
            throw new Error("Failed to fetch exchange rates");
        }

        const data = await res.json();
        const rates = data[toCurr.value.toLowerCase()];
        const finalResult = amountValue * rates;

        resultElement.innerText = `${amountValue} ${fromCurrValue.toUpperCase()} = ${finalResult} ${toCurrValue.toUpperCase()}`;

        // Reset the input field after processing
        inputAmount.value = '';
    } catch (error) {
        console.error("Error fetching exchange rates:", error.message);
        alert("An error occurred while fetching exchange rates. Please try again.");
    }
});

function populateCurrencyDropdown(selectElement, defaultCurrency) {
    countries.forEach(country => {
        const option = document.createElement("option");
        option.value = country.currency;
        option.text = country.shortName;
        if (defaultCurrency && country.currency === defaultCurrency) {
            option.selected = true;
        }
        selectElement.appendChild(option);
    });
}

const sourceCurrencySelect = document.getElementById("sourceCurrency");
const targetCurrencySelect = document.getElementById("targetCurrency");
const sourceFlagImage = document.querySelector(".usFlag");
const targetFlagImage = document.querySelector(".inFlag");

sourceCurrencySelect.addEventListener("change", (event) => {
    handleCountryChange(sourceCurrencySelect, sourceFlagImage);
    console.log(event.target.value);
});

targetCurrencySelect.addEventListener("change", () => {
    handleCountryChange(targetCurrencySelect, targetFlagImage);
});

populateCurrencyDropdown(sourceCurrencySelect, "USD");
populateCurrencyDropdown(targetCurrencySelect, "INR");
