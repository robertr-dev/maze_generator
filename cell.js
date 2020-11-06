//cell object
function Cell(i, j) {
	//row and column of Cell object
	this.i = i;
	this.j = j;

	//top, right, bottom, left
	//array that will allow us to add and remove walls for each grid element
	this.walls = [true, true, true, true];

	//variable to check if cell has been visited
	this.visited = false;

	//check if neighbors are visited and choose one randomly
	this.checkNeighbors = function() {
		var neighbors = [];

		var top = grid[index(i, j - 1)];
		var right = grid[index(i + 1, j)];
		var bottom = grid[index(i, j + 1)];
		var left = grid[index(i - 1, j)];

		//if the neighbor exists and has not been visited push into neighbors array
		if(top && !top.visited) {
			neighbors.push(top);
		}

		if(right && !right.visited) {
			neighbors.push(right);
		}

		if(bottom && !bottom.visited) {
			neighbors.push(bottom);
		}

		if(left && !left.visited) {
			neighbors.push(left);
		}

		//if there are unvisited neighbors choose one randomly
		if(neighbors.length > 0) {
			var r = floor(random(0, neighbors.length));
			return neighbors[r];
		} else {
			return undefined;
		}
	}

	this.show = function() {
		var x = this.i * w;
		var y = this.j * w;
		stroke(255);

		//only show wall if corresponding wall value in walls[] is true
		if(this.walls[0]) {
			//line on top border of each row
			line(x, y, x + w, y);
		}

		if(this.walls[1]) {
			//line on right border of each column 
			line(x + w, y, x + w, y + w);
		}

		if(this.walls[2]) {
			//line on bottom border of each row
			line(x + w, y + w, x, y + w);
		}

		if(this.walls[3]) {
			//line on left border of each column
			line(x, y + w, x, y);
		}

		//change color of visited cells
		if(this.visited) {
			noStroke();
			fill(255, 0, 255, 100);
			rect(x, y, w, w);
		}
	}

	//highlight current cell
	this.highlight = function() {
		var x = this.i * w;
		var y = this.j * w;
		noStroke();
		fill(102, 255, 0);
		rect(x, y, w, w);
	}
}