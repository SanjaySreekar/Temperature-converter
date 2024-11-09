let historyEnabled = true;

function convertTemperature() {
    const temperature = parseFloat(document.getElementById("temperature").value);
    const unitFrom = document.getElementById("unitFrom").value;
    const unitTo = document.getElementById("unitTo").value;
    let result;

    if (unitFrom === unitTo) {
        result = temperature;
    } else if (unitFrom === "Celsius") {
        result = unitTo === "Fahrenheit" ? (temperature * 9/5) + 32 :
                 unitTo === "Kelvin" ? temperature + 273.15 :
                 unitTo === "Rankine" ? (temperature + 273.15) * 9/5 :
                 (temperature * 4/5);
    } else if (unitFrom === "Fahrenheit") {
        result = unitTo === "Celsius" ? (temperature - 32) * 5/9 :
                 unitTo === "Kelvin" ? (temperature - 32) * 5/9 + 273.15 :
                 unitTo === "Rankine" ? temperature + 459.67 :
                 (temperature - 32) * 4/9;
    } else if (unitFrom === "Kelvin") {
        result = unitTo === "Celsius" ? temperature - 273.15 :
                 unitTo === "Fahrenheit" ? (temperature - 273.15) * 9/5 + 32 :
                 unitTo === "Rankine" ? temperature * 9/5 :
                 (temperature - 273.15) * 4/5 + 32;
    } else if (unitFrom === "Rankine") {
        result = unitTo === "Celsius" ? (temperature - 491.67) * 5/9 :
                 unitTo === "Fahrenheit" ? temperature - 459.67 :
                 unitTo === "Kelvin" ? temperature * 5/9 :
                 (temperature - 491.67) * 4/9;
    } else if (unitFrom === "Réaumur") {
        result = unitTo === "Celsius" ? temperature * 5/4 :
                 unitTo === "Fahrenheit" ? (temperature * 9/4) + 32 :
                 unitTo === "Kelvin" ? (temperature * 5/4) + 273.15 :
                 (temperature * 9/4) + 491.67;
    }

    const decimalPlaces = document.getElementById("decimal-places").checked ? 2 : 0;
    document.getElementById("result").innerText = `Converted Temperature: ${result.toFixed(decimalPlaces)} °${unitTo.charAt(0)}`;

    if (historyEnabled) {
        addToHistory(temperature, unitFrom, result, unitTo);
    }
}

function addToHistory(temperature, unitFrom, result, unitTo) {
    const historyList = document.getElementById("history-list");
    const listItem = document.createElement("li");
    listItem.innerText = `${temperature} °${unitFrom.charAt(0)} to ${result.toFixed(2)} °${unitTo.charAt(0)}`;
    historyList.appendChild(listItem);
}

document.getElementById("settings-btn").addEventListener("click", () => {
    const settingsPanel = document.querySelector(".settings-panel");
    settingsPanel.style.display = settingsPanel.style.display === "none" ? "block" : "none";
});

document.getElementById("clear-history").addEventListener("click", () => {
    document.getElementById("history-list    ").innerHTML = '';
});

document.getElementById("history-enabled").addEventListener("change", (event) => {
    historyEnabled = event.target.checked;
});

// Initial setup to hide the settings panel
document.querySelector(".settings-panel").style.display = "none";