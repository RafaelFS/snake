initialize();
setTimeout(function () {
  update();
  draw();
}, 10);

function initialize() {
  setTileAsOccupied('40');
  setDirection('Left');
}



function setTileAsOccupied(tileId){
  document.getElementById(tileId).className = "occupied-tile";
}

function
