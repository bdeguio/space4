document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".grid");
    const player = document.getElementById("player");
    const rollButton = document.getElementById("rollButton");
    const diceResult = document.getElementById("diceResult");
    const positionDisplay = document.getElementById("position");
    const balanceDisplay = document.getElementById("balance");
    const buyButton = document.getElementById("buyButton");
    const propertiesDisplay = document.getElementById("properties");

    const boardSize = 10; // 10x10 grid (100 squares)
    let positionIndex = 0; // Track player's position in the path
    let balance = 1500; // Player's starting money
    let ownedProperties = []; // List of player's owned properties

    // Define the path to move only through the border squares
    const path = [
        0,1,2,3,4,5,6,7,8,9,
        19,29,39,49,59,69,79,89,99,
        98,97,96,95,94,93,92,91,90,
        80,70,60,50,40,30,20,10
    ];

    // Define property prices based on Monopoly board values
    const propertyPrices = {
        0: 0, 9: 0, 99: 0, 90: 0, // Non-purchasable spaces
        1: 60, 3: 60, 6: 100, 8: 100, 
        19: 140, 29: 160, 39: 200, 
        49: 220, 59: 240, 69: 260, 79: 280, 89: 300, 
        98: 320, 97: 350, 96: 400, 95: 450, 94: 500,
        93: 550, 92: 600, 91: 650, 80: 700,
        70: 750, 60: 800, 50: 850, 40: 900,
        30: 950, 20: 1000, 10: 0
    };

    // Generate 100 grid cells
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        board.appendChild(cell);
    }

    const cells = document.querySelectorAll(".cell");
    updatePlayerUI();

    rollButton.addEventListener("click", () => {
        const roll = Math.floor(Math.random() * 6) + 1; // Dice roll (1-6)
        diceResult.textContent = `You rolled a ${roll}!`;

        let previousIndex = positionIndex;
        positionIndex = (positionIndex + roll) % path.length; // Move forward

        // Check if player completed a loop (crossed GO)
        if (positionIndex < previousIndex) {
            balance += 200;
            console.log("Completed a full loop! +$200 added.");
        }

        updatePlayerUI();
    });

    buyButton.addEventListener("click", () => {
        let currentPosition = path[positionIndex];
        if (propertyPrices[currentPosition] > 0 && !ownedProperties.includes(currentPosition) && balance >= propertyPrices[currentPosition]) {
            balance -= propertyPrices[currentPosition];
            ownedProperties.push(currentPosition);
            console.log(`Property ${currentPosition} purchased for $${propertyPrices[currentPosition]}.`);
            updatePlayerUI();
        }
    });

    function updatePlayerUI() {
        cells.forEach(cell => cell.innerHTML = ""); // Clear previous position
        cells[path[positionIndex]].appendChild(player);
        positionDisplay.textContent = `Position: ${path[positionIndex]}`;
        balanceDisplay.textContent = `Balance: $${balance}`;
        propertiesDisplay.textContent = `Owned Properties: ${ownedProperties.length > 0 ? ownedProperties.join(", ") : "None"}`;

        // Update Buy Button visibility
        let currentPosition = path[positionIndex];
        buyButton.style.display = (propertyPrices[currentPosition] > 0 && !ownedProperties.includes(currentPosition)) ? "block" : "none";
    }
});
