document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector(".grid");
    const rollButton = document.getElementById("rollButton");
    const diceResult = document.getElementById("diceResult");
    const positionDisplay = document.getElementById("position");
    const balanceDisplay = document.getElementById("balance");
    const propertiesDisplay = document.getElementById("properties");

    const boardSize = 11; // 11x11 grid
    let positionIndex = 0; // Player's current position index in the path
    let balance = 1500; // Player's starting money

    // Monopoly property data mapped to the border squares
    const properties = [
        { name: "GO", price: 0, rent: 0 },
        { name: "Mediterranean Ave", price: 60, rent: 2 },
        { name: "Community Chest", price: 0, rent: 0 },
        { name: "Baltic Avenue", price: 60, rent: 4 },
        { name: "Income Tax", price: 0, rent: 0 },
        { name: "Reading Railroad", price: 200, rent: 25 },
        { name: "Oriental Avenue", price: 100, rent: 6 },
        { name: "Chance", price: 0, rent: 0 },
        { name: "Vermont Avenue", price: 100, rent: 6 },
        { name: "Connecticut Avenue", price: 120, rent: 8 },
        { name: "Jail (Just Visiting)", price: 0, rent: 0 },
        { name: "St. Charles Place", price: 140, rent: 10 },
        { name: "Electric Company", price: 150, rent: 0 },
        { name: "States Avenue", price: 140, rent: 10 },
        { name: "Virginia Avenue", price: 160, rent: 12 },
        { name: "Pennsylvania Railroad", price: 200, rent: 25 },
        { name: "St. James Place", price: 180, rent: 14 },
        { name: "Community Chest", price: 0, rent: 0 },
        { name: "Tennessee Avenue", price: 180, rent: 14 },
        { name: "New York Avenue", price: 200, rent: 16 },
        { name: "Free Parking", price: 0, rent: 0 },
        { name: "Kentucky Avenue", price: 220, rent: 18 },
        { name: "Chance", price: 0, rent: 0 },
        { name: "Indiana Avenue", price: 220, rent: 18 },
        { name: "Illinois Avenue", price: 240, rent: 20 },
        { name: "B&O Railroad", price: 200, rent: 25 },
        { name: "Atlantic Avenue", price: 260, rent: 22 },
        { name: "Ventnor Avenue", price: 260, rent: 22 },
        { name: "Water Works", price: 150, rent: 0 },
        { name: "Marvin Gardens", price: 280, rent: 24 },
        { name: "Go to Jail", price: 0, rent: 0 },
        { name: "Pacific Avenue", price: 300, rent: 26 },
        { name: "North Carolina Avenue", price: 300, rent: 26 },
        { name: "Community Chest", price: 0, rent: 0 },
        { name: "Pennsylvania Avenue", price: 320, rent: 28 },
        { name: "Short Line", price: 200, rent: 25 },
        { name: "Chance", price: 0, rent: 0 },
        { name: "Park Place", price: 350, rent: 35 },
        { name: "Luxury Tax", price: 0, rent: 0 },
        { name: "Boardwalk", price: 400, rent: 50 }
    ];

    // Define movement path (clockwise along border)
    const path = [
        // Top row
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        // Right column (down)
        21, 32, 43, 54, 65, 76, 87, 98, 109, 120,
        // Bottom row (left)
        119, 118, 117, 116, 115, 114, 113, 112, 111, 110,
        // Left column (up)
        99, 88, 77, 66, 55, 44, 33, 22, 11
    ];

    // Create the board dynamically
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);

        // Add property names only to border squares
        let pathIndex = path.indexOf(i);
        if (pathIndex !== -1) {
            cell.innerHTML = `<small>${properties[pathIndex].name}</small>`;
            cell.classList.add("property-cell");
        }

        board.appendChild(cell);
    }

    const cells = document.querySelectorAll(".cell");

    updatePlayerUI(); // Initial UI update

    rollButton.addEventListener("click", () => {
        const roll1 = Math.floor(Math.random() * 6) + 1; // First dice roll (1-6)
        const roll2 = Math.floor(Math.random() * 6) + 1; // Second dice roll (1-6)
        const rollTotal = roll1 + roll2; // Sum of both dice
        diceResult.textContent = `You rolled a ${rollTotal}`;

        let previousIndex = positionIndex; // Save previous position before moving
        positionIndex = (positionIndex + rollTotal) % path.length; // Move forward

        // Check if player passed GO and collect $200
        if (positionIndex < previousIndex) {
            balance += 200;
            console.log("Passed GO! +$200 added.");
        }

        updatePlayerUI();
    });

    function updatePlayerUI() {
        // Remove previous player marker
        cells.forEach(cell => cell.innerHTML = cell.innerHTML.replace("🚀", ""));

        // Move player to new position
        let newPosition = path[positionIndex];
        cells[newPosition].innerHTML += " 🚀"; // Add player marker

        // Update UI elements
        let currentProperty = properties[positionIndex];
        positionDisplay.textContent = `Position: ${currentProperty.name}`;
        balanceDisplay.textContent = `Balance: $${balance}`;
        propertiesDisplay.textContent = `Current Property: ${currentProperty.name} - Price: $${currentProperty.price}, Rent: $${currentProperty.rent}`;
    }
});
