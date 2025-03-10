export const boardSize = 11;

// Monopoly properties mapped to border squares
export const properties = [
    { name: "GO", price: 0, rent: [0], mortgage: 0, houseCost: 0, owner: null, houses: 0 },
    { name: "Mediterranean Ave", price: 60, rent: [2, 10, 30, 90, 160, 250], mortgage: 30, houseCost: 50, owner: null, houses: 0 },
    { name: "Community Chest", price: 0, rent: [0], mortgage: 0, houseCost: 0, owner: null, houses: 0 },
    { name: "Baltic Avenue", price: 60, rent: [4, 20, 60, 180, 320, 450], mortgage: 30, houseCost: 50, owner: null, houses: 0 },
    { name: "Income Tax", price: 0, rent: [0], mortgage: 0, houseCost: 0, owner: null, houses: 0 },
    { name: "Reading Railroad", price: 200, rent: [25, 50, 100, 200], mortgage: 100, houseCost: 0, owner: null, houses: 0 },
    { name: "Oriental Avenue", price: 100, rent: [6, 30, 90, 270, 400, 550], mortgage: 50, houseCost: 50, owner: null, houses: 0 },
    { name: "Chance", price: 0, rent: [0], mortgage: 0, houseCost: 0, owner: null, houses: 0 },
    { name: "Vermont Avenue", price: 100, rent: [6, 30, 90, 270, 400, 550], mortgage: 50, houseCost: 50, owner: null, houses: 0 },
    { name: "Connecticut Avenue", price: 120, rent: [8, 40, 100, 300, 450, 600], mortgage: 60, houseCost: 50, owner: null, houses: 0 },
    { name: "Jail (Just Visiting)", price: 0, rent: [0], mortgage: 0, houseCost: 0, owner: null, houses: 0 },
    { name: "St. Charles Place", price: 140, rent: [10, 50, 150, 450, 625, 750], mortgage: 70, houseCost: 100, owner: null, houses: 0 },
    { name: "Electric Company", price: 150, rent: [4, 10], mortgage: 75, houseCost: 0, owner: null, houses: 0 },
    { name: "States Avenue", price: 140, rent: [10, 50, 150, 450, 625, 750], mortgage: 70, houseCost: 100, owner: null, houses: 0 },
    { name: "Virginia Avenue", price: 160, rent: [12, 60, 180, 500, 700, 900], mortgage: 80, houseCost: 100, owner: null, houses: 0 },
    { name: "Pennsylvania Railroad", price: 200, rent: [25, 50, 100, 200], mortgage: 100, houseCost: 0, owner: null, houses: 0 },
    { name: "St. James Place", price: 180, rent: [14, 70, 200, 550, 750, 950], mortgage: 90, houseCost: 100, owner: null, houses: 0 },
    { name: "Community Chest", price: 0, rent: [0], mortgage: 0, houseCost: 0, owner: null, houses: 0 },
    { name: "Tennessee Avenue", price: 180, rent: [14, 70, 200, 550, 750, 950], mortgage: 90, houseCost: 100, owner: null, houses: 0 },
    { name: "New York Avenue", price: 200, rent: [16, 80, 220, 600, 800, 1000], mortgage: 100, houseCost: 100, owner: null, houses: 0 },
    { name: "Free Parking", price: 0, rent: [0], mortgage: 0, houseCost: 0, owner: null, houses: 0 },
    { name: "Kentucky Avenue", price: 220, rent: [18, 90, 250, 700, 875, 1050], mortgage: 110, houseCost: 150, owner: null, houses: 0 },
    { name: "Chance", price: 0, rent: [0], mortgage: 0, houseCost: 0, owner: null, houses: 0 },
    { name: "Indiana Avenue", price: 220, rent: [18, 90, 250, 700, 875, 1050], mortgage: 110, houseCost: 150, owner: null, houses: 0 },
    { name: "Illinois Avenue", price: 240, rent: [20, 100, 300, 750, 925, 1100], mortgage: 120, houseCost: 150, owner: null, houses: 0 },
    { name: "B&O Railroad", price: 200, rent: [25, 50, 100, 200], mortgage: 100, houseCost: 0, owner: null, houses: 0 },
    { name: "Atlantic Avenue", price: 260, rent: [22, 110, 330, 800, 975, 1150], mortgage: 130, houseCost: 150, owner: null, houses: 0 },
    { name: "Ventnor Avenue", price: 260, rent: [22, 110, 330, 800, 975, 1150], mortgage: 130, houseCost: 150, owner: null, houses: 0 },
    { name: "Water Works", price: 150, rent: [4, 10], mortgage: 75, houseCost: 0, owner: null, houses: 0 },
    { name: "Marvin Gardens", price: 280, rent: [24, 120, 360, 850, 1025, 1200], mortgage: 140, houseCost: 150, owner: null, houses: 0 },
    { name: "Go to Jail", price: 0, rent: [0], mortgage: 0, houseCost: 0, owner: null, houses: 0 },
    { name: "Pacific Avenue", price: 300, rent: [26, 130, 390, 900, 1100, 1275], mortgage: 150, houseCost: 200, owner: null, houses: 0 },
    { name: "North Carolina Avenue", price: 300, rent: [26, 130, 390, 900, 1100, 1275], mortgage: 150, houseCost: 200, owner: null, houses: 0 },
    { name: "Pennsylvania Avenue", price: 320, rent: [28, 150, 450, 1000, 1200, 1400], mortgage: 160, houseCost: 200, owner: null, houses: 0 },
    { name: "Park Place", price: 350, rent: [35, 175, 500, 1100, 1300, 1500], mortgage: 175, houseCost: 200, owner: null, houses: 0 },
    { name: "Boardwalk", price: 400, rent: [50, 200, 600, 1400, 1700, 2000], mortgage: 200, houseCost: 200, owner: null, houses: 0 }
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
