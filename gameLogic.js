import { path, properties } from "./board.js";

export let positionIndex = 0;
export let balance = 1500;
export let ownedProperties = []

export function rollDice() {
    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;
    return roll1 + roll2;
}

export function movePlayer(rollTotal) {
    let previousIndex = positionIndex;
    positionIndex = (positionIndex + rollTotal) % path.length;

    if (positionIndex < previousIndex) {
        balance += 200;
        console.log("Passed GO! +$200 added.");
    }
}

export function canBuyProperty() {
    let currentProperty = properties[positionIndex];
    return currentProperty.price > 0 && !currentProperty.owner && balance >= currentProperty.price;
}

export function buyProperty() {
    let currentProperty = properties[positionIndex];

    if (canBuyProperty()) {
        balance -= currentProperty.price;
        currentProperty.owner = "Player";
        ownedProperties.push(currentProperty.name);
        console.log(`Purchased ${currentProperty.name} for $${currentProperty.price}.`);
        return true;
    }
    return false;
}
