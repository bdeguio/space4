document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".grid");
    const player = document.getElementById("player");
    const rollButton = document.getElementById("rollButton");
    const diceResult = document.getElementById("diceResult");
    const positionDisplay = document.getElementById("position");
    const balanceDisplay = document.getElementById("balance");
    const propertiesDisplay = document.getElementById("properties");
    const buyButton = document.getElementById("buyButton");
    const properties = {
    0: { name: "GO", price: 0, rent: [0], mortgage: 0, owner: null },
    1: { name: "Mediterranean Avenue", price: 60, rent: [2, 10, 30, 90, 160, 250], mortgage: 30, owner: null },
    2: { name: "Community Chest", price: 0, rent: [0], mortgage: 0, owner: null },
    3: { name: "Baltic Avenue", price: 60, rent: [4, 20, 60, 180, 320, 450], mortgage: 30, owner: null },
    4: { name: "Income Tax", price: 0, rent: [0], mortgage: 0, owner: null },
    5: { name: "Reading Railroad", price: 200, rent: [25, 50, 100, 200], mortgage: 100, owner: null },
    6: { name: "Oriental Avenue", price: 100, rent: [6, 30, 90, 270, 400, 550], mortgage: 50, owner: null },
    7: { name: "Chance", price: 0, rent: [0], mortgage: 0, owner: null },
    8: { name: "Vermont Avenue", price: 100, rent: [6, 30, 90, 270, 400, 550], mortgage: 50, owner: null },
    9: { name: "Connecticut Avenue", price: 120, rent: [8, 40, 100, 300, 450, 600], mortgage: 60, owner: null },
    19: { name: "St. Charles Place", price: 140, rent: [10, 50, 150, 450, 625, 750], mortgage: 70, owner: null },
    29: { name: "Electric Company", price: 150, rent: [4, 10], mortgage: 75, owner: null },
    39: { name: "States Avenue", price: 140, rent: [10, 50, 150, 450, 625, 750], mortgage: 70, owner: null },
    49: { name: "Virginia Avenue", price: 160, rent: [12, 60, 180, 500, 700, 900], mortgage: 80, owner: null },
    59: { name: "Pennsylvania Railroad", price: 200, rent: [25, 50, 100, 200], mortgage: 100, owner: null },
    69: { name: "St. James Place", price: 180, rent: [14, 70, 200, 550, 750, 950], mortgage: 90, owner: null },
    79: { name: "Community Chest", price: 0, rent: [0], mortgage: 0, owner: null },
    89: { name: "Tennessee Avenue", price: 180, rent: [14, 70, 200, 550, 750, 950], mortgage: 90, owner: null },
    99: { name: "New York Avenue", price: 200, rent: [16, 80, 220, 600, 800, 1000], mortgage: 100, owner: null },
    98: { name: "Free Parking", price: 0, rent: [0], mortgage: 0, owner: null },
    97: { name: "Kentucky Avenue", price: 220, rent: [18, 90, 250, 700, 875, 1050], mortgage: 110, owner: null },
    96: { name: "Chance", price: 0, rent: [0], mortgage: 0, owner: null },
    95: { name: "Indiana Avenue", price: 220, rent: [18, 90, 250, 700, 875, 1050], mortgage: 110, owner: null },
    94: { name: "Illinois Avenue", price: 240, rent: [20, 100, 300, 750, 925, 1100], mortgage: 120, owner: null },
    93: { name: "B&O Railroad", price: 200, rent: [25, 50, 100, 200], mortgage: 100, owner: null },
    92: { name: "Atlantic Avenue", price: 260, rent: [22, 110, 330, 800, 975, 1150], mortgage: 130, owner: null },
    91: { name: "Ventnor Avenue", price: 260, rent: [22, 110, 330, 800, 975, 1150], mortgage: 130, owner: null },
    90: { name: "Water Works", price: 150, rent: [4, 10], mortgage: 75, owner: null },
    80: { name: "Marvin Gardens", price: 280, rent: [24, 120, 360, 850, 1025, 1200], mortgage: 140, owner: null },
    70: { name: "Go to Jail", price: 0, rent: [0], mortgage: 0, owner: null },
    60: { name: "Pacific Avenue", price: 300, rent: [26, 130, 390, 900, 1100, 1275], mortgage: 150, owner: null },
    50: { name: "North Carolina Avenue", price: 300, rent: [26, 130, 390, 900, 1100, 1275], mortgage: 150, owner: null },
    40: { name: "Community Chest", price: 0, rent: [0], mortgage: 0, owner: null },
    30: { name: "Pennsylvania Avenue", price: 320, rent: [28, 150, 450, 1000, 1200, 1400], mortgage: 160, owner: null },
    20: { name: "Short Line Railroad", price: 200, rent: [25, 50, 100, 200], mortgage: 100, owner: null },
    10: { name: "Chance", price: 0, rent: [0], mortgage: 0, owner: null }
};

    const boardSize = 10; // 10x10 grid (100 squares)
    let positionIndex = 0; // Track player's position in the path
    let balance = 1500; // Player's starting money
    let ownedProperties = []; // List of player's owned properties

    // Load properties from external properties.js
    loadProperties();

    // Generate 100 grid cells
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        board.appendChild(cell);
    }

    const cells = document.querySelectorAll(".cell");
    updatePlayerUI(); // Initial UI update

    rollButton.addEventListener("click", () => {
        const roll1 = Math.floor(Math.random() * 6) + 1; // First dice roll (1-6)
        const roll2 = Math.floor(Math.random() * 6) + 1; // Second dice roll (1-6)
        const rollTotal = roll1 + roll2; // Sum of both dice
        diceResult.textContent = `You rolled a ${roll1} and a ${roll2} (Total: ${rollTotal})!`;

        let previousIndex = positionIndex; // Save previous position before moving
        positionIndex = (positionIndex + rollTotal) % path.length; // Move forward

        // Check if player completed a loop (crossed GO)
        if (positionIndex < previousIndex) {
            balance += 200;
            console.log("Completed a full loop! +$200 added.");
        }

        updatePlayerUI();
        checkPropertyPurchase(); // Check if property can be bought
    });

    function updatePlayerUI() {
        // Clear previous player position
        cells.forEach(cell => cell.innerHTML = "");

        // Move player to the new position
        cells[path[positionIndex]].appendChild(player);

        // Update UI elements
        let property = properties[path[positionIndex]];
        positionDisplay.textContent = `Position: ${property.name} - $${property.price}`;
        balanceDisplay.textContent = `Balance: $${balance}`;
        propertiesDisplay.textContent = `Owned Properties: ${ownedProperties.length > 0 ? ownedProperties.join(", ") : "None"}`;
    }

    function checkPropertyPurchase() {
        let currentPosition = path[positionIndex];
        let property = properties[currentPosition];

        // Ensure the property exists and is unowned
        if (property && property.owner === null && property.price > 0) {
            // Display buy button if player has enough balance
            buyButton.style.display = balance >= property.price ? "block" : "none";
            buyButton.onclick = () => purchaseProperty(currentPosition, property);
        } else {
            buyButton.style.display = "none";
        }
    }

    function purchaseProperty(position, property) {
        balance -= property.price;
        property.owner = "Player";
        ownedProperties.push(property.name);
        console.log(`Property ${property.name} purchased for $${property.price}.`);
        updatePlayerUI();
        buyButton.style.display = "none";
    }
});
