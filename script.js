document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".grid");
    const player = document.getElementById("player");
    const rollButton = document.getElementById("rollButton");
    const diceResult = document.getElementById("diceResult");
    const positionDisplay = document.getElementById("position");
    const balanceDisplay = document.getElementById("balance");
    const propertiesDisplay = document.getElementById("properties");

    const boardSize = 10; // 10x10 grid (100 squares)
    let positionIndex = 0; // Track player's position in the path
    let balance = 1500; // Player's starting money
    let ownedProperties = []; // List of player's owned properties

    // Define the path to move only through the border squares
    const path = [
        0,1,2,3,4,5,6,7,8,9,  // Top row
        19,29,39,49,59,69,79,89,99,  // Right column (down)
        98,97,96,95,94,93,92,91,90,  // Bottom row (right to left)
        80,70,60,50,40,30,20,10  // Left column (up)
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
        const roll = Math.floor(Math.random() * 6) + 1; // Dice roll (1-6)
        diceResult.textContent = `You rolled a ${roll}!`;

        let previousIndex = positionIndex; // Save previous position before moving
        positionIndex = (positionIndex + roll) % path.length; // Move forward

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
        positionDisplay.textContent = `Position: ${path[positionIndex]}`;
        balanceDisplay.textContent = `Balance: $${balance}`;
        propertiesDisplay.textContent = `Owned Properties: ${ownedProperties.length > 0 ? ownedProperties.join(", ") : "None"}`;
    }

    function checkPropertyPurchase() {
        let currentPosition = path[positionIndex];

        // Ensure the property exists and is unowned
        if (properties[currentPosition] && properties[currentPosition].owner === null) {
            let price = properties[currentPosition].price;

            // Offer to purchase the property
            if (balance >= price) {
                setTimeout(() => { // Prevent blocking UI updates
                    let buy = confirm(`You landed on position ${currentPosition}. Would you like to buy it for $${price}?`);
                    if (buy) {
                        balance -= price;
                        properties[currentPosition].owner = "Player";
                        ownedProperties.push(currentPosition);
                        console.log(`Property ${currentPosition} purchased for $${price}.`);
                        updatePlayerUI();
                    }
                }, 100);
            }
        }
    }
});
