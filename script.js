document.addEventListener("DOMContentLoaded", () => {
    initializeBoard();
    updatePlayerUI();

    document.getElementById("rollButton").addEventListener("click", rollDice);
    document.getElementById("buyButton").addEventListener("click", buyProperty);
});
