export const hideMenu = () => {
  const menu = document.getElementById("menu");
  if (menu) {
    menu.style.display = "none"; // Hide the menu
    console.log("Menu hidden successfully");
  } else {
    console.error("Menu element not found");
  }
};

export const showMenu = () => {
  const menu = document.getElementById("menu");
  if (menu) {
    menu.style.display = "block"; // Show the menu
    console.log("Menu shown successfully");
  } else {
    console.error("Menu element not found");
  }
};

// Start the experience and hide the menu when the experience starts
export const startExperience = (controls) => {
  console.log("Starting gallery experience...");
  
  // With OrbitControls, we don't need to lock the pointer
  // Just hide the menu and let the user interact with the 3D scene
  hideMenu();
  
  // Enable controls
  if (controls) {
    controls.enabled = true;
    console.log("Controls enabled");
  }
  
  // Add visual feedback
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    loadingScreen.style.display = "none";
  }
};

export const setupPlayButton = (controls) => {
  const playButton = document.getElementById("play-button");
  if (playButton) {
    console.log("Play button found, adding event listener");
    playButton.addEventListener("click", () => {
      console.log("Play button clicked!");
      startExperience(controls);
    });
  } else {
    console.error("Play button not found!");
  }
};
