let positionIndex = 0;
let balance = 1500;
let ownedProperties = [];

function rollDice() {
    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;
    const rollTotal = roll1 + roll2;

    diceResult.textContent = `🎲 ${roll1} + 🎲 ${roll2} = ${rollTotal}`;

    let previousIndex = positionIndex;
    positionIndex = (positionIndex + rollTotal) % path.length;

    if (positionIndex < previousIndex) {
        balance += 200;
    }

    updatePlayerUI();
}

function buyProperty() {
    let currentProperty = properties[positionIndex];

    if (!currentProperty.owned && currentProperty.price > 0 && balance >= currentProperty.price) {
        balance -= currentProperty.price;
        currentProperty.owned = true;
        ownedProperties.push(currentProperty);
        updatePlayerUI();
    }
}

function upgradeProperty(property) {
    if (balance >= property.houseCost) {
        balance -= property.houseCost;
        property.houses += 1;
        updatePlayerUI();
    } else {
        alert("Not enough money to upgrade!");
    }
}

function downgradeProperty(property) {
    if (property.houses > 0) {
        property.houses -= 1;
        balance += property.houseCost / 2;
    } else if (property.houses === 0 && !property.mortgaged) {
        property.mortgaged = true;
        balance += property.mortgageValue;
    }
    updatePlayerUI();
}
