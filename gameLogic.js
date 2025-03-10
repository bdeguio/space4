import { path, properties } from "./board.js";

export let positionIndex = 0;
export let balance = 1500;

export function rollDice() {
    return Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
}

export function movePlayer(rollTotal) {
    let previousIndex = positionIndex;
    positionIndex = (positionIndex + rollTotal) % path.length;

    if (positionIndex < previousIndex) {
        balance += 200;
        console.log("Passed GO! +$200 added.");
    }
}
