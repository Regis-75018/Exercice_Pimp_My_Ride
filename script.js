




// Définition de la classe Trip

class Trip {
    constructor (name, start, duration, price){
    
        this.name= name
        this.start= start
        this.duration= duration
        this.price= price
		this.end= start + duration
    
}

isCompatible(trip) {
	if(this.end <= trip.start || trip.end <= this.start)  {
		return true
	} else {
		return false
	}
}

}

let trip = new Trip('Roger', 0, 5, 10)
let anotherTrip = new Trip('Pongo', 3, 7, 14)




console.log(trip.isCompatible(anotherTrip))




// Modification de la fonction ParseTrip

function parseTrip(trip){

const [name, start, duration, price] = trip.split(" ");
return new Trip(name, parseInt(start, 10), parseInt(duration, 10), parseInt(price, 10));


}

let tripToParse = "Perdita 8 10 8";
let parsedTrip = parseTrip(tripToParse);
// console.log(parsedTrip);
// Résultat : Trip { name: 'Perdita', start: 8, duration: 10, price: 8 }








// Exemple
// let tripToParse = "Perdita 8 10 8";
// console.log(parseTrip(tripToParse));
// // { client: 'Perdita', start: 8, duration: 10, price: 8 }


function parseTrips(trips) {
    return trips.map(trip =>parseTrip(trip));
}

// Exemple
let tripsToParse = [
    "Roger 0 5 10",
    "Pongo 3 7 14",
    "Perdita 8 10 8",
    "Anita 16 3 7"
];

const TripsParsed = parseTrips(tripsToParse)
// console.log(TripsParsed);
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
// console.log(getTripsPrice([
//     { client: 'Roger', start: 0, duration: 5, price: 10 },
//     { client: 'Pongo', start: 3, duration: 7, price: 14 }
// ]));
// 24

// function checkCompatibility(tripA, tripB) {
//     const endA = tripA.start + tripA.duration;
//     return endA <= tripB.start || tripB.start + tripB.duration <= tripA.start;
// }

// Exemple
// console.log(checkCompatibility(
//     { client: 'Roger', start: 0, duration: 5, price: 10 },
//     { client: 'Pongo', start: 3, duration: 7, price: 14 }
// ));
// false

// console.log(checkCompatibility(
//     { client: 'Roger', start: 0, duration: 5, price: 10 },
//     { client: 'Perdita', start: 8, duration: 10, price: 8 }
// ));
// true

function findCompatibilities(trips) {
    const combinations = [];
    
    function backtrack(start, current) {
        combinations.push([...current]);
        
        for (let i = start; i < trips.length; i++) {
            if (current.every(trip => trip.isCompatible(trips[i]))) {
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
// const trips = parseTrips([
//     "Roger 0 5 10",
//     "Pongo 3 7 14",
//     "Perdita 8 10 8",
//     "Anita 16 3 7"
// ]);
const trips = [
    new Trip('Roger', 0, 5, 10),
    new Trip('Pongo', 3, 7, 14),
    new Trip('Perdita', 8, 10, 8),
    new Trip('Anita', 16, 3, 7)
];

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
// console.log(findBestPrice(trips));
// { bestCombination: [ { client: 'Pongo', start: 3, duration: 7, price: 14 }, { client: 'Anita', start: 16, duration: 3, price: 7 } ], bestPrice: 21 }




