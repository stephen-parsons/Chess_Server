//Stephen Parsons
//Chess Interface
//2018

// SET IP ADDRESS FOR HOSTING
var ipaddress = '192.168.1.81:8000'

//!! TO DO 

// - SET RULES FOR STALEMATE, 50 MOVE RULE, 3 FOLD REPETITION

// - EN PASSANT PAWN MOVES

// - PUT CAPTURED PIECES IN PIECES DIV

// !!
// !!BUILD ENPASSANT AND QUEENING
// !!

//!!

//FOR MOVELIST PARSING
// var CircularJSON = window.CircularJSON;

// VARIABLES
var gameId = document.currentScript.getAttribute("id");

//Board - 8x8 dictionary of square objects
var board = {}

//dictionary of moves containing game data
class MoveList {
	constructor(){
		this.head = null;
		this.tail = null;
	}
}

//SAVE MOVE METHOD
function saveMove(list, piece, newSquare, move){
	
	// CIRCULAR JSON DOES NOT WORK!!!

	let runner = list.head;
	// console.log(runner);

	if (list.head == null || list.head == ""){
		list.head = new Move(piece, newSquare, move);
		list.tail = list.head;
	}
	else {
		let prev = runner;
		while (runner.next != null && runner.next != ""){
			prev = runner.next;
			runner = runner.next;
		}
		runner.next = new Move(piece, newSquare, move)
		runner.next.previous = prev;
		list.tail = runner.next;
	}
}

//REFACTOR
function refactorBoardNull(){
	var keys = Object.keys(board)
	for (key of keys){
		if (board[key].piece == ""){
			board[key].piece = null;
		}
	}
}

//Create movelist object
var moveList = new MoveList();

//Move object
class Move {
	constructor(piece, newSquare, move){
		this.moveNumber = moveNumber
		this.turn = turn.color
		this.board = board
		this.white = white
		this.black = black
		this.next = null
		this.previous = null
		this.name = null;
		this.gameReady = gameReady;
		this.generateMoveName(piece, newSquare, move);
	}	

	generateMoveName(piece, newSquare, move){
		let moveName = piece.shorthand+newSquare.file+newSquare.rank;
		if (move == "Capture"){
			if (piece.name.includes("Pawn")){
				moveName = piece.square[0]+"x"+newSquare.file+newSquare.rank;
			}
			else {
				moveName = piece.shorthand+"x"+newSquare.file+newSquare.rank;
			}
		}
		else if (move == "CastleShort"){
			moveName = "O-O"
		}
		else if (move == "CastleLong"){
			moveName = "O-O-O"
		}
		if (mate == true){
			moveName+="#"
		}
		else if (turn.inCheck == true){
			moveName+="+"
		}

		this.name = moveName
	}	
}

//Array of piece names
var pieceNames = ["Rook", "Knight", "Bishop", "Queen", "King", "Bishop", "Knight", "Rook"];

//Array of file names
var file = ["a", "b", "c", "d", "e", "f", "g", "h"];

// square - object 
class Square {
	constructor(file,rank,color, x, y){
		this.file = file;
		this.rank = rank;
		this.piece = null;
		this.color = color;
		this.x = x;
		this.y = y;
	}
};

// piece - object 
class Piece {
	constructor(color, name){
		this.square;
		this.color = color;
		this.name = name;
		this.img;
		this.x;
		this.y;
		this.captured = false;
		this.targetSquares = [];
		this.checking;
		this.shorthand;
	}
};

// player - object
class Player {
	constructor(color){
		this.color = color;
		this.name;
		this.time;
		this.isMove;
		this.inCheck = false;
		this.pieces = {};
		this.capturedPieces = {};
		this.castle = true;
	}
}

//Players
let white = new Player("white");
let black = new Player("black");

//Who's turn it is
var turn = white;

//Move #
var moveNumber = 0;

//Game is reay to go
var gameReady = true;

// FUNCTIONS

//

function createBoard(){
	for (let x = 0; x<8; x++){
		for (let y = 1; y<9; y++){
			if (x% 2 == 0){
				if (y % 2 == 0){
					color = "white";
				}
				else {
					color = "black";
				}
			}	
			else if (x % 2 != 0){
				if (y % 2 == 0){
					color = "black";
				}
				else {
					color = "white";
				}	
			}	
			var name = file[x]+y;
			// console.log(name);	
			board[name] = new Square(file[x], y, color, (x*60), (420-((y-1)*60)));
		}
	}
}

function createPiecesForColor(color){

	// MAKE THE PAWNS!!

	fileNum = 0;
	for (let y = 0; y<8; y++){
		// console.log(name);
		if (y < 3){
			var name = "Queens"+pieceNames[y]+"Pawn";
		}
		else if (y > 4){
			var name = "Kings"+pieceNames[y]+"Pawn";
		}
		else if (y == 3){
			var name = "QueensPawn";
		}
		else if (y == 4){
			var name = "KingsPawn";
		}
		makePawn();

		//

		function makePawn(){
			color.pieces[name] = new Piece(color.color, name);
			color.pieces[name].shorthand = "" 
			color.pieces[name].legalMoves = [];
			if (color == white){
				color.pieces[name].img = "/assets/chessInterface/static/images/WhitePawn.png"
				color.pieces[name].square = file[fileNum]+2;
				fileNum += 1;
			}
			else if (color == black){
				color.pieces[name].img = "/assets/chessInterface/static/images/BlackPawn.png"
				color.pieces[name].square = file[fileNum]+7;
				fileNum += 1;
			}
		} 
	}	

	// MAKE THE OTHER PIECES!!

	fileNum = 0;
	for (let y = 0; y<8; y++){
		if (y < 3){
			var name = "Queens"+pieceNames[y];
		}
		else if (y > 4){
			var name = "Kings"+pieceNames[y];
		}
		else if (y == 3){
			var name = "Queen";
		}
		else if (y == 4){
			var name = "King";
		}
		makePiece();
		function makePiece(){
			color.pieces[name] = new Piece(color.color, name);
			if (pieceNames[y] === "Knight"){
				color.pieces[name].shorthand = "N"
			}
			else{
				color.pieces[name].shorthand = pieceNames[y][0];
			}
			if (color == white){
				color.pieces[name].img = "/assets/chessInterface/static/images/White"+pieceNames[y]+".png"
				color.pieces[name].square = file[fileNum]+1;
				fileNum += 1;
			}
			else if (color == black){
				color.pieces[name].img = "/assets/chessInterface/static/images/Black"+pieceNames[y]+".png"
				color.pieces[name].square = file[fileNum]+8;
				fileNum += 1;
			}
		} 
	}
}

function clearBoard(){
	document.getElementById("board").innerHTML = "";
}

function populateBoard(color){
	for (let piece in color.pieces) {
		board[color.pieces[piece].square].piece = color.pieces[piece];
		if (color == white){
			document.getElementById("board").innerHTML += "<div id=White"+color.pieces[piece].name+"><img src="+color.pieces[piece].img+" alt="+color.pieces[piece].name+"></div>";
		}
		else if (color == black){
			document.getElementById("board").innerHTML += "<div id=Black"+color.pieces[piece].name+"><img src="+color.pieces[piece].img+" alt="+color.pieces[piece].name+"></div>";	
		}
		board[color.pieces[piece].square].piece.x = board[color.pieces[piece].square].x;
		board[color.pieces[piece].square].piece.y = board[color.pieces[piece].square].y;
		if (color == white){
			document.getElementById("White"+color.pieces[piece].name).style.opacity = 0;
			document.getElementById("White"+color.pieces[piece].name).style.left = parseInt(color.pieces[piece].x)+"px";
			document.getElementById("White"+color.pieces[piece].name).style.top = parseInt(color.pieces[piece].y)+"px";
			document.getElementById("White"+color.pieces[piece].name).style.webkitAnimationName = "fade-in";
		}
		else if (color == black){
			document.getElementById("Black"+color.pieces[piece].name).style.opacity = 0;
			document.getElementById("Black"+color.pieces[piece].name).style.left = parseInt(color.pieces[piece].x)+"px";
			document.getElementById("Black"+color.pieces[piece].name).style.top = parseInt(color.pieces[piece].y)+"px";
			document.getElementById("Black"+color.pieces[piece].name).style.webkitAnimationName = "fade-in";
		}	
	}
}

//
//PIECE MOVE FUNCTIONS
//

function updateBoard(piece, newSquare){
	if (piece.color == "white"){
		document.getElementById("White"+piece.name).style.left = newSquare.x+"px";
		document.getElementById("White"+piece.name).style.top = newSquare.y+"px";
	}
	else if (piece.color == "black"){
		document.getElementById("Black"+piece.name).style.left = newSquare.x+"px";
		document.getElementById("Black"+piece.name).style.top = newSquare.y+"px";
	}
	// console.log("AFTER", board);
}

function capturePiece(newSquare, player){
	//DELETE CAPTURED PIECE

	if (newSquare.piece.color == "white"){
		console.log("CAPTURE WHITE")
		white.pieces[newSquare.piece.name].captured = true;
		white.pieces[newSquare.piece.name].square = null;
		if (white.capturedPieces == null){
			white.capturedPieces = {};
		}
		white.capturedPieces[newSquare.piece.name] = white.pieces[newSquare.piece.name];
		delete white.pieces[newSquare.piece.name];
		var element = document.getElementById('White'+newSquare.piece.name);
		element.outerHTML = "";
		delete element;
	}
	else if (newSquare.piece.color == "black"){
		console.log("CAPTURE BLACK")
		black.pieces[newSquare.piece.name].captured = true;
		black.pieces[newSquare.piece.name].square = null;
		if (black.capturedPieces == null){
			black.capturedPieces = {};
		}
		black.capturedPieces[newSquare.piece.name] = black.pieces[newSquare.piece.name];
		delete black.pieces[newSquare.piece.name];
		var element = document.getElementById('Black'+newSquare.piece.name);
		element.outerHTML = "";
		delete element;
	}

}

//IF BOOLEAN TRUE, RUN KING CHECK
function movePiece(piece, newSquare, player, boolean, exclude, checkingMate){

	let ogSquare = $.extend([], piece.square);
	let ogPiece = $.extend({}, newSquare.piece)


	//MOVE PIECE
	board[piece.square].piece = null;
	piece.square = newSquare.file+newSquare.rank;
	newSquare.piece = piece;

	if (boolean == true){
		//CHECK IF KING IS NOW IN CHECK
		if (kingCheck(turn, nextTurn(), false, exclude) == true){
			console.log("Illegal move, king in check!")
			piece.square = ogSquare[0]+ogSquare[1];
			board[piece.square].piece = piece;
			if (Object.keys(ogPiece).length == 0){
				newSquare.piece = null;
			}
			else {
				newSquare.piece = ogPiece; 
			}
			//KING IN CHECK!
			return false;
		}
		else {
			//IF CHECKING FOR MATE RESET BOARD REGARDLESS!
			if (checkingMate == true){
				piece.square = ogSquare[0]+ogSquare[1];
				board[piece.square].piece = piece;
				if (Object.keys(ogPiece).length == 0){
					newSquare.piece = null;
				}
				else {
					newSquare.piece = ogPiece; 
				}
				return true;
			}
			else {
				//DON'T RESET BOARD RETURN TRUE FOR GOOD MOVE!
				return true;
			}
		}
	}
}

//CASTLESHORT
function castleShort(color){
	if (player == white){
		board["e1"].piece = null;
		white.pieces["King"].square = "g1";
		board["g1"].piece = white.pieces["King"];
		board["h1"].piece = null;
		white.pieces["KingsRook"].square = "f1";
		board["f1"].piece = white.pieces["KingsRook"];
		updateBoard(white.pieces["King"], board["g1"]);
		updateBoard(white.pieces["KingsRook"], board["f1"]);
	}
	else if (player == black){
		board["e8"].piece = null;
		black.pieces["King"].square = "g8";
		board["g8"].piece = black.pieces["King"];
		board["h8"].piece = null;
		black.pieces["KingsRook"].square = "f8";
		board["f8"].piece = black.pieces["KingsRook"];
		updateBoard(black.pieces["King"], board["g8"]);
		updateBoard(black.pieces["KingsRook"], board["f8"]);
	}
}

function castleLong(color){
	if (player == white){
		board["e1"].piece = null;
		white.pieces["King"].square = "c1";
		board["c1"].piece = white.pieces["King"];
		board["a1"].piece = null;
		white.pieces["QueensRook"].square = "d1";
		board["d1"].piece = white.pieces["QueensRook"];
		updateBoard(white.pieces["King"], board["c1"]);
		updateBoard(white.pieces["QueensRook"], board["d1"]);
	}
	else if (player == black){
		board["e8"].piece = null;
		black.pieces["King"].square = "c8";
		board["c8"].piece = black.pieces["King"];
		board["a8"].piece = null;
		black.pieces["QueensRook"].square = "d8";
		board["d8"].piece = black.pieces["QueensRook"];
		updateBoard(black.pieces["King"], board["c8"]);
		updateBoard(black.pieces["QueensRook"], board["d8"]);
	}
}

//CHECK IF KING IS IN CHECK
//Third argument is workaround for turn checking in checkMove()
function kingCheck(turn, player, boolean, exclude){
	var keys = Object.keys(player.pieces)
	for (let key of keys){
		//RUN CHECK MOVE ON EVERY PIECE WITH KING AS NEWSQUARE TO DETERMINE IF THEY CAN CAPTURE KING
		let move = checkMove(player.pieces[key], board[turn.pieces["King"].square], player, boolean, exclude);
		if (move == "Capture"){
			console.log("Check!")
			player.pieces[key].checking = true;
			return true;
		}
		else {
			player.pieces[key].checking = false;
			// console.log("No check");
		}
	}
	console.log("NO CHECKS!")
	return false;
}

//ROTATE TURN
function nextTurn(){
	if (turn == white){
		return black;
	}
	else {
		return white;
	}
}

//
// CHECK MOVE FUNCTION
//

// !!
// !!BUILD ENPASSANT AND QUEENING
// !!

function checkMove(piece, newSquare, player, boolean, exclude){

	//MAKE SURE IT'S THE CORRECT PLAYERS TURN
	//if boolean == false, we are running kingcheck, ignore this line
	if (boolean == true){
		if (player != turn){
			console.log("It is "+turn.color+"'s turn to move");
			return false;
		}
	}

	if (exclude != "null"){
		exclude = exclude.name;
	}

	//DEFINE RULES
	// console.log(exclude)
	// console.log("BEFORE:", board);
	// console.log("PIECE:", piece);
	// console.log("NEWSQUARE:", newSquare);

	let pieceRank = parseInt(piece.square[1])

	//PAWN

	if (!exclude.includes("Pawn")){

		if (piece.name.includes("Pawn")){

			// WHITE

			if (player == white){

				//CAPTURE
				if ((file.indexOf(piece.square[0]) - 1) == file.indexOf(newSquare.file) || (file.indexOf(piece.square[0]) + 1) == file.indexOf(newSquare.file)){
					if (newSquare.rank == pieceRank+1 && newSquare.piece != null){
						console.log("CAPTURE PIECE!")
						return "Capture";
					}
				}

				//PAWN MOVE BACKWARDS
				if (newSquare.rank <= pieceRank){
					return false;
				}

				//FIRST PAWN MOVE
				if (pieceRank == 2){
					if (newSquare.rank > pieceRank + 2){
						return false;
					}
				}
				//SUBSEQUENT PAWN MOVES
				else {
					if (newSquare.rank > pieceRank + 1){
						return false;
					}
				}
				//IF PIECE IN FRONT OF PAWN
				if (newSquare.piece != null){
					// console.log("Piece here!");
					return false;
				}
				else{
					// console.log("No piece here!");
				}
			}	

			// BLACK

			if (player == black){

				//CAPTURE
				if ((file.indexOf(piece.square[0]) - 1) ==  file.indexOf(newSquare.file) || (file.indexOf(piece.square[0]) + 1) ==  file.indexOf(newSquare.file)){
					if (newSquare.rank == pieceRank-1 && newSquare.piece != null){
						console.log("CAPTURE PIECE!")
						return "Capture";
					}
				}

				//PAWN MOVE BACKWARDS
				if (newSquare.rank >= pieceRank){
					return false;
				}
				//FIRST PAWN MOVE
				if (pieceRank == 7){
					if (newSquare.rank < pieceRank - 2){
						return false;
					}
				}
				//SUBSEQUENT PAWN MOVES
				else {
					if (newSquare.rank < pieceRank - 1){
						return false;
					}
				}
				//IF PIECE IN FRONT OF PAWN
				if (newSquare.piece != null){
					console.log("Piece here!");
					return false;
				}
				// else{console.log("No piece here!");}
			}	

			//PAWN MOVE OFF OF FILE
			if (newSquare.file != piece.square[0]){
				return false;
			}

			// ELSE
			console.log("GOOD MOVE!");
			return true;

		}
	}

	//ROOK

	function rookMove(){
		// IF RANK MOVE
		if (newSquare.rank == pieceRank){
			if (file.indexOf(newSquare.file) > file.indexOf(piece.square[0])){
				// console.log(file.indexOf(piece.square[0]))
				squares = file.slice(file.indexOf(piece.square[0])+1, file.indexOf(newSquare.file))
				squares = squares.reverse();
			}
			else if (file.indexOf(newSquare.file) < file.indexOf(piece.square[0])){
				// console.log(file.indexOf(piece.square[0]))
				squares = file.slice(file.indexOf(newSquare.file), file.indexOf(piece.square[0]))
				squares = squares.reverse();
			}
			// console.log(squares);
			for (let square of squares){
				// console.log(board[square+newSquare.rank]);
				if (squares.indexOf(square) == squares.length-1){
					if (newSquare.piece && newSquare.piece.color != piece.color){
						console.log("CAPTURE PIECE!")
						return "Capture";
					}
				}
				if (board[square+newSquare.rank].piece != null){
					console.log("Piece here!");
					return false;
				}
			}

			//ELSE
			return true;
		}	

		// IF FILE MOVE
		else if (newSquare.file == piece.square[0]){
			squares=[];
			if (newSquare.rank > pieceRank){
				for(x=pieceRank+1; x<=newSquare.rank; x++){
					squares.push(x);
				}
			}
			else if (newSquare.rank < pieceRank){
				for(x=pieceRank-1; x>=newSquare.rank; x--){
					squares.push(x);
				}
			}

			// console.log(squares);
			for (let square of squares){
				// console.log(board[newSquare.file+square]);
				if (squares.indexOf(square) == squares.length-1){
					if (newSquare.piece && newSquare.piece.color != piece.color){
						console.log("CAPTURE PIECE!")
						return "Capture";
					}
				}
				if (board[newSquare.file+square].piece != null){
					console.log("Piece here!");
					return false;
				}
			}

			//ELSE
			return true;
		}
	}

	if (!exclude.includes("Rook")){

		if (piece.name.includes("Rook")){
			if (newSquare.file != piece.square[0] && newSquare.rank != pieceRank){
				return false;
			}
			if (rookMove() == false){
				return false;
			}
			else if (rookMove() == "Capture"){
				return "Capture";
			}

			// ELSE
			console.log("GOOD MOVE!");
			return true;
		}	
	}	

	//KNIGHT
	if (!exclude.includes("Knight")){

		if (piece.name.includes("Knight")){

			//IF CAPTURE
			function checkKnighCap(){
				if (newSquare.piece && newSquare.piece.color != piece.color){
					console.log("CAPTURE PIECE!")
					return "Capture";
				}
			}

			if (file.indexOf(newSquare.file) == file.indexOf(piece.square[0]) + 2){
				if (newSquare.rank == pieceRank + 1 || newSquare.rank == pieceRank - 1){
					if (checkKnighCap() == "Capture"){
						return "Capture";
					};
					console.log("GOOD MOVE!");
					return true;
				}
			}
			if (file.indexOf(newSquare.file) == file.indexOf(piece.square[0]) - 2){
				if (newSquare.rank == pieceRank + 1 || newSquare.rank == pieceRank - 1){
					if (checkKnighCap() == "Capture"){
						return "Capture";
					};				
					console.log("GOOD MOVE!");
					return true;
				}
			}
			if (newSquare.rank == pieceRank - 2){
				if (file.indexOf(newSquare.file) == file.indexOf(piece.square[0]) + 1 || file.indexOf(newSquare.file) == file.indexOf(piece.square[0]) - 1){
					if (checkKnighCap() == "Capture"){
						return "Capture";
					};
					console.log("GOOD MOVE!");
					return true;
				}
			}

			if (newSquare.rank == pieceRank + 2){
				if (file.indexOf(newSquare.file) == file.indexOf(piece.square[0]) + 1 || file.indexOf(newSquare.file) == file.indexOf(piece.square[0]) - 1){
					if (checkKnighCap() == "Capture"){
						return "Capture";
					};
					console.log("GOOD MOVE!");
					return true;
				}
			}

			// ELSE
			else {
				return false;
			}
		}
	}

	// BISHOP

	function bishopMove(){
		if (Math.abs(newSquare.rank - pieceRank) == Math.abs(file.indexOf(newSquare.file) - file.indexOf(piece.square[0]))) {
			if (newSquare.rank < pieceRank && file.indexOf(newSquare.file) < file.indexOf(piece.square[0])){
				var bishopfile = file.indexOf(piece.square[0])-1;	
				for (x = pieceRank-1; x >= newSquare.rank; x--){
					// console.log(board[file[bishopfile]+x]);
					//IF END OF LOOP, CHECK CAPTURE
					if(x == newSquare.rank){
						//IF CAPTURE
						if (newSquare.piece && newSquare.piece.color != piece.color){
							console.log("CAPTURE PIECE!")
							return "Capture";
						}
					}
					if(board[file[bishopfile]+x].piece != null){
						console.log("Piece here!");
						return false;
					}
					else {
						bishopfile -=1;
					}
				}
			}
			else if (newSquare.rank < pieceRank && file.indexOf(newSquare.file) > file.indexOf(piece.square[0])){
				var bishopfile = file.indexOf(piece.square[0])+1;	
				for (x = pieceRank-1; x >= newSquare.rank; x--){
					// console.log(board[file[bishopfile]+x]);
					//IF END OF LOOP, CHECK CAPTURE
					if(x == newSquare.rank){
						//IF CAPTURE
						if (newSquare.piece && newSquare.piece.color != piece.color){
							console.log("CAPTURE PIECE!")
							return "Capture";
						}
					}
					if(board[file[bishopfile]+x].piece != null){
						console.log("Piece here!");
						return false;
					}
					else {
						bishopfile +=1;
					}
				}
			}
			else if (newSquare.rank > pieceRank && file.indexOf(newSquare.file) < file.indexOf(piece.square[0])){
				var bishopfile = file.indexOf(piece.square[0])-1;	
				for (x = pieceRank+1; x <= newSquare.rank; x++){
					// console.log(board[file[bishopfile]+x]);
					//IF END OF LOOP, CHECK CAPTURE
					if(x == newSquare.rank){
						//IF CAPTURE
						if (newSquare.piece && newSquare.piece.color != piece.color){
							console.log("CAPTURE PIECE!")
							return "Capture";
						}
					}
					if(board[file[bishopfile]+x].piece != null){
						console.log("Piece here!");
						return false;
					}
					else {
						bishopfile -=1;
					}
				}
			}
			else if (newSquare.rank > pieceRank && file.indexOf(newSquare.file) > file.indexOf(piece.square[0])){
				var bishopfile = file.indexOf(piece.square[0])+1;	
				for (x = pieceRank+1; x <= newSquare.rank; x++){
					// console.log(board[file[bishopfile]+x]);
					//IF END OF LOOP, CHECK CAPTURE
					if(x == newSquare.rank){
						//IF CAPTURE
						if (newSquare.piece && newSquare.piece.color != piece.color){
							console.log("CAPTURE PIECE!")
							return "Capture";
						}
					}
					if(board[file[bishopfile]+x].piece != null){
						console.log("Piece here!");
						return false;
					}
					else {
						bishopfile +=1;
					}
				}
			}
			//ELSE
			return true;
		}
	}

	if (!exclude.includes("Bishop")){
		
		if (piece.name.includes("Bishop")){

			//IF WRONG COLOR SQUARE
			if (newSquare.color != board[piece.square].color){
				return false;
			}

			// console.log(newSquare.rank - pieceRank);
			// console.log(file.indexOf(newSquare.file) - file.indexOf(piece.square[0]))

			if (bishopMove() == false){
				return false;
			}
			else if (bishopMove() == "Capture"){
				return "Capture";
			}
			// ELSE
			console.log("GOOD MOVE!");
			return true;
		}
	}	

	// QUEEN
	if (!exclude.includes("Queen")){
		if (piece.name.includes("Queen") && !piece.name.includes("Queens")){
			if (rookMove() == true){
				console.log("GOOD MOVE!");
				return true;
			}
			else if (rookMove() == "Capture"){
				console.log("ROOK CAPTURE!");
				return "Capture";
			}
			else if (bishopMove() == true){
				console.log("GOOD MOVE!");
				return true;
			}
			else if (bishopMove() == "Capture"){
				console.log("BISHOP CAPTURE!");
				return "Capture";
			}
			
			//ELSE
			console.log("ILLEGAL MOVE!");
			return false;
		}
	}

	//KING
	if (piece.name.includes("King") && !piece.name.includes("Kings")){
		if (player.castle == true){
			if (player == white){
				if (piece.square == "e1"){
					if (newSquare.file+newSquare.rank == "g1"){
						return "CastleShort"
					}
					else if (newSquare.file+newSquare.rank == "c1"){
						return "CastleLong"
					}		
				}	
			}
			else if (player == black){
				if (piece.square == "e8"){
					if (newSquare.file+newSquare.rank == "g8"){
						return "CastleShort"
					}
					else if (newSquare.file+newSquare.rank == "c8"){
						return "CastleLong"
					}		
				}	
			}
		}

		if (Math.abs(newSquare.rank - (pieceRank)) > 1){
			return false;
		}	
		else if (Math.abs((file.indexOf(piece.square[0])) - file.indexOf(newSquare.file)) > 1){
			return false;
		}

		if (newSquare.piece != null){
			if (newSquare.piece.color != player.color){
				console.log("CAPTURE PIECE!")
				return "Capture";
			}	
			else {
				console.log("Piece here")
				return false;
			}
		}	

		else {
			console.log("GOOD MOVE!");
			player.castle = false;
			return true;
		}
	}
};

//GET TARGET SQUARES FOR EVERY PIECE!

//FOR QUEENS BISHOPS ROOKS - IF PIECE OF TARGET SQUARE = KING, THEN ADD SQUARE AND CONTINUE ADDING SQUARES AFTER IT.

function targetSquares(color){

	var pieces = Object.keys(color.pieces)

	for (let key of pieces){

		let piece = color.pieces[key];
		piece.targetSquares = [];
		let pieceFile = file.indexOf(piece.square[0]);
		let pieceRank = parseInt(piece.square[1]);


		//WHITE PAWNS

		if (piece.name.includes("Pawn") && piece.color == "white"){
			//GET LEGAL MOVES

			piece.legalMoves = [];

			//FIRST PAWN MOVE
			if (pieceRank == 2){
				if (board[file[pieceFile]+(pieceRank+1)].piece == null){
					piece.legalMoves.push(file[pieceFile]+(pieceRank+1), file[pieceFile]+(pieceRank+2));
				}
			}
			//SUBSEQUENT PAWN MOVES
			else {
				if (pieceRank > 2){
					if (board[file[pieceFile]+(pieceRank+1)].piece == null){
						piece.legalMoves.push(file[pieceFile]+(pieceRank+1));
					}
				}
			}


			// console.log(piece.name, piece.color)
			if (board[(file[pieceFile+1])+(pieceRank+1)] != null){
				if (board[(file[pieceFile+1])+(pieceRank+1)].piece != null && board[(file[pieceFile+1])+(pieceRank+1)].piece.color != piece.color){
					piece.targetSquares.push(board[(file[pieceFile+1])+(pieceRank+1)]);
				}
				else if (board[(file[pieceFile+1])+(pieceRank+1)].piece == null){
					piece.targetSquares.push(board[(file[pieceFile+1])+(pieceRank+1)]);
					}
				}
			if (board[(file[pieceFile-1])+(pieceRank+1)] != null){
				if (board[(file[pieceFile-1])+(pieceRank+1)].piece != null && board[(file[pieceFile-1])+(pieceRank+1)].piece.color != piece.color){
					piece.targetSquares.push(board[(file[pieceFile-1])+(pieceRank+1)]);
				}
				else if (board[(file[pieceFile-1])+(pieceRank+1)].piece == null){
					piece.targetSquares.push(board[(file[pieceFile-1])+(pieceRank+1)]);
				}
			}
		}

		//BLACK PAWNS

		if (piece.name.includes("Pawn") && piece.color == "black"){

			piece.legalMoves = [];

			//FIRST PAWN MOVE
			if (pieceRank == 7){
				if (board[file[pieceFile]+(pieceRank-1)].piece == null){
					piece.legalMoves.push(file[pieceFile]+(pieceRank-1), file[pieceFile]+(pieceRank-2));
				}
			}
			//SUBSEQUENT PAWN MOVES
			else {
				if (pieceRank < 7){
					if (board[file[pieceFile]+(pieceRank-1)].piece == null){
						piece.legalMoves.push(file[pieceFile]+(pieceRank-1));
					}
				}
			}

			// console.log(piece.name, piece.color)
			if (board[(file[pieceFile+1])+(pieceRank-1)] != null){
				if (board[(file[pieceFile+1])+(pieceRank-1)].piece != null && board[(file[pieceFile+1])+(pieceRank-1)].piece.color != piece.color){
					piece.targetSquares.push(board[(file[pieceFile+1])+(pieceRank-1)]);
				}
				else if (board[(file[pieceFile+1])+(pieceRank-1)].piece == null){
					piece.targetSquares.push(board[(file[pieceFile+1])+(pieceRank-1)]);
					}
				}
			if (board[(file[pieceFile-1])+(pieceRank-1)] != null){
				if (board[(file[pieceFile-1])+(pieceRank-1)].piece != null && board[(file[pieceFile-1])+(pieceRank-1)].piece.color != piece.color){
					piece.targetSquares.push(board[(file[pieceFile-1])+(pieceRank-1)]);
				}
				else if (board[(file[pieceFile-1])+(pieceRank-1)].piece == null){
					piece.targetSquares.push(board[(file[pieceFile-1])+(pieceRank-1)]);
				}
			}
		}

		//ROOK	

		function rookSquares(){
			// GET FILE SQUARES GOING UP
			for (let y = pieceRank+1; y<=8; y++){
				if (board[(file[pieceFile])+y] != null && board[(file[pieceFile])+y].piece == null){
					piece.targetSquares.push(board[(file[pieceFile])+y])
				}
				else if (board[(file[pieceFile])+y].piece != null){
					if (board[(file[pieceFile])+y].piece.name === "King" && board[(file[pieceFile])+y].piece.color != piece.color){
						piece.targetSquares.push(board[(file[pieceFile])+y])
					}
					else if (board[(file[pieceFile])+y].piece.color != piece.color){
						piece.targetSquares.push(board[(file[pieceFile])+y])
						y = 9;
					}
					else {
						y = 9;
					}
				}
			}
			// GET FILE SQUARES GOING DOWN
			for (let y = pieceRank-1; y>=1; y--){
				if (board[(file[pieceFile])+y] != null && board[(file[pieceFile])+y].piece == null){
					piece.targetSquares.push(board[(file[pieceFile])+y])
				}
				else if (board[(file[pieceFile])+y].piece != null){
					if (board[(file[pieceFile])+y].piece.name === "King" && board[(file[pieceFile])+y].piece.color != piece.color){
						piece.targetSquares.push(board[(file[pieceFile])+y])
					}
					else if (board[(file[pieceFile])+y].piece.color != piece.color){
						piece.targetSquares.push(board[(file[pieceFile])+y])
						y=0;
					}
					else {
						y=0;
					}
				}
			}
			// GET RANK SQUARES GOING RIGHT
			for (let x = pieceFile+1; x<=7; x++){
				if (board[(file[x])+pieceRank] != null && board[(file[x])+pieceRank].piece == null){
					piece.targetSquares.push(board[(file[x])+pieceRank])
				}
				else if (board[(file[x])+pieceRank].piece != null){
					if (board[(file[x])+pieceRank].piece.name === "King" && board[(file[x])+pieceRank].piece.color != piece.color){
						piece.targetSquares.push(board[(file[x])+pieceRank])
					}
					else if (board[(file[x])+pieceRank].piece.color != piece.color){
						piece.targetSquares.push(board[(file[x])+pieceRank])
						x=8;
					}
					else {
						x=8;
					}
				}
			}
			// GET RANK SQUARES GOING LEFT
			for (let x = pieceFile-1; x>=0; x--){
				if (board[(file[x])+pieceRank] != null && board[(file[x])+pieceRank].piece == null){
					piece.targetSquares.push(board[(file[x])+pieceRank])
				}
				else if (board[(file[x])+pieceRank].piece != null){
					if (board[(file[x])+pieceRank].piece.name === "King" && board[(file[x])+pieceRank].piece.color != piece.color){
						piece.targetSquares.push(board[(file[x])+pieceRank])
					}
					else if (board[(file[x])+pieceRank].piece.color != piece.color){
						piece.targetSquares.push(board[(file[x])+pieceRank])
						x=-1;
					}
					else {
						x=-1;
					}
				}
			}
		}

		if (piece.name.includes("Rook") && !piece.name.includes("Pawn")){
			rookSquares();
		}

		//BISHOP

		function bishopSquares(){
			//UP AND RIGHT
			let x = pieceFile+1
			let y = pieceRank+1

			let boolean = true;
			while (boolean == true){
				if (board[(file[x])+y] != null) {
					if (board[(file[x])+y].piece == null){
						piece.targetSquares.push(board[(file[x])+y])
						x+=1;
						y+=1;
					}
					else if (board[(file[x])+y].piece != null){
						if (board[(file[x])+y].piece.name === "King" && board[(file[x])+y].piece.color != piece.color){
							piece.targetSquares.push(board[(file[x])+y]);
							x+=1;
							y+=1;
						}
						else if (board[(file[x])+y].piece.color != piece.color){
							piece.targetSquares.push(board[(file[x])+y]);
							boolean=false;
						}
						else {
							boolean=false;
						}
					}
				}
				else{
					boolean = false;
				}	
			}

			//UP AND LEFT
			x = pieceFile-1
			y = pieceRank+1

			boolean = true;
			while (boolean == true){
				if (board[(file[x])+y] != null) {
					if (board[(file[x])+y].piece == null){
						piece.targetSquares.push(board[(file[x])+y])
						x-=1;
						y+=1;
					}
					else if (board[(file[x])+y].piece != null){
						if (board[(file[x])+y].piece.name === "King" && board[(file[x])+y].piece.color != piece.color){
							piece.targetSquares.push(board[(file[x])+y]);
							x-=1;
							y+=1;
						}
						else if (board[(file[x])+y].piece.color != piece.color){
							piece.targetSquares.push(board[(file[x])+y]);
							boolean=false;
						}
						else {
							boolean=false;
						}
					}
				}
				else{
					boolean = false;
				}	
			}

			//DOWN AND LEFT
			x = pieceFile-1
			y = pieceRank-1

			boolean = true;
			while (boolean == true){
				if (board[(file[x])+y] != null) {
					if (board[(file[x])+y].piece == null){
						piece.targetSquares.push(board[(file[x])+y])
						x-=1;
						y-=1;
					}
					else if (board[(file[x])+y].piece != null){
						if (board[(file[x])+y].piece.name === "King" && board[(file[x])+y].piece.color != piece.color){
							piece.targetSquares.push(board[(file[x])+y]);
							x-=1;
							y-=1;
						}
						else if (board[(file[x])+y].piece.color != piece.color){
							piece.targetSquares.push(board[(file[x])+y]);
							boolean=false;
						}
						else {
							boolean=false;
						}
					}
				}
				else{
					boolean = false;
				}	
			}

			//DOWN AND RIGHT
			x = pieceFile+1
			y = pieceRank-1

			boolean = true;
			while (boolean == true){
				if (board[(file[x])+y] != null) {
					if (board[(file[x])+y].piece == null){
						piece.targetSquares.push(board[(file[x])+y])
						x+=1;
						y-=1;
					}
					else if (board[(file[x])+y].piece != null){
						if (board[(file[x])+y].piece.name === "King" && board[(file[x])+y].piece.color != piece.color){
							piece.targetSquares.push(board[(file[x])+y]);
							x+=1;
							y-=1;
						}
						else if (board[(file[x])+y].piece.color != piece.color){
							piece.targetSquares.push(board[(file[x])+y]);
							boolean=false;
						}
						else {
							boolean=false;
						}
					}
				}
				else{
					boolean = false;
				}	
			}
		}

		if (piece.name.includes("Bishop") && !piece.name.includes("Pawn")){
			bishopSquares();
		}

		//KNIGHT
		if (piece.name.includes("Knight") && !piece.name.includes("Pawn")){
			//CHECK LEFT2 AND UP/DOWN1
			for (x = pieceFile-2; x<= pieceFile+2; x++){
				if (x==pieceFile){
					continue;
				}
				if (Math.abs(x - pieceFile)%2 == 0){
					for (y = pieceRank + 1; y >= pieceRank-1; y--){
						if (board[(file[x])+y] != null) {
							if (board[(file[x])+y].piece == null){
								piece.targetSquares.push(board[(file[x])+y])
								y -=1
							}							
							else if (board[(file[x])+y].piece != null){
								if (board[(file[x])+y].piece.color != piece.color){
									piece.targetSquares.push(board[(file[x])+y])
									y -=1
								}
								else {
									y -=1
								}
							}
						}
						else {
							y -=1
						}
					}			
				}
				else {
					for (y = pieceRank + 2; y >= pieceRank-2; y--){
						if (board[(file[x])+y] != null) {
							if (board[(file[x])+y].piece == null){
								piece.targetSquares.push(board[(file[x])+y])
								y -=3
							}
							else if (board[(file[x])+y].piece != null){
								if (board[(file[x])+y].piece.color != piece.color){
									piece.targetSquares.push(board[(file[x])+y])
									y -=3
								}
								else {
									y -=3
								}
							}
						}
						else {
							y -=3
						}
					}
				}
			}
		}

		//QUEEN
		if (piece.name.includes("Queen") && !piece.name.includes("Queens")){
			bishopSquares();
			rookSquares();
		}

		//KING	
		if (piece.name.includes("King") && !piece.name.includes("Kings")){
			for (let y = pieceFile-1; y <= pieceFile+1; y++){
				for (let x = pieceRank-1; x <= pieceRank+1; x++){
					if (y <= 7 && y >= 0){
						if (x <= 8 && x >= 1){
							// console.log(file[y]+x);
							if (board[file[y]+x].piece == null){
								piece.targetSquares.push(file[y]+x);
							}	
							else if (board[file[y]+x].piece != null && board[file[y]+x].piece.color != piece.color){
								piece.targetSquares.push(file[y]+x);
							}
						}	
					}
				}
			}
			//CROSS REFERENCE WITH OPPOSITE COLORED TARGET SQUARES
		}
	}	
}							

//CHECK IF MATE!

function checkMate(){
	// turn = nextTurn();
	console.log("CHECKING MATE")
	let checkmate = false;
	var enemyPieces = Object.keys(nextTurn().pieces)
	var playerPieces = Object.keys(turn.pieces)

	if (turn.inCheck == true){
		// console.log(turn);
		var king = turn.pieces["King"];

		//DETERMINE IF FREE KINGSQUARES ARE TARGETS OF ENEMY PIECES

		for (let square of king.targetSquares){
			let safeSquare = false;
			for (let somePiece of enemyPieces){
				// console.log(nextTurn().pieces[somePiece].targetSquares);
				// console.log(square);
				if (nextTurn().pieces[somePiece].targetSquares.includes(board[square])){
					// console.log("SQUARE NOT SAFE");
					safeSquare = true;
				}
				else if (nextTurn().pieces[somePiece].square == square){
					// console.log(nextTurn().pieces[somePiece].name+" IS ON "+square)
					safeSquare = true;
				}
				else {
					// console.log(nextTurn().pieces[somePiece].name+" IS NOT ATTACKING FREE KING SQAURE: "+square)
				}
			}
			if (safeSquare == false){
				console.log("SAFE SQUARE");
				safeSquare = false;
				return false;
			}
		}

		//DETERMINE IF ANY PIECES' TARGET SQUARES ARE TARGET SQUARES OF ENEMY PIECES PUTTING KING IN CHECK 
		
		for (let somePiece of enemyPieces){

			// console.log("HERE")

			//FIND CHECKING PIECES

			if (nextTurn().pieces[somePiece].checking == true){

				let checkingPiece = nextTurn().pieces[somePiece];

				// console.log(checkingPiece);

				//LOOP THRU ALL OTHER PIECES

				for (let someOtherPiece of playerPieces){

					// console.log(turn.pieces[someOtherPiece])

					//DETERMINE IF CHECKING PIECE CAN BE CAPTURED
					//CHECK IF TARGET SQUARE OF DEFENDING PIECE IS EQUAL TO CHECKING PIECE SQUARE

					for (let someSquare of turn.pieces[someOtherPiece].targetSquares){

						//LOOP THRU SQUARES OF EACH DEFENDING PIECE

						if (someSquare == board[checkingPiece.square]){

							//DETERMINE IF CAPTURE OF PIECE LEADS TO CHECK OF KING

							let moveThisPiece = movePiece(turn.pieces[someOtherPiece], board[checkingPiece.square], turn, true, checkingPiece, true);
							if (moveThisPiece == false){
								console.log("CANNOT BE CAPTURED");
								checkmate = true;
							}
							else {
								console.log("CAN BE CAPTURED");
								checkmate = false;
								return false;
							}
						}
					}

					//if any target squares or legal pawn moves contain any same square as checking pieces target squares
					//AND this move does not put king in check

					//BLOCKING

					if (turn.pieces[someOtherPiece].name.includes("Pawn")){
						var commonSquares = _.intersection(checkingPiece.targetSquares, turn.pieces[someOtherPiece].legalMoves);
					}
					else {
						var commonSquares = _.intersection(checkingPiece.targetSquares, turn.pieces[someOtherPiece].targetSquares);
					}

					if (commonSquares.length > 0){
						//Loop thru common squares
						for (let x of commonSquares){
							console.log(commonSquares, x)
							//someOtherPiece can block somePiece(checking)
							//Make copies of players and board
							// var tempBoard = $.extends(true, {}, board);
							// var tempWhite = $.extends(true, new Player("white"), white);
							// var tempBlack = $.extends(true, new Player("black"), black);	
							//Make blocking move and check if king is in check after
							let moveThisPiece = movePiece(turn.pieces[someOtherPiece], x, turn, true, "null", true);
							if (moveThisPiece == false){
								console.log("CANNOT BE BLOCKED");
								checkmate = true;
							}
							else {
								console.log("CAN BE BLOCKED");
								checkmate = false;
								return false;
							}
						}

					}
				}
			}
		}

		if (checkmate == true){
			console.log("CHECKMATE!")
			return true;
		}
	}
	else if (turn.inCheck == false){
		//CHECK IF ANY PIECE HAS LEGAL PAWN MOVES OR TARGET SQUARES
		//IF NONE THEN STALEMATE
		for (let somePiece of playerPieces){
			if (turn.pieces[somePiece].name.includes("Pawn")){
				if (turn.pieces[somePiece].legalMoves.length != 0){
					return false;
				}
			}
			else if (turn.pieces[somePiece].name !== "King"){
				if (turn.pieces[somePiece].targetSquares.length != 0){
					return false;
				}	
			}
			else if (turn.pieces[somePiece].name === "King"){
				if (turn.pieces[somePiece].targetSquares.length != 0){
					//CHECK IF TARGET SQUARE MOVE LEADS TO MATE
					for (let square of turn.pieces[somePiece].targetSquares){
						if (square.piece != null){
							var moveThisPiece = movePiece(turn.pieces[somePiece], board[square], turn, true, square.piece, true);
						}
						else {
							var moveThisPiece = movePiece(turn.pieces[somePiece], board[square], turn, true, "null", true);
						}
						if (moveThisPiece == true){
							console.log("SAFE SQUARE")
							return false;
						}
					}
					console.log("STALEMATE!")
					return "Stalemate";	
				}
				else {
					console.log("STALEMATE!")
					return "Stalemate";
				}
			}
		}
	}	
}

//
//INITIALIZE
//

function initializeGame(){
	createBoard();
	createPiecesForColor(white);
	createPiecesForColor(black);
	populateBoard(white);
	populateBoard(black);
	targetSquares(white);
	targetSquares(black);
	readyMove();
}

function setMessages(){
	$("#messages").html("");
	if (turn == white){
		checkTurn = "white";
	}
	else {
		checkTurn = "black";
	}
	if (playerColor == checkTurn){
		if (turn.inCheck == true){
			$("#messages").html("<h1>You're in check!</h1>")
		}
		else{
			$("#messages").html("<h1>Your move!</h1>")
		}
	}
	else {
		if (nextTurn().inCheck == true){
			$("#messages").html("<h1>Opponent in check!</h1>")
		}
		else {
			$("#messages").html("<h1>Opponent's move!</h1>")
		}
	}
	if (gameReady == false){
		$("#messages").html("<h1>CHECKMATE!</h1>")	
	}
}

//
//DB QUERY FUNCTIONS
//

function readyMove(){
	getGameData((game)=>{
		
		// console.log(game);
		setMessages();
		if (gameReady == false){
			console.log("GAME OVER!")		
		}
		else{
			console.log("PLAYER COLOR :", playerColor);
			$("#player").html("<h1>Playing as "+playerColor+"</h1>");
			setListeners();
		}
	});
}

function setListeners(){
	if (gameReady == true){
		console.log("Enable drag");
		enableDrag();
	}
	$("#board > div").mousedown(downListener).mouseup(upListener);
}

function getGameData(cb){
	gameId = window.location.href.split("/");
	gameId = gameId[gameId.length-1]
	$.get('http://'+ipaddress+'/game/get/'+gameId, function(data){
		console.log(data[0]);

		let game = data[0]

		if (game.moveList == null){
			console.log("New Game!");
			clearBoard();
			populateBoard(white);
			populateBoard(black);
			targetSquares(white);
			targetSquares(black);
		}
		else {
			//UNPARSE DATA FROM DB
			game = CircularJSON.parse(data[0].moveList);
			updateGame(game);
		}
		cb(game);
	});
}

function postGameData(data, cb){
	// console.log("UNPARSED: ", data);
	// console.log("PARSED: ", CircularJSON.parse(data))

	//PARSE GAME DATA TO SEND MONGODB ALONG WITH UNPARSED KEY

	parsedData = CircularJSON.parse(data);
	gameDataToSendToMongoDB = {"_id": parsedData._id, "unparsedData": data}
	$.post('http://'+ipaddress+'/game/update/', gameDataToSendToMongoDB, function(data){
		// console.log("POST GAME DATA :", data);
		cb(data);
	});
}

function updateGame(game){
	// game = CircularJSON.parse(game);

	//SET LOCAL VARS TO GAME DATA FROM DB

	moveList = game.moveList;
	white = game.moveList.tail.white;
	black = game.moveList.tail.black;
	board = game.moveList.tail.board;
	gameReady = game.moveList.tail.gameReady;
	moveNumber = game.moveList.tail.moveNumber;
	if (game.moveList.tail.turn == "white"){
		turn = white;
	}
	else {
		turn = black;
	}

	//UPDATE EVERYTHING WITH NEW LOCAL VARS

	clearBoard();
	populateBoard(white);
	populateBoard(black);
	console.log("GET GAME DATA BOARD: ", board);
	targetSquares(white);
	targetSquares(black);
	//CHANGE "" BACK TO NULL FOR PIECES
	refactorBoardNull();
	setMessages();
}


//DRAG FUNCTIONS

function enableDrag(){
	var keys = Object.keys(board)
	for (let key of keys){
		if (board[key].piece != null){
			if (board[key].piece.color == "white"){
				$("#White"+board[key].piece.name).draggable();
			}
			if (board[key].piece.color == "black"){
				$("#Black"+board[key].piece.name).draggable();
			}
		}
	}
}

function disableDrag(){
	var keys = Object.keys(board)
	for (let key of keys){
		if (board[key].piece != null){
			if (board[key].piece.color == "white"){
				$("#White"+board[key].piece.name).draggable('disable');
			}
			if (board[key].piece.color == "black"){
				$("#Black"+board[key].piece.name).draggable('disable');
			}
		}
	}
}

//
//LISTENER FUNCTIONS
//

function downListener (down){

	if (gameReady == true){

		// GET PIECE

		if ($(this).attr("id").includes("White")) {
			piece = white.pieces[$(this).attr("id").split("White")[1]];
			player = white;
		}
		else if ($(this).attr("id").includes("Black")) {
			piece = black.pieces[$(this).attr("id").split("Black")[1]];
			player = black;
		}

		//GET MOUSEDOWN COORDINATES

		console.log("PIECE:", piece)
		ogX = down.clientX;
		ogY = down.clientY;

	}

	else {
		console.log("GAME OVER!")
		piece = null;
		player = null;
	}
}

function upListener (e){

	if (gameReady == true){	

		if (turn == white){
			checkTurn = "white";
		}
		else {
			checkTurn = "black";
		}

		console.log(playerColor, checkTurn)
		if (playerColor != checkTurn){
			console.log("NOT YOUR TURN!");
			readyMove();
			return;
		}

		// console.log(e);
		

		// GET OFFSET RANK AND FILE AMOUNTS OF MOUSE UP

		offsetX = Math.round((ogX - e.clientX) / 30 / 2);
		offsetY = Math.round((ogY - e.clientY) / 30 / 2);
		// console.log(ogX, ogY, offsetX, offsetY);

		//GET TARGET SQUARE

		var newSquare = file[(file.indexOf(piece.square[0]) - offsetX)] + (parseInt(piece.square[1]) + offsetY);
		newSquare = board[newSquare];
		//MAKE SURE MOVE IS ON THE BOARD
		if (newSquare == undefined){
			console.log("ILLEGAL MOVE!")
			updateBoard(piece, board[piece.square]);
			return;
		}

		//IF SAME SQUARE DO NOTHING	

		if (newSquare == board[piece.square]){
			console.log("SAME SQUARE!!!!")
			updateBoard(piece, board[piece.square]);
			return;
		}

		// console.log(newSquare);
		
		// RUN RULES CHECK

		let move = checkMove(piece, newSquare, player, true, "null");

		if (move == true){
			console.log("GOOD MOVE");
			let moveThisPiece = movePiece(piece, newSquare, player, true, "null");
			if (moveThisPiece == true){
				updateBoard(player.pieces[piece.name], newSquare);
				if (kingCheck(nextTurn(), player, false, "null") == true){
					console.log("IN CHECK!")
					nextTurn().inCheck = true;
					turn = nextTurn();
				}
				else {
					console.log("NOT IN CHECK!")
					turn.inCheck = false;
					turn = nextTurn();
				}
				
			}
			else {
				console.log("ILLEGAL MOVE!!!!")
				updateBoard(piece, board[piece.square]);
				return;
			}
		}
		else if (move == false){
			console.log("ILLEGAL MOVE");
			updateBoard(piece, board[piece.square]);
			return;
		}
		else if (move == "Capture"){
			console.log("CAPTURE!!!");
			let ogNewSquare = $.extend({}, newSquare);
			let moveThisPiece = movePiece(piece, newSquare, player, true, newSquare.piece);
			if (moveThisPiece == true){
				capturePiece(ogNewSquare, player);
				updateBoard(piece, board[piece.square]);
				if (kingCheck(nextTurn(), player, false, "null") == true){
					console.log("IN CHECK!")
					nextTurn().inCheck = true;
					turn = nextTurn();
				}
				else {
					console.log("NOT IN CHECK!")
					turn.inCheck = false;
					turn = nextTurn();
				}
				
			}
			else{
				console.log("ILLEGAL MOVE");
				updateBoard(piece, board[piece.square]);
				return;
			}
		}
		else if (move == "CastleShort"){
			console.log("CASTLE!")
			castleShort(player);
			player.castle = false;
			turn = nextTurn();
			
		}
		else if (move == "CastleLong"){
			console.log("CASTLE!")
			castleLong(player);
			player.castle = false;
			turn = nextTurn();
			
		}

		console.log(turn);
		targetSquares(white);
		targetSquares(black);

		//CHECK FOR MATE

		mate = checkMate()
		if (mate == true || mate === "Stalemate"){
			gameReady = false;
			disableDrag();
		}
		if (turn == black){
			moveNumber+=1;	
		}

		//SAVE MOVE
		console.log(piece, newSquare, move, mate)
		saveMove(moveList, piece, newSquare, move, mate);

		//SEND GAME DATA
		data = {"_id": gameId, "moveList": moveList}
		// console.log("INTERFACE :", moveList);
		$('[ng-controller="Ctrl"]').scope().sendMove(CircularJSON.stringify(data));
		return;
	}
	
	else {
		console.log("GAME OVER!")
	}
}	

var playerDiv = $("#player").html();

// $(document).ready(function(){

// })	

