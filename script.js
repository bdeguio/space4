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

    // Define the path to move only through the border squares
    const path = [
        0,1,2,3,4,5,6,7,8,9,
        19,29,39,49,59,69,79,89,99,
        98,97,96,95,94,93,92,91,90,
        80,70,60,50,40,30,20,10
    ];

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

        // Check if player completed a full loop (crossed GO)
        if (positionIndex < previousIndex) {
            balance += 200;
            console.log("Completed a full loop! +$200 added.");
        }

        updatePlayerUI();
        handlePropertyPurchase(path[positionIndex]); // Call external property script
    });

    function updatePlayerUI() {
        cells.forEach(cell => cell.innerHTML = ""); // Clear previous position
        cells[path[positionIndex]].appendChild(player);
        positionDisplay.textContent = `Position: ${path[positionIndex]}`;
        balanceDisplay.textContent = `Balance: $${balance}`;
        updatePropertyUI(); // Call external function to refresh property UI
    }
});
