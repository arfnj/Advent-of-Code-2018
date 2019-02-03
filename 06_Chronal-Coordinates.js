// --- Day 6: Chronal Coordinates ---
// The device on your wrist beeps several times, and once again you feel like you're falling.

// "Situation critical," the device announces. "Destination indeterminate. Chronal interference detected. Please specify
// new target coordinates."

// The device then produces a list of coordinates (your puzzle input). Are they places it thinks are safe or dangerous?
// It recommends you check manual page 729. The Elves did not give you a manual.

// If they're dangerous, maybe you can minimize the danger by finding the coordinate that gives the largest distance from
// the other points.

// Using only the Manhattan distance, determine the area around each coordinate by counting the number of integer X,Y locations
// that are closest to that coordinate (and aren't tied in distance to any other coordinate).

// Your goal is to find the size of the largest area that isn't infinite. For example, consider the following list of coordinates:

const raw = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`

// If we name these coordinates A through F, we can draw them on a grid, putting 0,0 at the top left:

// ..........
// .A........
// ..........
// ........C.
// ...D......
// .....E....
// .B........
// ..........
// ..........
// ........F.

// This view is partial - the actual grid extends infinitely in all directions. Using the Manhattan distance, each location's
// closest coordinate can be determined, shown here in lowercase:

// aaaaa.cccc
// aAaaa.cccc
// aaaddecccc
// aadddeccCc
// ..dDdeeccc
// bb.deEeecc
// bBb.eeee..
// bbb.eeefff
// bbb.eeffff
// bbb.ffffFf
// Locations shown as . are equally far from two or more coordinates, and so they don't count as being closest to any.

// In this example, the areas of coordinates A, B, C, and F are infinite - while not shown here, their areas extend forever
// outside the visible grid. However, the areas of coordinates D and E are finite: D is closest to 9 locations, and E is closest
// to 17 (both including the coordinate's location itself). Therefore, in this example, the size of the largest area is 17.

// What is the size of the largest area that isn't infinite?



// const raw = require('./06_input.js');

let leftEdge = { edge: Infinity, indices: [] };
let rightEdge = { edge: -1, indices: [] };
let topEdge = { edge: Infinity, indices: [] };
let bottomEdge = { edge: -1, indices: [] };

let clean = raw.split('\n').map((entry,i) => {
	let [ col, row ] = entry.split(', ');
	col = Number(col);
	row = Number(row);
	if (col < leftEdge.edge) {
		leftEdge.edge = col;
		leftEdge.indices = [i];
	} else if (col === leftEdge.edge) {
		leftEdge.indices.push(i);
	}
	if (col > rightEdge.edge) {
		rightEdge.edge = col;
		rightEdge.indices = [i];
	} else if (col === rightEdge.edge) {
		rightEdge.indices.push(i);
	}
	if (row < topEdge.edge) {
		topEdge.edge = row;
		topEdge.indices = [i];
	} else if (row === topEdge.edge) {
		topEdge.indices.push(i);
	}
	if (row > bottomEdge.edge) {
		bottomEdge.edge = row;
		bottomEdge.indices = [i];
	} else if (row === bottomEdge.edge) {
		bottomEdge.indices.push(i);
	}
	return {
		index: i.toString(),
		col,
		row
	}
});

let grid = new Array(bottomEdge.edge+1).fill(new Array(rightEdge.edge+1));

for (let i=0; i<grid.length; i++) {
	for (let j=0; j<grid[0].length; j++) {
		grid[i][j] = { distance: Infinity, closestIndex: null };
	}
}



for (let i=0; i<grid.length; i++) {
	// console.log('In row', i);
	
	for (let j=0; j<grid[0].length; j++) {
		// console.log('In col', j);
		// console.log(grid[i]);f
		for (let k=0; k<clean.length; k++) {
			let distance = Math.abs(i-clean[k].row) + Math.abs(j-clean[k].col);
			if (distance < grid[i][j].distance) {
				grid[i][j].distance = distance;
				grid[i][j].closestIndex = clean[k].index;
			} else if (distance === grid[i][j].distance) {
				grid[i][j].closestIndex = 'multiple';
			}
		}
	}
}

console.log(clean);
console.log(grid[0]);

