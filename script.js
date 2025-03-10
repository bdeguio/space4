import { boardSize, createBoard } from "./board.js";
import { rollDice, movePlayer } from "./gameLogic.js";
import { updateUI } from "./ui.js";

document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".grid");
    const rollButton = document.getElementById("rollButton");
    const diceResult = document.getElementById("diceResult");
    const positionDisplay = document.getElementById("position");
    const balanceDisplay = document.getElementById("balance");
    const propertiesDisplay = document.getElementById("properties");
    const buyButton = document.getElementById("buyButton");

    createBoard(board);
    const cells = document.querySelectorAll(".cell");
    updateUI(cells, positionDisplay, balanceDisplay, propertiesDisplay);

    rollButton.addEventListener("click", () => {
        const rollTotal = rollDice();
        diceResult.textContent = `You rolled a ${rollTotal}`;
        movePlayer(rollTotal);
        updateUI(cells, positionDisplay, balanceDisplay, propertiesDisplay);
    });
});
