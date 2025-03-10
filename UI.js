import { path, properties } from "./board.js";
import { positionIndex, balance } from "./gameLogic.js";

export function updateUI(cells, positionDisplay, balanceDisplay, propertiesDisplay) {
    cells.forEach(cell => cell.innerHTML = cell.innerHTML.replace("🚀", ""));
    let newPosition = path[positionIndex];
    cells[newPosition].innerHTML += " 🚀";

    let currentProperty = properties[positionIndex];
    positionDisplay.textContent = `Position: ${currentProperty.name}`;
    balanceDisplay.textContent = `Balance: $${balance}`;
    propertiesDisplay.textContent = `Current Property: ${currentProperty.name} - Price: $${currentProperty.price}, Rent: $${currentProperty.rent}`;
}

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
