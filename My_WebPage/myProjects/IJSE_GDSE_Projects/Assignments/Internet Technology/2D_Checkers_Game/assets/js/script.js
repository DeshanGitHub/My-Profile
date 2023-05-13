/* STORAGE EVENTS OF PLAYER */
var id_OnDrop=0;



function getId(id){
  console.log(id);
  id_OnDrop=id;
}

/* CREATE THE TABLE */
function createCheckersTable() {
  var squareId = 0;
  var squareStyle = "yellowSquare";
  var divId = 1;

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      var div = document.createElement("div");
      div.className = squareStyle;
      div.id = squareId;
      div.ondrag=getId(this.id);
      document.getElementById("d" + divId).append(div);

      if (squareStyle == "yellowSquare") {
        squareStyle = "brownSquare";
      } else {
        squareStyle = "yellowSquare";
      }

      console.log(squareId);
      squareId++;
    }

    divId = divId + 1;

    if (squareStyle == "yellowSquare") {
      squareStyle = "brownSquare";
    } else {
      squareStyle = "yellowSquare";
    }
  }
}

/* STARTING POINT */
function startGame() {
  createCheckersTable();
}
