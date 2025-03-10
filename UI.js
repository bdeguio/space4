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
