document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".grid");
    const player = document.getElementById("player");
    const rollButton = document.getElementById("rollButton");
    const diceResult = document.getElementById("diceResult");
    const positionDisplay = document.getElementById("position");
    const balanceDisplay = document.getElementById("balance");
    const propertiesDisplay = document.getElementById("properties");
    const buyButton = document.getElementById("buyButton");

    const boardSize = 10; // 10x10 grid (100 squares)
    let positionIndex = 0; // Track player's position in the path
    let balance = 1500; // Player's starting money
    let ownedProperties = []; // List of player's owned properties

    // Load property data from properties.js
    loadProperties();

    // Define the path to move only through the border squares
    const path = Object.keys(properties).map(Number);

    // Generate 100 grid cells
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        board.appendChild(cell);
    }

    const cells = document.querySelectorAll(".cell");
    updatePlayerUI(); // Initial UI update

    rollButton.addEventListener("click", () => {
        const roll1 = Math.floor(Math.random() * 6) + 1; // First dice roll (1-6)
        const roll2 = Math.floor(Math.random() * 6) + 1; // Second dice roll (1-6)
        const rollTotal = roll1 + roll2; // Sum of both dice
        diceResult.textContent = `You rolled a ${roll1} and a ${roll2} (Total: ${rollTotal})!`;

        let previousIndex = positionIndex; // Save previous position before moving
        positionIndex = (positionIndex + rollTotal) % path.length; // Move forward

        // Check if player completed a loop (crossed GO)
        if (positionIndex < previousIndex) {
            balance += 200;
            console.log("Completed a full loop! +$200 added.");
        }

        updatePlayerUI();
        checkPropertyPurchase(); // Check if property can be bought
    });

    function updatePlayerUI() {
        // Clear previous player position
        cells.forEach(cell => cell.innerHTML = "");

        // Move player to the new position
        cells[path[positionIndex]].appendChild(player);

        // Update UI elements
        let property = properties[path[positionIndex]];
        positionDisplay.textContent = `Position: ${property.name} - $${property.price}`;
        balanceDisplay.textContent = `Balance: $${balance}`;
        propertiesDisplay.textContent = `Owned Properties: ${ownedProperties.length > 0 ? ownedProperties.join(", ") : "None"}`;
    }

    function checkPropertyPurchase() {
        let currentPosition = path[positionIndex];
        let property = properties[currentPosition];

        // Ensure the property exists and is unowned
        if (property && property.owner === null && property.price > 0) {
            // Display buy button if player has enough balance
            buyButton.style.display = balance >= property.price ? "block" : "none";
            buyButton.onclick = () => purchaseProperty(currentPosition, property);
        } else {
            buyButton.style.display = "none";
        }
    }

    function purchaseProperty(position, property) {
        balance -= property.price;
        property.owner = "Player";
        ownedProperties.push(property.name);
        console.log(`Property ${property.name} purchased for $${property.price}.`);
        updatePlayerUI();
        buyButton.style.display = "none";
    }
});
