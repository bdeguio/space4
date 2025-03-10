import { boardSize, properties, path } from "./board.js";

document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".grid");
    const rollButton = document.getElementById("rollButton");
    const diceResult = document.getElementById("diceResult");
    const positionDisplay = document.getElementById("position");
    const balanceDisplay = document.getElementById("balance");
    const propertiesDisplay = document.getElementById("properties");

    // Create the board dynamically
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);

        // Add property names only to border squares
        let pathIndex = path.indexOf(i);
        if (pathIndex !== -1) {
            cell.innerHTML = `<small>${properties[pathIndex].name}</small>`;
            cell.classList.add("property-cell");
        }

        board.appendChild(cell);
    }

    const cells = document.querySelectorAll(".cell");

    updatePlayerUI(); // Initial UI update

    rollButton.addEventListener("click", () => {
        const roll1 = Math.floor(Math.random() * 6) + 1; // First dice roll (1-6)
        const roll2 = Math.floor(Math.random() * 6) + 1; // Second dice roll (1-6)
        const rollTotal = roll1 + roll2; // Sum of both dice
        diceResult.textContent = `You rolled a ${rollTotal}`;

        let previousIndex = positionIndex; // Save previous position before moving
        positionIndex = (positionIndex + rollTotal) % path.length; // Move forward

        // Check if player passed GO and collect $200
        if (positionIndex < previousIndex) {
            balance += 200;
            console.log("Passed GO! +$200 added.");
        }

        updatePlayerUI();
    });

    function updatePlayerUI() {
        // Remove previous player marker
        cells.forEach(cell => cell.innerHTML = cell.innerHTML.replace("🚀", ""));

        // Move player to new position
        let newPosition = path[positionIndex];
        cells[newPosition].innerHTML += " 🚀"; // Add player marker

        // Update UI elements
        let currentProperty = properties[positionIndex];
        positionDisplay.textContent = `Position: ${currentProperty.name}`;
        balanceDisplay.textContent = `Balance: $${balance}`;
        propertiesDisplay.textContent = `Current Property: ${currentProperty.name} - Price: $${currentProperty.price}, Rent: $${currentProperty.rent}`;
    }
});
