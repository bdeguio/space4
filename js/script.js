document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".grid");
    const rollButton = document.getElementById("rollButton");
    const diceResult = document.getElementById("diceResult");

    // Create board
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);

        if (path.includes(i)) {
            let pathIndex = path.indexOf(i);
            cell.innerHTML = `<small>${properties[pathIndex].name}</small>`;
            cell.classList.add("property-cell");
        }
        board.appendChild(cell);
    }

    rollButton.addEventListener("click", () => {
        let rollTotal = rollDice();
        diceResult.textContent = `You rolled a ${rollTotal}`;

        positionIndex = (positionIndex + rollTotal) % properties.length;

        if (positionIndex < rollTotal) balance += 200;
        updateUI();
    });

    updateUI();
});
