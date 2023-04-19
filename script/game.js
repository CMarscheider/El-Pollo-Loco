let canvas;
let world;
let keyboard = new Keyboard();
let soundActivated = true;
let gameRunning = false;

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  detectMobileDevice();
  touchEventsStart();
  touchEventsEnd();
}

function detectMobileDevice() {
  if (window.innerWidth < 750) {
    document.getElementById("mobileAlert").classList.remove("d-none");

    checkMobileOrientation();
  }
}

function checkMobileOrientation() {
  if (window.matchMedia("(orientation: landscape)").matches) {
    document.getElementById("mobileAlert").classList.remove("d-none");
    document.getElementById("fullscreenalert").classList.add("d-none");
  } else {
    document.getElementById("mobileAlert").classList.add("d-none");

    checkFullscreen();
    showMobileButtons();
  }
}

function checkFullscreen() {
  if (!document.fullscreenElement) {
    document.getElementById("fullscreenalert").classList.remove("d-none");
  }
}

function showMobileButtons() {
  document.getElementById("play-btns-container").classList.remove("d-none");
}

window.addEventListener("orientationchange", checkMobileOrientation);

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
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

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

function touchEventsStart() {
  document.getElementById("btn-left").addEventListener("touchstart", (ev) => {
    keyboard.LEFT = true;
    ev.preventDefault();
  });
  document.getElementById("btn-right").addEventListener("touchstart", (ev) => {
    keyboard.RIGHT = true;
    ev.preventDefault();
  });
  document.getElementById("btn-jump").addEventListener("touchstart", (ev) => {
    console.log("springen");
    keyboard.SPACE = true;
    ev.preventDefault();
  });
  document.getElementById("btn-throw").addEventListener("touchstart", (ev) => {
    keyboard.D = true;
    ev.preventDefault();
  });
}

function touchEventsEnd() {
  document.getElementById("btn-left").addEventListener("touchend", (ev) => {
    keyboard.LEFT = false;
    ev.preventDefault();
  });
  document.getElementById("btn-right").addEventListener("touchend", (ev) => {
    keyboard.RIGHT = false;
    ev.preventDefault();
  });
  document.getElementById("btn-jump").addEventListener("touchend", (ev) => {
    keyboard.SPACE = false;
    ev.preventDefault();
  });
  document.getElementById("btn-throw").addEventListener("touchend", (ev) => {
    keyboard.D = false;
    ev.preventDefault();
  });
}

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
  closeRestartOverlay();
  closeStartOverlay();
  initLevel();
  world = new World(canvas, keyboard);
}

function closeStartOverlay() {
  let buttonImg = document.getElementById("startBtn");
  startscreen.classList.add("slide-out-fwd-center");
  buttonImg.classList.add("d-none");
  resetClassInOverlay(startscreen);
}

function closeRestartOverlay() {
  let restartBtn = document.getElementById("restartBtn");
  restartBtn.classList.add("d-none");
  endscreen.classList.add("slide-out-fwd-center");
  resetClassInOverlay(endscreen);
}

function resetClassInOverlay(overlay) {
  setTimeout(() => {
    overlay.classList.add("d-none");
    overlay.classList.remove("slide-out-fwd-center");
  }, 700);
}

function toggleFullscreen() {
  let gamebox = document.getElementById("gamebox");
  let screenicon = document.getElementById("size");
  let startscreen = document.getElementById("startscreen");
  let endscreen = document.getElementById("endscreen");

  if (!document.fullscreenElement) {
    enterFullscreen(gamebox, screenicon, endscreen, startscreen);
  } else {
    exitFullscreenMode(gamebox, screenicon, endscreen, startscreen);
  }
}

function toggleInfo(infoStatus) {
  let infocontainer = document.getElementById("infocontainer");
  if (infoStatus == "false") {
    infocontainer.classList.remove("d-none");
  } else {
    infocontainer.classList.add("d-none");
  }
}

function enterFullscreen(gamebox, screenicon, endscreen, startscreen) {
  gamebox.requestFullscreen();
  canvas.classList.add("fullscreen");
  startscreen.classList.add("fullscreen");
  endscreen.classList.add("fullscreen");
  screenicon.src = "img/minimize.png";
}

function exitFullscreenMode(screenicon, endscreen, startscreen) {
  document.exitFullscreen();
  canvas.classList.remove("fullscreen");
  startscreen.classList.remove("fullscreen");
  endscreen.classList.remove("fullscreen");
  screenicon.src = "img/fullscreen.png";
}
