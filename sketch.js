//maze generator using depth-first search algorithm "recursive backtracker"
//		a) make initial cell the current cell and mark as visited
//		b) while there are unvisited cells
//			step 1) choose randomly an unvisited neighbor
//			step 2) push current cell to stack
//			step 3) remove wall between current cell and chosen cell
//			step 4) make chosen cell the current cell and mark as visited
//		c) if stack is not empty
//			pop cell from stack
//			make it the current cell

var cols, rows;
//width of each grid element
var w = 20;
var grid = [];

//variable for the current cell we are in
var current;

//array to manage stack
var stack = [];

function setup() {
	var cnv = createCanvas(600, 600);

	frameRate(20);

	//create rows and columns using specified width
	cols = floor(width / w);
	rows = floor(height / w);

	//j & i represent rows & columns
	//create and push cell object into current row and column
	for(var j = 0; j < rows; j++) {
		for(var i = 0; i < cols; i++) {
			var cell = new Cell(i, j);
			grid.push(cell);
		}
	}
	//setting initial cell to first element
	current = grid[0];
}

function draw() {
	background(51);
	for(var i = 0; i < grid.length; i++) {
		grid[i].show();
	}

	//set current cell as visited
	current.visited = true;
	current.highlight();

	//step 1
	var next = current.checkNeighbors();

	if(next) {
		next.visited = true;

		//step 2
		stack.push(current);

		//step 3
		removeWalls(current, next);

		//step 4
		current = next;
	}
	//if stack is not empty pop cell from stack and make current cell
	else if(stack.length > 0) {
		current = stack.pop();
	}
}

//formula allows us to analyze 1d array like a 2d array
function index(i, j) {
	//edge cases
	if(i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
		return -1;
	}

	return i + j * cols;
}



function removeWalls(a, b) {
	var x = a.i - b.i;
	var y = a.j - b.j;
	//if a.i - b.i = 1, b.i is to the left
	if(x === 1) {
		a.walls[3] = false;
		b.walls[1] = false;

	}
	//if a.i - b.i = -1, b.i is to the right
	else if(x === -1) {
		a.walls[1] = false;
		b.walls[3] = false;
	}
	//if a.j - b.j = 1, b.j is to the top
	else if(y === 1) {
		a.walls[0] = false;
		b.walls[2] = false;

	}
	//if a.j - b.j = -1, b.j is to the bottom
	else if(y === -1) {
		a.walls[2] = false;
		b.walls[0] = false;
	}
}

function windowResized() {
	var xPos = (windowWidth - width) / 2;
	var yPos = (windowHeight - height) / 2;
	cnv.position(xPos, yPos + windowHeight * 0.1);
}

