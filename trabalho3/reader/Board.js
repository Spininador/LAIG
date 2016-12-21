// -----------------------------------------------------------------------------
// ------------------------------ A BOARD --------------------------------------
// -----------------------------------------------------------------------------

/*
	Element representing a board.
*/
function Board(scene, dimX, dimY, tileSize,c1,c2,tex,pc1,pc2,ptex){

	this.scene = scene;
	this.tileSize = tileSize;
	this.c1 = c1;
	this.c2 = c2;
	this.tex = tex;
	this.pc1 = pc1;
	this.pc2 = pc2;
	this.ptex = ptex;
	// The board's dimensions.
	this.dimX = dimX;
	this.dimY = dimY;

	this.selectedTile = 144;

	this.team1aux = new AuxBoard(scene);
	this.team2aux = new AuxBoard(scene);

	this.currPlayer = 1;
	this.currTurn = 1;

	// The board's tile set.
	this.tiles = [];
	this.initTiles();
}

/*
	Board object constructor.
*/
Board.prototype.constructor = Board;

/*
	Get a specific tile
*/
Board.prototype.getTile = function(x,y){
	return this.tiles[y*this.dimX + x];
}

/*
	Lay out the board.
*/
Board.prototype.initTiles = function(){
	for (var y = 0; y < this.dimY; y++){
		for(var x = 0; x < this.dimX; x++){
			this.tiles[y*this.dimX + x] = new Tile(this.scene, this, this.tileSize,y*this.dimX + x,this.pc1,this.pc2,this.ptex);
		}
	}
}

Board.prototype.nextTurn = function(){
	if(this.currPlayer == 1){
		this.currPlayer = 2;
	}else this.currPlayer = 1;

	this.currTurn++;
}

Board.prototype.initPieces = function(){
	var tile1 = this.getTile(5,0);
	var tile2 = this.getTile(6,11);
	for(var i = 0 ; i < 20;i++){
		tile1.addPiece(new Piece(this.scene,"piece",1));
		tile2.addPiece(new Piece(this.scene,"piece",2));
	}
}

Board.prototype.removePiece = function(x,y){
	var tile = this.getTile(x,y);
	var piece = tile.pieces[tile.pieces.length-1];
}


Board.prototype.display = function(){
	for (var y = 0; y < this.dimY; y++){
		for (var x = 0; x < this.dimX; x++){
			this.scene.pushMatrix();
				if (x % 2 == 0 && y % 2 == 0 || x % 2 != 0 && y % 2 != 0){
					this.scene.listAppearances[this.c1].setTexture(this.scene.listTextures[this.tex].texture);
					this.scene.listAppearances[this.c1].apply();
				}else{
					this.scene.listAppearances[this.c2].setTexture(this.scene.listTextures[this.tex].texture);
					this.scene.listAppearances[this.c2].apply();
				}
				if(this.selectedTile == y*this.dimY + x){
					if(this.currPlayer == 1){
						this.scene.listAppearances[this.pc1].setTexture(this.scene.listTextures[this.tex].texture);
						this.scene.listAppearances[this.pc1].apply();
					}else{
						this.scene.listAppearances[this.pc2].setTexture(this.scene.listTextures[this.tex].texture);
						this.scene.listAppearances[this.pc2].apply();
					}
				}
				this.scene.translate(this.tileSize * x, 0, this.tileSize * y);
				this.tiles[y*this.dimX + x].display();
			this.scene.popMatrix();
		}
	}
		
}

Board.prototype.convertToPrologBoard = function() {
	var boardString = "[";
	for (var y = 0; y < 12; y++){
		var row = "[";
		for (var x = 0; x < 12; x++){
			var toAppend = "";
			if (this.tiles[y*12 + x].pieces.length == 0){
				toAppend = "empty";
			}
			else if (this.tiles[y*12 + x].pieces.length == 1){
				if (this.tiles[y*12 + x].pieces[0].team == 1){
					toAppend = "ivoryBaby";
				}
				else toAppend = "cigarBaby";
			}
			else {
				if (this.tiles[y*12 + x].pieces[0].team == 1){
					toAppend = "ivoryQueen";
				}
				else toAppend = "cigarQueen";
			}
			if (x != 11) toAppend = toAppend + ",";

			row = row + toAppend;
		}
		row = row + "]";
		if ( y != 11) row = row + ",";

		boardString = boardString + row;
	}
	boardString = boardString + "]";
	return boardString;
}

// -----------------------------------------------------------------------------
// ------------------------------ GAME BOARD -----------------------------------
// -----------------------------------------------------------------------------

/*
	Element representing a main board.
*/

function GameBoard (scene, dimX, dimY, tileSize,c1,c2,tex,pc1,pc2,ptex) {

	// board element
	this.board = new Board(scene, dimX, dimY, tileSize,c1,c2,tex,pc1,pc2,ptex);
	this.board.initPieces();

}


/*
	Method to move a piece from a position to a target.
*/

GameBoard.prototype.move = function(oldCol, oldRow, newCol, newRow){
	
	var currentTile = this.getTile(oldCol, oldRow);
	var targetTile = this.getTile(newCol, newRow);
	
	currentTile.piece.moveToTile(targetTile);
}

GameBoard.prototype.setSelected = function(ind){
	this.board.selectedTile = ind;
}
/*
	Method to display the board.
*/

GameBoard.prototype.display = function(){
	this.board.display();
}

// -----------------------------------------------------------------------------
// ------------------------------ AUX BOARD ------------------------------------
// -----------------------------------------------------------------------------

/*
	Element representing an auxiliary board.
*/

function AuxBoard (scene) {

	this.scene = scene;
	// board element
	this.pieces = [];
}

AuxBoard.prototype.addPiece = function(piece){
	this.pieces.push(piece);
}


AuxBoard.prototype.display = function(){
	this.board.display();
}