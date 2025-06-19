import { keysPressed } from "./movement.js"; // import the keysPressed object
import { showMenu, hideMenu } from "./menu.js"; // import the showMenu function
import { startAudio, stopAudio } from "./audioGuide.js";

export const setupEventListeners = (controls, camera, scene) => {
  // Add keyboard event listeners
  document.addEventListener("keydown", (event) => onKeyDown(event, controls), false);
  document.addEventListener("keyup", (event) => onKeyUp(event, controls), false);

  // Add event listeners for the audio guide buttons
  const startAudioBtn = document.getElementById("start_audio");
  const stopAudioBtn = document.getElementById("stop_audio");
  
  if (startAudioBtn) {
    startAudioBtn.addEventListener("click", startAudio);
  }
  if (stopAudioBtn) {
    stopAudioBtn.addEventListener("click", stopAudio);
  }

  // Add UI event listeners
  setupUIEventListeners();
};

function onKeyDown(event, controls) {
  // Handle movement keys
  if (event.key in keysPressed) {
    keysPressed[event.key] = true;
  }

  // Handle special keys
  switch (event.key.toLowerCase()) {
    case "escape":
    case "m":
      showMenu();
      break;
      
    case "enter":
    case "return":
      hideMenu();
      break;
      
    case " ":
      // Toggle auto-rotation
      controls.autoRotate = !controls.autoRotate;
      break;
      
    case "g":
      startAudio();
      break;
      
    case "h":
      stopAudio();
      break;
      
    case "r":
      // Reset camera position
      controls.reset();
      break;
      
    case "q":
      // Rotate camera left
      controls.rotateLeft(0.1);
      break;
      
    case "e":
      // Rotate camera right
      controls.rotateRight(0.1);
      break;
      
    case "+":
    case "=":
      // Zoom in
      controls.dollyIn(1.1);
      controls.update();
      break;
      
    case "-":
      // Zoom out
      controls.dollyOut(1.1);
      controls.update();
      break;
  }
}

function onKeyUp(event, controls) {
  // Handle movement keys
  if (event.key in keysPressed) {
    keysPressed[event.key] = false;
  }
}

function setupUIEventListeners() {
  // Info panel toggle
  const toggleInfoBtn = document.getElementById("toggle-info");
  const infoPanel = document.getElementById("info-panel");
  
  if (toggleInfoBtn && infoPanel) {
    toggleInfoBtn.addEventListener("click", () => {
      infoPanel.classList.toggle("collapsed");
      toggleInfoBtn.innerText = infoPanel.classList.contains("collapsed") ? "Show" : "Hide";
    });
  }

  // About overlay
  const aboutBtn = document.getElementById("about_button");
  const aboutOverlay = document.getElementById("about-overlay");
  const closeAboutBtn = document.getElementById("close-about");
  
  if (aboutBtn && aboutOverlay) {
    aboutBtn.addEventListener("click", () => {
      aboutOverlay.classList.add("show");
    });
  }
  
  if (closeAboutBtn && aboutOverlay) {
    closeAboutBtn.addEventListener("click", () => {
      aboutOverlay.classList.remove("show");
    });
  }
  
  // Close about overlay when clicking outside
  if (aboutOverlay) {
    aboutOverlay.addEventListener("click", (event) => {
      if (event.target === aboutOverlay) {
        aboutOverlay.classList.remove("show");
      }
    });
  }
}
