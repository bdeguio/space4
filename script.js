document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".grid");
    const player = document.getElementById("player");
    const rollButton = document.getElementById("rollButton");
    const diceResult = document.getElementById("diceResult");
    const positionDisplay = document.getElementById("position");

    const boardSize = 10; // 10x10 grid (100 squares)
    let positionIndex = 0; // Player's position in the border path

    // Define the path only on the outer border (clockwise)
    const path = [];

    // Top row (left to right)
    for (let i = 0; i < boardSize; i++) path.push(i);
    // Right column (top to bottom)
    for (let i = boardSize; i < boardSize * boardSize; i += boardSize) path.push(i);
    // Bottom row (right to left)
    for (let i = boardSize * boardSize - 1; i >= boardSize * (boardSize - 1); i--) path.push(i);
    // Left column (bottom to top)
    for (let i = boardSize * (boardSize - 1); i >= 0; i -= boardSize) path.push(i);

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

        positionIndex = (positionIndex + roll) % path.length; // Loop back after reaching last square

        updatePlayerPosition();
    });

    function updatePlayerPosition() {
        cells.forEach(cell => cell.innerHTML = ""); // Clear previous position
        cells[path[positionIndex]].appendChild(player); // Move player only in path squares
        positionDisplay.textContent = `Position: ${path[positionIndex]}`;
    }
});
