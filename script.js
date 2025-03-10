document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".grid");
    const player = document.getElementById("player");
    const rollButton = document.getElementById("rollButton");
    const diceResult = document.getElementById("diceResult");
    const positionDisplay = document.getElementById("position");
    const balanceDisplay = document.getElementById("balance");
    const propertiesDisplay = document.getElementById("properties");
    let buyButton = document.getElementById("buyButton");

    const boardSize = 11; // Updated to 11x11 grid (121 squares)
    let positionIndex = 0; // Track player's position in the path
    let balance = 1500; // Player's starting money
    let ownedProperties = []; // List of player's owned properties

    // Define the path to move only through the border squares (updated for 11x11)
    const path = [
        0,1,2,3,4,5,6,7,8,9,10,  // Top row
        21,32,43,54,65,76,87,98,109,120,  // Right column (down)
        119,118,117,116,115,114,113,112,111,110,  // Bottom row (right to left)
        99,88,77,66,55,44,33,22,11  // Left column (up)
    ];

    // Define property ownership and pricing
    const properties = {};
    path.forEach(position => {
        if (position !== 0) { // Exclude GO
            properties[position] = {
                price: 100, // Fixed price of $100
                owner: null
            };
        }
    });

    // Generate 121 grid cells (11x11 board)
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
        diceResult.textContent = `You rolled a ${rollTotal}`;

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
        let newPosition = path[positionIndex];
        cells[newPosition].appendChild(player);

        // Update UI elements
        positionDisplay.textContent = `Position: ${newPosition}`;
        balanceDisplay.textContent = `Balance: $${balance}`;
        propertiesDisplay.textContent = `Owned Properties: ${ownedProperties.length > 0 ? ownedProperties.map(p => `Position ${p}`).join(", ") : "None"}`;
    }

    function checkPropertyPurchase() {
        let currentPosition = path[positionIndex];

        if (properties[currentPosition] && properties[currentPosition].owner === null) {
            let price = properties[currentPosition].price;

            if (balance >= price) {
                buyButton.style.display = "block";

                // Prevent multiple event listeners
                buyButton.replaceWith(buyButton.cloneNode(true));  
                buyButton = document.getElementById("buyButton"); 

                buyButton.addEventListener("click", () => purchaseProperty(currentPosition, price));
            } else {
                buyButton.style.display = "none";
            }
        } else {
            buyButton.style.display = "none";
        }
    }

    function purchaseProperty(position, price) {
        balance -= price;
        properties[position].owner = "Player";
        ownedProperties.push(position);
        console.log(`Property at position ${position} purchased for $${price}.`);
        updatePlayerUI();
        buyButton.style.display = "none";
    }
});
