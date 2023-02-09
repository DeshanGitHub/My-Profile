/* CREATE THE TABLE */
function createCheckersTable() {
  var squareId = 0;
  var squareStyle = "yellowSquare";
  var divId = 1;

  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      document.getElementById("d" + divId).innerHTML +=
        "<div class=" + squareStyle + " id=" + squareId + "></div>";

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
