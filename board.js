export const boardSize = 11;

// Monopoly properties assigned to border squares
export const properties = [
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

// Movement path along the border (clockwise)
export const path = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    21, 32, 43, 54, 65, 76, 87, 98, 109, 120,
    119, 118, 117, 116, 115, 114, 113, 112, 111, 110,
    99, 88, 77, 66, 55, 44, 33, 22, 11
];

// Function to create the board grid dynamically
export function createBoard(board) {
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
}
