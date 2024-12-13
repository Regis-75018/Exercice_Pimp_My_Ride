





function parseTrip(trip) {
    const [client, start, duration, price] = trip.split(" ");
    return {
        client: client,
        start: parseInt(start, 10),
        duration: parseInt(duration, 10),
        price: parseInt(price, 10)
    };
}

// Exemple
let tripToParse = "Perdita 8 10 8";
console.log(parseTrip(tripToParse));
// { client: 'Perdita', start: 8, duration: 10, price: 8 }


function parseTrips(trips) {
    return trips.map(parseTrip);
}

// Exemple
let tripsToParse = [
    "Roger 0 5 10",
    "Pongo 3 7 14",
    "Perdita 8 10 8",
    "Anita 16 3 7"
];
console.log(parseTrips(tripsToParse));
/*
[
    { client: 'Roger', start: 0, duration: 5, price: 10 },
    { client: 'Pongo', start: 3, duration: 7, price: 14 },
    { client: 'Perdita', start: 8, duration: 10, price: 8 },
    { client: 'Anita', start: 16, duration: 3, price: 7 }
]
*/

function getTripsPrice(trips) {
    return trips.reduce((total, trip) => total + trip.price, 0);
}

// Exemple
console.log(getTripsPrice([
    { client: 'Roger', start: 0, duration: 5, price: 10 },
    { client: 'Pongo', start: 3, duration: 7, price: 14 }
]));
// 24

function checkCompatibility(tripA, tripB) {
    const endA = tripA.start + tripA.duration;
    return endA <= tripB.start || tripB.start + tripB.duration <= tripA.start;
}

// Exemple
console.log(checkCompatibility(
    { client: 'Roger', start: 0, duration: 5, price: 10 },
    { client: 'Pongo', start: 3, duration: 7, price: 14 }
));
// false

console.log(checkCompatibility(
    { client: 'Roger', start: 0, duration: 5, price: 10 },
    { client: 'Perdita', start: 8, duration: 10, price: 8 }
));
// true

function findCompatibilities(trips) {
    const combinations = [];
    
    function backtrack(start, current) {
        combinations.push([...current]);
        
        for (let i = start; i < trips.length; i++) {
            if (current.every(trip => checkCompatibility(trip, trips[i]))) {
                current.push(trips[i]);
                backtrack(i + 1, current);
                current.pop();
            }
        }
    }
    
    backtrack(0, []);
    return combinations;
}

// Exemple
const trips = parseTrips([
    "Roger 0 5 10",
    "Pongo 3 7 14",
    "Perdita 8 10 8",
    "Anita 16 3 7"
]);
console.log(findCompatibilities(trips));





function findBestPrice(trips) {
    const allCombinations = findCompatibilities(trips);
    let bestCombination = [];
    let bestPrice = 0;

    for (const combination of allCombinations) {
        const price = getTripsPrice(combination);
        if (price > bestPrice) {
            bestPrice = price;
            bestCombination = combination;
        }
    }
    
    return { bestCombination, bestPrice };
}

// Exemple
console.log(findBestPrice(trips));
// { bestCombination: [ { client: 'Pongo', start: 3, duration: 7, price: 14 }, { client: 'Anita', start: 16, duration: 3, price: 7 } ], bestPrice: 21 }




