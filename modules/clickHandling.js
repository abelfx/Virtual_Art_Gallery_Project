import * as THREE from "three";
import { displayPaintingInfo } from "./paintingInfo.js";

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

// Function to navigate camera to a specific position and face the painting
const navigateToPainting = (camera, controls, painting) => {
  if (!controls || !controls.target) {
    console.warn(
      "Controls or controls.target is undefined. Navigation skipped."
    );
    return;
  }

  // Calculate the normal vector (facing direction) of the painting
  const normal = new THREE.Vector3(0, 0, 1); // Default normal for PlaneGeometry
  painting.getWorldDirection(normal); // This gives the facing direction in world space

  // Calculate the target camera position: offset from the painting along its normal
  const offsetDistance = 6; // Distance in front of the painting
  const targetPosition = painting.position
    .clone()
    .add(normal.multiplyScalar(offsetDistance));
  targetPosition.y = painting.position.y + 1.5; // Eye-level height

  // Store original position for smooth transition
  const originalPosition = camera.position.clone();
  const originalTarget = controls.target.clone();

  // Animate camera movement
  const duration = 2000; // 2 seconds
  const startTime = Date.now();

  const animateCamera = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easedProgress = easeInOutCubic(progress);

    camera.position.lerpVectors(
      originalPosition,
      targetPosition,
      easedProgress
    );
    controls.target.lerpVectors(
      originalTarget,
      painting.position,
      easedProgress
    );
    controls.update();

    if (progress < 1) {
      requestAnimationFrame(animateCamera);
    }
  };

  animateCamera();
};

// Function to show detailed information about a painting
const showDetailedPaintingInfo = (paintingInfo) => {
  const infoElement = document.getElementById("painting-info");
  if (infoElement) {
    infoElement.innerHTML = `
      <h3>${paintingInfo.title}</h3>
      <p><strong>Artist:</strong> ${paintingInfo.artist}</p>
      <p><strong>Description:</strong> ${paintingInfo.description}</p>
      <p><strong>Historical Context:</strong> ${
        paintingInfo.historicalContext || "Information not available"
      }</p>
      <p><strong>Significance:</strong> ${
        paintingInfo.significance || "Information not available"
      }</p>
      <p><strong>Year:</strong> ${paintingInfo.year}</p>
      <button onclick="this.parentElement.classList.remove('show')" style="margin-top: 10px; padding: 5px 10px; background: #667eea; color: white; border: none; border-radius: 3px; cursor: pointer;">Close</button>
    `;
    infoElement.classList.add("show");
  }
};

function clickHandling(renderer, camera, paintings, controls) {
  renderer.domElement.addEventListener(
    "click",
    (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      onClick(camera, paintings, controls);
    },
    false
  );
}

function onClick(camera, paintings, controls) {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(paintings);
  if (intersects.length > 0) {
    const painting = intersects[0].object;
    const paintingInfo = painting.userData.info;
    // Navigate to the painting and show detailed info
    navigateToPainting(camera, controls, painting);
    // Use the lock mechanism so the info panel stays open
    displayPaintingInfo(paintingInfo, true, painting);
    // Add visual feedback
    const originalScale = painting.scale.clone();
    painting.scale.setScalar(originalScale.x * 1.1);
    setTimeout(() => {
      painting.scale.copy(originalScale);
    }, 200);
  }
}

export { clickHandling };
