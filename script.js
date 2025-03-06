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
    let ownedProperties = []; // List of player's owned properties/

    // Define the path to move only through the border squares
    const path = [
        // Top row (left to right)
        0,1,2,3,4,5,6,7,8,9,
        // Right column (top to bottom)
        19,29,39,49,59,69,79,89,99,
        // Bottom row (right to left)
        98,97,96,95,94,93,92,91,90,
        // Left column (bottom to top)
        80,70,60,50,40,30,20,10
    ];

    // Define property prices for each position
    const properties = {};
    path.forEach((position, index) => {
        if (position !== 0) { // Exclude GO
            properties[position] = {
                price: 100,
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
    updatePlayerPosition();

    rollButton.addEventListener("click", () => {
        const roll = Math.floor(Math.random() * 6) + 1; // Dice roll (1-6)
        diceResult.textContent = `You rolled a ${roll}!`;

        let previousIndex = positionIndex; // Save previous position before moving
        positionIndex = (positionIndex + roll) % path.length; // Move forward

        // Check if player **completed a full loop** (crossed index 0)
        if (positionIndex < previousIndex) {
            balance += 200;
            console.log("Completed a full loop! +$200 added.");
        }

        updatePlayerPosition();
        offerPropertyPurchase();
    });

    function updatePlayerPosition() {
        cells.forEach(cell => cell.innerHTML = ""); // Clear previous position
        cells[path[positionIndex]].appendChild(player); // Move player only in path squares
        positionDisplay.textContent = `Position: ${path[positionIndex]}`;
        balanceDisplay.textContent = `Balance: $${balance}`;
        propertiesDisplay.textContent = `Owned Properties: ${ownedProperties.length > 0 ? ownedProperties.join(", ") : "None"}`;
    }
});

function checkProperty() {
        let currentPosition = path[positionIndex];

        if (properties[currentPosition] && properties[currentPosition].owner === null) {
            let price = properties[currentPosition].price;
            if (balance >= price) {
                let buy = confirm(`You landed on position ${currentPosition}. Would you like to buy it for $${price}?`);
                if (buy) {
                    balance -= price;
                    properties[currentPosition].owner = "Player";
                    ownedProperties.push(currentPosition);
                    console.log(`Property ${currentPosition} purchased for $${price}.`);
                    updatePlayerPosition();
                }
            }
        }
    }
});
