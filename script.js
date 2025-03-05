document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".grid");
    const player = document.getElementById("player");
    const rollButton = document.getElementById("rollButton");
    const diceResult = document.getElementById("diceResult");
    const positionDisplay = document.getElementById("position");

    const boardSize = 10; // 10x10 grid (100 squares)
    let position = 0; // Player's position (starting at 0)

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

        position += roll;

        // Loop back to the beginning if player reaches the end
        if (position >= cells.length) {
            position = position % cells.length;
            console.log("Passed GO! Collect $200!");
        }

        updatePlayerPosition();
    });

    function updatePlayerPosition() {
        cells.forEach(cell => cell.innerHTML = ""); // Clear previous position
        cells[position].appendChild(player); // Move player to new position
        positionDisplay.textContent = `Position: ${position}`;
    }
});
