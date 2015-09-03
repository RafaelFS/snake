var mapTiles = [];
var occupiedTiles = [];
var foodTiles = [];
var nextDirection = "";
var currentDirection = "";
var NUMBEROFROWS = 20;
var NUMBEROFCOLLUMNS = 20;
var currentState = "RUNNING"

initialize();
setInterval(function () {
  switch (currentState) {
    case "RUNNING":
      update();
      break;
    case "PAUSED":
      break;
    case "GAMEOVER":
      finishGame();
      break;
    default:

  }

}, 100);

function initialize() {
  createMap();
  var initialTile = {x:0, y:0};
  setTileAsOccupied(initialTile);
  setTileAsOccupied({x:initialTile.x + 1, y:initialTile.y}); //Added for initial snake size to be 2 tiles
  setNextDirection('RIGHT');
  document.onkeydown = checkKey;
  placeNewFood();
}

function createMap() {
  for (var i = 0; i < NUMBEROFROWS; i++) {
    mapTiles[i] = [];
    for (var j = 0; j < NUMBEROFCOLLUMNS; j++) {
      var newDiv = document.createElement("div");
      newDiv.className = "clear-tile"
      newDiv.id = (j.toString() + ',' + i.toString());
      mapTiles[i].push(newDiv);
      document.body.appendChild(newDiv);
    }
    var newBr = document.createElement("br");
    document.body.appendChild(newBr);
  }
}

function getDivForTile(tile){
  return document.getElementById(tile.x.toString() + ',' + tile.y.toString());
}

function setTileAsOccupied(tile){
  occupiedTiles.push(tile);
  getDivForTile(tile).className = "occupied-tile";
}

function setTileAsClear(tile){
  getDivForTile(tile).className = "clear-tile";
}

function setTileAsFood(tile){
  getDivForTile(tile).className = "food-tile";
}

function setTileAsGameOver(tile){
  getDivForTile(tile).className = "game-over-tile";
}

function setNextDirection(direction){
  nextDirection = direction;
}

function update(){
  currentDirection = nextDirection;
  var nextTile = getNextTile();
  if(isPartOfSnake(nextTile)){
    currentState = "GAMEOVER"
  } else{
    if(isFood(nextTile)){
      placeNewFood();
    } else {
      var tailTile = occupiedTiles.shift();
      setTileAsClear(tailTile);
    }
    setTileAsOccupied(nextTile);
  }
}

function getNextTile(){
  var headTile = occupiedTiles[occupiedTiles.length - 1];
  switch (currentDirection) {
    case 'RIGHT':
      if(headTile.x == NUMBEROFCOLLUMNS - 1){
        var next = {x:0, y:headTile.y};
      } else {
        var next = {x:headTile.x+1, y:headTile.y};
      }
      break;
    case 'LEFT':
      if(headTile.x == 0){
        var next = {x:NUMBEROFCOLLUMNS - 1, y:headTile.y};
      } else {
        var next = {x:headTile.x - 1, y:headTile.y};
      }
      break;

    case 'UP':
      if(headTile.y == 0){
        var next = {x:headTile.x, y:NUMBEROFROWS - 1};
      } else {
        var next = {x:headTile.x, y:headTile.y - 1};
      }
      break;

    case 'DOWN':
      if(headTile.y == NUMBEROFROWS - 1){
        var next = {x:headTile.x, y:0};
      } else {
        var next = {x:headTile.x, y:headTile.y + 1};
      }
      break;

    default:

  }
  return next;
}

function checkKey(e) {
  switch (e.keyCode) {
       //Left
       case 37:
           if(currentDirection != 'RIGHT') setNextDirection('LEFT');
           break;
      //Up
       case 38:
           if(currentDirection != 'DOWN') setNextDirection('UP');
           break;
      //Right
       case 39:
           if(currentDirection != 'LEFT') setNextDirection('RIGHT');
           break;
       //Down
       case 40:
           if(currentDirection != 'UP') setNextDirection('DOWN');
           break;
      //Space
       case 32:
           if(currentState == 'RUNNING'){
             currentState = 'PAUSED'
           } else if (currentState == 'PAUSED') {
              currentState = 'RUNNING'
           }
       default:
   }
}

function placeNewFood() {
  var tile;
  do {
    var randomx = Math.floor(Math.random()*NUMBEROFCOLLUMNS);
    var randomy = Math.floor(Math.random()*NUMBEROFROWS);
    tile = ({x:randomx, y:randomy});
  } while (isPartOfSnake(tile));
  setTileAsFood(tile);
}

function isFood(tile){
  return (getDivForTile(tile).className == "food-tile");
}

function isPartOfSnake(tile){
  return (getDivForTile(tile).className == "occupied-tile");
}

function finishGame(){
  for (var i = 0; i < NUMBEROFROWS; i++) {
    for (var j = 0; j < NUMBEROFCOLLUMNS; j++) {
      var tile = {x:j, y:i};
      setTileAsGameOver(tile);
    }
  }
}
