// Property Management Script
const propertyPrices = {};
const ownedProperties = [];

// Assign property prices (exclude 0, 9, 99, 90)
const pathExclusions = [0, 9, 99, 90];
path.forEach(position => {
    if (!pathExclusions.includes(position)) {
        propertyPrices[position] = 100; // Fixed price for all properties
    }
});

function handlePropertyPurchase(position) {
    if (propertyPrices[position] && !ownedProperties.includes(position)) {
        if (balance >= 100) {
            let buy = confirm(`You landed on position ${position}. Would you like to buy it for $100?`);
            if (buy) {
                balance -= 100;
                ownedProperties.push(position);
                console.log(`Property ${position} purchased for $100.`);
                updatePropertyUI();
            }
        }
    }
}

function updatePropertyUI() {
    const propertiesDisplay = document.getElementById("properties");
    propertiesDisplay.textContent = `Owned Properties: ${ownedProperties.length > 0 ? ownedProperties.join(", ") : "None"}`;
}
