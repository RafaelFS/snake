var occupiedTiles = [];
var currentDirection = "";

initialize();
setInterval(function () {
  update();
}, 500);

function initialize() {
  setTileAsOccupied('40');
  occupiedTiles.push('40');
  setDirection('Left');
}

function setTileAsOccupied(tileId){
  console.log(tileId);
  document.getElementById(tileId).className = "occupied-tile";
}

function setTileAsClear(tileId){
  document.getElementById(tileId).className = "clear-tile";
}

function setDirection(direction){
  currentDirection = direction;
}

function update(){
  var nextTileId = getNextTileId();
  occupiedTiles.push(nextTileId);
  setTileAsOccupied(nextTileId);
  console.log(nextTileId);
  var tailId = occupiedTiles.shift();
  setTileAsClear(tailId);
}

function getNextTileId(){
  var headId = occupiedTiles[occupiedTiles.length - 1];
  console.log(headId);
  return (Number(headId) + 1).toString();
}
