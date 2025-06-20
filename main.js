import * as THREE from "three";
import { scene, setupScene } from "./modules/scene.js";
import { createPaintings } from "./modules/paintings.js";
import { createWalls } from "./modules/walls.js";
import { setupLighting } from "./modules/lighting.js";
import { setupFloor } from "./modules/floor.js";
import { createCeiling } from "./modules/ceiling.js";
import { createBoundingBoxes } from "./modules/boundingBox.js";
import { setupRendering } from "./modules/rendering.js";
import { setupEventListeners } from "./modules/eventListeners.js";
import { addObjectsToScene } from "./modules/sceneHelpers.js";
import { setupPlayButton } from "./modules/menu.js";
import { clickHandling } from "./modules/clickHandling.js";
import { setupVR } from "./modules/VRSupport.js";
import { loadStatueModel, addStatueInteractions } from "./modules/statue.js";
import { loadCeilingLampModel } from "./modules/ceilingLamp.js";

// Error handling wrapper
const initializeGallery = async () => {
  try {
    // Update loading text
    const loadingText = document.getElementById("loading-text");
    if (loadingText) loadingText.textContent = "Setting up 3D scene...";

    // Setup scene with improved camera controls
    let { camera, controls, renderer } = setupScene();

    if (loadingText)
      loadingText.textContent = "Creating gallery environment...";
    // Create scene elements
    const textureLoader = new THREE.TextureLoader();
    const walls = createWalls(scene, textureLoader);
    const floor = setupFloor(scene);
    const ceiling = createCeiling(scene, textureLoader);
    const paintings = createPaintings(scene, textureLoader);
    const lighting = setupLighting(scene, paintings);

    if (loadingText)
      loadingText.textContent = "Creating collision detection...";
    // Create bounding boxes for collision detection
    createBoundingBoxes(walls);
    createBoundingBoxes(paintings);

    if (loadingText) loadingText.textContent = "Adding objects to scene...";
    // Add objects to scene
    addObjectsToScene(scene, paintings);

    if (loadingText) loadingText.textContent = "Setting up controls...";
    // Setup UI and controls
    setupPlayButton(controls);
    setupEventListeners(controls, camera, scene);
    clickHandling(renderer, camera, paintings, controls);

    if (loadingText) loadingText.textContent = "Loading 3D models...";
    // Load 3D models with camera and controls for navigation
    loadStatueModel(scene, camera, controls);
    loadCeilingLampModel(scene);

    if (loadingText) loadingText.textContent = "Setting up interactions...";
    // Setup statue interactions with camera and controls
    addStatueInteractions(camera, scene, controls);

    if (loadingText) loadingText.textContent = "Setting up VR support...";
    // Setup VR support
    setupVR(renderer);

    if (loadingText) loadingText.textContent = "Starting rendering...";
    // Setup rendering
    setupRendering(scene, camera, renderer, paintings, controls, walls);

    // Hide loading screen
    if (window.hideLoading) {
      window.hideLoading();
    }

    console.log("Virtual Art Gallery initialized successfully!");
    console.log("Controls:");
    console.log("- Mouse: Orbit camera");
    console.log("- WASD/Arrow Keys: Move camera");
    console.log("- Q/E: Rotate camera left/right");
    console.log("- +/-: Zoom in/out");
    console.log("- Space: Toggle auto-rotation");
    console.log("- R: Reset camera position");
    console.log("- ESC/M: Show menu");
    console.log("- Click on paintings: View information");
    console.log("- Click on Nefertiti bust: Toggle animation");
    console.log("- Click on statues: Navigate and view detailed information");
    console.log("Features:");
    console.log("- Realistic lighting with multiple light types");
    console.log("- Interactive 3D models with FBX loading");
    console.log("- Advanced camera controls with OrbitControls");
    console.log("- Raycasting for object selection");
    console.log("- GUI controls for all systems");
    console.log("- Multiple statue models with animations");
    console.log("- Navigation system to focus on specific objects");
    console.log("- Detailed information panels for all artifacts");
  } catch (error) {
    console.error("Error initializing gallery:", error);
    if (window.showError) {
      window.showError("Failed to initialize gallery: " + error.message);
    }
  }
};

// Start initialization
initializeGallery();
