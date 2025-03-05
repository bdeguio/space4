document.addEventListener("DOMContentLoaded", () => {
    const player = document.getElementById("player");
    const rollButton = document.getElementById("rollButton");
    const diceResult = document.getElementById("diceResult");

    let position = 0; // Player's position (0 = start)

    rollButton.addEventListener("click", () => {
        const roll = Math.floor(Math.random() * 6) + 1; // Roll a dice (1-6)
        diceResult.textContent = `You rolled a ${roll}!`;
        
        position += roll;
        updatePlayerPosition();
    });

    function updatePlayerPosition() {
        // Simple movement: log position (expand later for a grid-based board)
        console.log(`Player moved to position ${position}`);
    }
});
