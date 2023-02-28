let canvas;
let world;
let keyboard = new Keyboard();
let soundActivated = true;
let gameRunning = false;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  ctx = canvas.getContext("2d");
}

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

function muteOrUnmute() {
  let icon = document.getElementById("sound");
  if (soundActivated) {
    soundActivated = false;
    icon.src = "img/muted.png";
  } else {
    soundActivated = true;
    icon.src = "img/loud.png";
  }
}

function playOrPause() {
  let startscreen = document.getElementById("startscreen");
  let buttonImg = document.getElementById("playbutton");
  if (gameRunning) {
    buttonImg.src = "img/play.png";
    gameRunning = false;
    startscreen.classList.remove("d-none");
  } else {
    gameRunning = true;
    buttonImg.src = "img/pause.png";
    startscreen.classList.add("d-none");
  }
}

function toggleFullscreen() {
  let gamebox = document.getElementById("gamebox");
  let startscreen = document.getElementById("startscreen");
  let screenicon = document.getElementById("size");

  if (!document.fullscreenElement) {
    enterFullscreen(gamebox, startscreen, screenicon);
  } else {
    exitFullscreenMode(startscreen, screenicon);
  }
}

function enterFullscreen(gamebox, startscreen, screenicon) {
  gamebox.requestFullscreen();
  canvas.classList.add("fullscreen");
  startscreen.classList.add("fullscreen");
  screenicon.src = "img/minimize.png";
}

function exitFullscreenMode(startscreen, screenicon) {
  document.exitFullscreen();
  canvas.classList.remove("fullscreen");
  startscreen.classList.remove("fullscreen");
  screenicon.src = "img/fullscreen.png";
}
