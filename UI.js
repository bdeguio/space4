const diceResult = document.getElementById("diceResult");
const positionDisplay = document.getElementById("position");
const balanceDisplay = document.getElementById("balance");
const propertiesDisplay = document.getElementById("properties");
const ownedPropertiesList = document.getElementById("ownedProperties");

function updatePlayerUI() {
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = cell.innerHTML.replace(" 🚀", ""));

    let newPosition = path[positionIndex];
    document.querySelector(`[data-index="${newPosition}"]`).innerHTML += " 🚀";

    let currentProperty = properties[positionIndex];

    positionDisplay.textContent = `Position: ${currentProperty.name}`;
    balanceDisplay.textContent = `Balance: $${balance}`;
    propertiesDisplay.textContent = `Current Property: ${currentProperty.name} - Price: $${currentProperty.price}, Rent: $${currentProperty.rent[currentProperty.houses]}`;

    updateOwnedPropertiesUI();
}

function updateOwnedPropertiesUI() {
    ownedPropertiesList.innerHTML = "<h3>Owned Properties:</h3>";

    ownedProperties.forEach(property => {
        const propDiv = document.createElement("div");
        propDiv.innerHTML = `${property.name} (Houses: ${property.houses}) - Rent: $${property.rent[property.houses]}`;

        const plusButton = document.createElement("button");
        plusButton.textContent = "+";
        plusButton.onclick = () => upgradeProperty(property);

        const minusButton = document.createElement("button");
        minusButton.textContent = "-";
        minusButton.onclick = () => downgradeProperty(property);

        propDiv.appendChild(plusButton);
        propDiv.appendChild(minusButton);
        ownedPropertiesList.appendChild(propDiv);
    });
}
