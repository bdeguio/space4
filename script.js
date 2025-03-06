document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".grid");
    const player = document.getElementById("player");
    const rollButton = document.getElementById("rollButton");
    const diceResult = document.getElementById("diceResult");
    const positionDisplay = document.getElementById("position");
    const balanceDisplay = document.getElementById("balance");

    const boardSize = 10; // 10x10 grid (100 squares)
    let positionIndex = 0; // Track player's position in the path
    let balance = 1500; // Player's starting money

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

    // Assign prices to positions (exclude 0, 9, 99, 90)
    const propertyPrices = {};
    path.forEach(position => {
        if (![0, 9, 99, 90].includes(position)) {
            propertyPrices[position] = 100;
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
    });

    function updatePlayerPosition() {
        cells.forEach(cell => cell.innerHTML = ""); // Clear previous position
        cells[path[positionIndex]].appendChild(player); // Move player only in path squares
        positionDisplay.textContent = `Position: ${path[positionIndex]}`;
        balanceDisplay.textContent = `Balance: $${balance}`;
    }
});
