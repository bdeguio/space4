import { path, properties } from "./board.js";
import { positionIndex, balance, ownedProperties, canBuyProperty, buyProperty } from "./gameLogic.js";

export function updateUI(cells, positionDisplay, balanceDisplay, propertiesDisplay, buyButton) {
    cells.forEach(cell => cell.innerHTML = cell.innerHTML.replace("🚀", ""));
    let newPosition = path[positionIndex];
    cells[newPosition].innerHTML += " 🚀";

    let currentProperty = properties[positionIndex];
    positionDisplay.textContent = `Position: ${currentProperty.name}`;
    balanceDisplay.textContent = `Balance: $${balance}`;
    propertiesDisplay.textContent = `Owned Properties: ${ownedProperties.length > 0 ? ownedProperties.join(", ") : "None"}`;

    // Show or hide the buy button
    if (canBuyProperty()) {
        buyButton.style.display = "block";
        buyButton.onclick = () => {
            if (buyProperty()) {
                updateUI(cells, positionDisplay, balanceDisplay, propertiesDisplay, buyButton);
                buyButton.style.display = "none";
            }
        };
    } else {
        buyButton.style.display = "none";
    }
}
