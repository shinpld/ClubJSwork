function init(){

	/// init TableValue
	tableValue = [];
	for(var c=1; c<=4; c++){
		tableValue[c] = [];
		for(var c2=1; c2<=4; c2++){
			tableValue[c][c2] = 0;
		}
	}
	
	/// init Dom Elements
	var MGO = document.getElementById("my-game-div");

	DomScoreBox = document.getElementById("score-box");
	
	DomTable = [];

	for(var c=1; c<=4; c++){
		DomTable[c] = [];
		var row = MGO.getElementsByClassName("row"+c)[0];
		for(var c2=1; c2<=4; c2++){
			var col = row.getElementsByClassName("col"+c2)[0];
			DomTable[c][c2] = col;
		}
	}

	document.addEventListener('keydown', myKeyDownFunc);

	function myKeyDownFunc(event) {
		pressingKey(event.keyCode);
	}
	
	startup();
	
	renderGame();
}

/// Game Data Keeping
var tableValue, score = 0;

/// DOM Elements
var DomTable, DomScoreBox;

init();

function startup(){
	spawn();
}

function spawn(){
	function randomIntFromTo(from, to){
		return Math.floor(Math.random()*(to-from) + from);
	}
	
	var foundZero = 0;
	for(var c=1; c<=4; c++){
		for(var c2=1; c2<=4; c2++){
			if(tableValue[c][c2] == 0){
				foundZero++;
			}
		}
	}
	
	if(foundZero == 0){
		return false;
	}
	
	var newTwoPosition = randomIntFromTo(1, foundZero);
	
	for(var c=1; c<=4; c++){
		for(var c2=1; c2<=4; c2++){
			if(tableValue[c][c2] == 0){
				newTwoPosition--;
				if(newTwoPosition == 0){
					tableValue[c][c2] = 2;
					return true;
				}
			}
		}
	}
	
	throw new Error("BAKA, Oniichan, you got out of the loop.");
}

function pressingKey(keyCode){
	if(keyCode == 38){
		input("Up");
	}
	if(keyCode == 39){
		input("Right");
	}
	if(keyCode == 40){
		input("Down");
	}
	if(keyCode == 37){
		input("Left");
	}
	renderGame();
}

function input(direction){
	console.log(direction);
	if(direction == "Right"){
		move(1, 0);
	}
	if(direction == "Left"){
		move(-1, 0);
	}
	if(direction == "Up"){
		move(0, -1);
	}
	if(direction == "Down"){
		move(0, 1);
	}
	spawn();
}

function move(x, y){
	
	function inRange(value){
		return value >= 1 && value <= 4;
	}
	
	var isMoving = true;
	while(isMoving){
		isMoving = false;
		for(var c=1; c<=4; c++){
			for(var c2=1; c2<=4; c2++){
				if( inRange(c+y) && inRange(c2+x) &&
					tableValue[c][c2] != 0 && tableValue[c+y][c2+x] == 0 ){
					var temp = tableValue[c][c2];
					tableValue[c][c2] = tableValue[c+y][c2+x];
					tableValue[c+y][c2+x] = temp;
					isMoving = true;
				}
			}
		}
	}
}

function renderGame(){
	
	DomScoreBox.innerHTML = "Score : " + score;

	for(var c=1; c<=4; c++){
		for(var c2=1; c2<=4; c2++){
			DomTable[c][c2].innerHTML = tableValue[c][c2];
		}
	}
}