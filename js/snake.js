var occupiedTiles = [];
var currentDirection = "";

initialize();
setInterval(function () {
  update();
}, 100);

function initialize() {
  setTileAsOccupied(40);
  occupiedTiles.push(40);
  setDirection('RIGHT');
  document.onkeydown = checkKey;
}

function setTileAsOccupied(tileId){
  document.getElementById(tileId.toString()).className = "occupied-tile";
}

function setTileAsClear(tileId){
  document.getElementById(tileId.toString()).className = "clear-tile";
}

function setDirection(direction){
  currentDirection = direction;
}

function update(){
  var nextTileId = getNextTileId();
  occupiedTiles.push(nextTileId);
  console.log(nextTileId);
  setTileAsOccupied(nextTileId);
  var tailId = occupiedTiles.shift();
  setTileAsClear(tailId);
}

function getNextTileId(){
  var headId = occupiedTiles[occupiedTiles.length - 1];
  console.log(headId);
  switch (currentDirection) {
    case 'RIGHT':
      if(headId % 10 == 9){
        nextId = headId - 9;
      } else {
        nextId = headId + 1;
      }
      break;
    case 'LEFT':
      if(headId % 10 == 0){
        nextId = headId + 9;
      } else {
        nextId = headId - 1;
      }
      break;
    case 'UP':
      if(Math.floor(headId / 10) == 0){
        nextId = headId + 90;
      } else {
        nextId = headId - 10;
      }
      break;
    case 'DOWN':
      if(Math.floor(headId / 10) == 9){
        nextId = headId - 90;
      } else {
        nextId = headId + 10;
      }
      break;

    default:

  }
  return nextId;
}

function checkKey(e) {
  switch (e.keyCode) {
       //Left
       case 37:
           if(currentDirection != 'RIGHT') setDirection('LEFT');
           break;
      //Up
       case 38:
           if(currentDirection != 'DOWN') setDirection('UP');
           break;
      //Right
       case 39:
           if(currentDirection != 'LEFT') setDirection('RIGHT');
           break;
       //Down
       case 40:
           if(currentDirection != 'UP') setDirection('DOWN');
           break;
       default:
   }
}
