document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".grid");
    const player = document.getElementById("player");
    const rollButton = document.getElementById("rollButton");
    const diceResult = document.getElementById("diceResult");
    const positionDisplay = document.getElementById("position");
    const balanceDisplay = document.getElementById("balance");
    const buyButton = document.getElementById("buyButton");

    const boardSize = 10; // 10x10 grid (only border positions are used)
    let positionIndex = 0; // Track player's position in the path
    let balance = 1500; // Player's starting money

    // Define the path to move only through the border squares
    const path = [
        0,1,2,3,4,5,6,7,8,9,  // Top row
        19,29,39,49,59,69,79,89,99,  // Right column (down)
        98,97,96,95,94,93,92,91,90,  // Bottom row (right to left)
        80,70,60,50,40,30,20,10  // Left column (up)
    ];

    // Assign property prices based on Monopoly board values
    const propertyPrices = {
        0: 0,  // GO
        1: 60, 3: 60, 5: 200, 6: 100, 8: 100, 9: 120,  // First row
        19: 140, 29: 160, 39: 200, 49: 220, 59: 240, 69: 260, 79: 280, 89: 300, 99: 0,  // Right column
        98: 320, 97: 0, 96: 300, 95: 0, 94: 280, 93: 260, 92: 240, 91: 220, 90: 0,  // Bottom row
        80: 200, 70: 180, 60: 160, 50: 140, 40: 0, 30: 120, 20: 0, 10: 0  // Left column
    };

    const ownedProperties = [];

    // Generate only the border grid cells
    for (let i = 0; i < boardSize * boardSize; i++) {
        if (path.includes(i)) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-index", i);
            cell.textContent = i;
            board.appendChild(cell);
        }
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
        buyButton.disabled = (propertyPrices[path[positionIndex]] === 0 || ownedProperties.includes(path[positionIndex]));
    }
});
