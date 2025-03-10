let positionIndex = 0;
let balance = 1500;
const boardSize = 11;
const path = [...Array(40).keys()]; // Ensuring 40 positions

function rollDice() {
    return Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
}

function updateUI() {
    document.getElementById("position").textContent = `Position: ${properties[positionIndex].name}`;
    document.getElementById("balance").textContent = `Balance: $${balance}`;
    document.getElementById("properties").textContent = `Current Property: ${properties[positionIndex].name} - Price: $${properties[positionIndex].price}, Rent: $${properties[positionIndex].rent}`;
}
