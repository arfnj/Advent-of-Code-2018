// --- Day 3: No Matter How You Slice It ---
// The Elves managed to locate the chimney-squeeze prototype fabric for Santa's suit (thanks to someone who helpfully wrote its
// box IDs on the wall of the warehouse in the middle of the night). Unfortunately, anomalies are still affecting them - nobody
// can even agree on how to cut the fabric.

// The whole piece of fabric they're working on is a very large square - at least 1000 inches on each side.

// Each Elf has made a claim about which area of fabric would be ideal for Santa's suit. All claims have an ID and consist of a
// single rectangle with edges parallel to the edges of the fabric. Each claim's rectangle is defined as follows:

// The number of inches between the left edge of the fabric and the left edge of the rectangle.
// The number of inches between the top edge of the fabric and the top edge of the rectangle.
// The width of the rectangle in inches.
// The height of the rectangle in inches.
// A claim like #123 @ 3,2: 5x4 means that claim ID 123 specifies a rectangle 3 inches from the left edge, 2 inches from the top
// edge, 5 inches wide, and 4 inches tall. Visually, it claims the square inches of fabric represented by # (and ignores the square
// inches of fabric represented by .) in the diagram below:

// ...........
// ...........
// ...#####...
// ...#####...
// ...#####...
// ...#####...
// ...........
// ...........
// ...........

// The problem is that many of the claims overlap, causing two or more claims to cover part of the same areas. For example, consider
// the following claims:

// #1 @ 1,3: 4x4
// #2 @ 3,1: 4x4
// #3 @ 5,5: 2x2

// Visually, these claim the following areas:

// ........
// ...2222.
// ...2222.
// .11XX22.
// .11XX22.
// .111133.
// .111133.
// ........
// The four square inches marked with X are claimed by both 1 and 2. (Claim 3, while adjacent to the others, does not overlap
// either of them.)

// If the Elves all proceed with their own plans, none of them will have enough fabric. How many square inches of fabric are within
// two or more claims?

const input = require('./03_input.js');

// [claim #, left indent, top indent, width, height]

let fabric = [[]];
let overlap = 0;
let claims = new Set();

const widener = inches => {
	fabric.forEach(row => {
		for (let i=0; i<inches; i++) {
			row.push(0);
		}
	})
}

const lengthener = inches => {
	for (let i=0; i<inches; i++) {
		let row = new Array(fabric[0].length);
		row.fill(0);
		fabric.push(row);
	}
}

input.forEach(claim => {
	if ((claim[1] + claim[3]) > fabric[0].length) {
		widener(claim[1] + claim[3] - fabric[0].length);
	}
	if ((claim[2] + claim[4]) > fabric.length) {
		lengthener(claim[2] + claim[4] - fabric.length);
	}
	let hasOverlapped = false;
	for (let row=claim[2]; row<(claim[2]+claim[4]); row++) {
		for (let col=claim[1]; col<(claim[1]+claim[3]); col++) {
			if (typeof fabric[row][col] === 'string') {
				claims.delete(Number(fabric[row][col]));
				fabric[row][col] = '' + claim[0];
				hasOverlapped = true;
			}
			if (typeof fabric[row][col] === 'number' && fabric[row][col] > 0) {
				overlap ++;
				claims.delete(fabric[row][col]);
				fabric[row][col] = '' + claim[0];
				hasOverlapped = true;
			}
			if (fabric[row][col] === 0) {
				fabric[row][col] = claim[0];
			}
		}
	}
	!hasOverlapped && claims.add(claim[0]);
});

console.log(overlap);
console.log(claims.size);

// --- Part Two ---
// Amidst the chaos, you notice that exactly one claim doesn't overlap by even a single square inch of fabric with any other
// claim. If you can somehow draw attention to it, maybe the Elves will be able to make Santa's suit after all!

// For example, in the claims above, only claim 3 is intact after all claims are made.

// What is the ID of the only claim that doesn't overlap?


claims.forEach((key,value) => console.log(value));

