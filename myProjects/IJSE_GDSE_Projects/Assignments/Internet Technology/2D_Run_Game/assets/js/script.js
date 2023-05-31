function key(event) {
  //Enter
  if (event.which == 13) {
    if (rw == 0) {
      fId = f();
      rw = setInterval(run, 100);
      rs.play();
      bw = setInterval(b, 100);
      sw = setInterval(updateScore, 100);
      fw = setInterval(move, 100);
    }
  }

  //Space
  if (event.which == 32) {
    if (jw == 0) {
      clearInterval(rw);
      rs.pause();
      rw = -1;
      jw = setInterval(jump, 100);
      js.play();
    }
  }
}

var fId = 0;
var m = 700;
function f() {
  for (var y = 0; y < 10; y++) {
    var i = document.createElement("img");
    i.src = "assets/images/flame.gif";
    i.className = "f";
    i.style.marginLeft = m + "px";
    i.id = "a" + y;
    m = m + 500;
    document.getElementById("b").appendChild(i);
  }
}

var rw = 0;
var r = 1;
function run() {
  var rImg = document.getElementById("boy");
  r = r + 1;
  if (r == 9) {
    r = 1;
  }

  rImg.src = "assets/images/Run (" + r + ").png";
}

var bw = 0;
var x = 1;
function b() {
  x = x - 20;
  document.getElementById("b").style.backgroundPositionX = x + "px";
}

var sw = 0;
var u = 0;
function updateScore() {
  u = u + 5;
  document.getElementById("score").innerHTML = u;
}

var fw = 0;
function move() {
  for (var i = 0; i < 10; i++) {
    var d = document.getElementById("a" + i);
    var z = getComputedStyle(d);
    var p = parseInt(z.marginLeft);
    p = p - 20;
    d.style.marginLeft = p + "px";
    /*  alert(p); */

    if ((p > 60) & (p < 180)) {
      if (mt > 300) {
        clearInterval(rw);
        rs.pause();
        clearInterval(jw);
        jw = -1;
        clearInterval(sw);
        clearInterval(bw);
        clearInterval(fw);

        dw = setInterval(dead, 100);
        ds.play();
      }
    }
  }
}

var mt = 390;
var jw = 0;
var j = 1;
function jump() {
  var jImg = document.getElementById("boy");
  //1-6 jump images
  if (j <= 6) {
    mt = mt - 30;
  }
  //7-12 jump images
  if (j >= 7) {
    mt = mt + 30;
  }

  jImg.style.marginTop = mt + "px";

  j = j + 1;
  if (j == 13) {
    j = 1;
    clearInterval(jw);
    jw = 0;

    rw = setInterval(run, 100);
    rs.play();

    /* GAME WORKING WHEN SPACE CLICK TO GAME START */
    if (bw == 0) {
      bw = setInterval(b, 100);
    }

    if (fId == 0) {
      fId = f();
    }

    if (fw == 0) {
      fw = setInterval(move, 100);
    }

    if (sw == 0) {
      sw = setInterval(updateScore, 100);
    }

    /* /GAME WORKING WHEN SPACE CLICK TO GAME START */
  }
  jImg.src = "assets/images/Jump (" + j + ").png";
}

var dw = 0;
var d = 1;
function dead() {
  var dImg = document.getElementById("boy");
  d = d + 1;
  if (d == 11) {
    d = 10;
    dImg.style.marginTop = "390px";
    document.getElementById("end").style.visibility = "visible";
    document.getElementById("endScore").innerHTML = u;
  }
  dImg.src = "assets/images/Dead (" + d + ").png";
}

function re() {
  location.reload();
}

var rs = new Audio("assets/audio/run.mp3");
rs.loop = true;

var js = new Audio("assets/audio/jump.mp3");
var ds = new Audio("assets/audio/dead.mp3");
