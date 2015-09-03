var occupiedTiles = [];
var nextDirection = "";
var currentDirection = "";
var NUMBEROFROWS = 20;
var NUMBEROFCOLLUMNS = 20;
initialize();
setInterval(function () {
   update();
}, 300);

function initialize() {
  createMap();
  var initialTile = {x:0, y:0};
  occupiedTiles.push(initialTile);
  setTileAsOccupied(initialTile);
  setNextDirection('RIGHT');
  document.onkeydown = checkKey;
}

function createMap() {
  for (var i = 0; i < NUMBEROFROWS; i++) {
    for (var j = 0; j < NUMBEROFCOLLUMNS; j++) {
      var newDiv = document.createElement("div");
      newDiv.className = "clear-tile"
      newDiv.id = (j.toString() + ',' + i.toString());
      document.body.appendChild(newDiv);
    }
    var newBr = document.createElement("br");
    document.body.appendChild(newBr);
  }
}

function setTileAsOccupied(tile){
  document.getElementById(tile.x.toString() + ',' + tile.y.toString()).className = "occupied-tile";
}

function setTileAsClear(tile){
  document.getElementById(tile.x.toString() + ',' + tile.y.toString()).className = "clear-tile";
}

function setNextDirection(direction){
  nextDirection = direction;
}

function update(){
  currentDirection = nextDirection;
  var nextTile = getNextTile();
  occupiedTiles.push(nextTile);
  setTileAsOccupied(nextTile);
  var tailTile = occupiedTiles.shift();
  setTileAsClear(tailTile);
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
       default:
   }
}
