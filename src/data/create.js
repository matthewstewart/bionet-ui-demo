/*****************************/
/* Create Test Data For Demo */
/*****************************/
// Lab / Freezer / Shelf / Rack / Box / Well
// Writes to test.json

// File System
const fs =  require('fs');


// Well Array
let wellArray = [];
for(let column = 1; column < 13; column++){
	for(let row = 1; row < 9; row++){
		let well;
		if(column < 3 && row < 3){
			let well = {
				column,
				row,
				name: `Well ${column},${row}`,
				type: "Well",
				children: []
			};
			wellArray.push(well);
		}
	}
}

// Box Array
let boxArray = [];
for(let column = 1; column < 6; column++){
	for(let row = 1; row < 5; row++){
		let box = {
			column,
			row,
			name: `Box ${column},${row}`,
			type: "Box",
			children: wellArray
		};
		boxArray.push(box);
	}
}

// Rack Array
let rackArray = [];
for(let i = 1; i < 5; i++){
	let rack;
	if(i < 3){
		rack = {
			name: `Rack ${i}`,
			type: "Rack",
			children: boxArray
		};
	} else {
		rack = {
			name: `Rack ${i}`,
			type: "Rack",
			children: []
		};		
	}	
	rackArray.push(rack);
}

// Shelf Array
let shelfArray = [];
for(let i = 1; i < 6; i++){
	let shelf;
	if(i < 3){
		shelf = {
			name: `Shelf ${i}`,
			type: "Shelf",
			children: rackArray
		};
	} else {
		shelf = {
			name: `Shelf ${i}`,
			type: "Shelf",
			children: []
		};		
	}	
	shelfArray.push(shelf);
}

// Freezer Array
let freezerArray = [];
for(let i = 1; i < 6; i++){
	let freezer;
	if(i < 3){
		freezer = {
			name: `Freezer ${i}`,
			type: "Freezer",
			children: shelfArray
		};
	}	else {
		freezer = {
			name: `Freezer ${i}`,
			type: "Freezer",
			children: []
		};		
	}
	freezerArray.push(freezer);
}

// Lab
let lab = {
	name: "EndyLab",
	type: "Lab",
	children: freezerArray
};

// Write Lab to ./test.json
fs.writeFileSync('./src/data/test.json', JSON.stringify(lab, null, "  "));

console.log('Test Data Written To ./src/data/test.json');