function rollDice() {
    const roll1 = Math.floor(Math.random() * 6) + 1; // First dice roll (1-6)
    const roll2 = Math.floor(Math.random() * 6) + 1; // Second dice roll (1-6)
    const rollTotal = roll1 + roll2; // Sum of both dice
    
    document.getElementById("diceResult").textContent = `You rolled a ${roll1} and a ${roll2} (Total: ${rollTotal})!`;
    return rollTotal;
}
