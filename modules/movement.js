import * as THREE from "three";

// object to hold the keys pressed
export const keysPressed = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  w: false,
  a: false,
  s: false,
  d: false,
};

// parameters we get from setupRendering where updateMovement is called. setupRendering gets the parameters from main.js
export const updateMovement = (delta, controls, camera, walls) => {
  const moveSpeed = 5 * delta; // moveSpeed is the distance the camera will move in one second. We multiply by delta to make the movement framerate independent.

  const previousPosition = camera.position.clone(); // clone the camera position and store it in previousPosition. We will use this to reset the camera position if there is a collision

  // Create movement vector
  const movement = new THREE.Vector3();
  
  // Handle forward/backward movement (W/S or Up/Down arrows)
  if (keysPressed.ArrowUp || keysPressed.w) {
    // Move forward relative to camera direction
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0; // Keep movement horizontal
    direction.normalize();
    movement.add(direction.multiplyScalar(moveSpeed));
  }
  if (keysPressed.ArrowDown || keysPressed.s) {
    // Move backward relative to camera direction
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0; // Keep movement horizontal
    direction.normalize();
    movement.add(direction.multiplyScalar(-moveSpeed));
  }
  
  // Handle left/right movement (A/D or Left/Right arrows)
  if (keysPressed.ArrowRight || keysPressed.d) {
    // Move right relative to camera direction
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0; // Keep movement horizontal
    direction.normalize();
    const rightVector = new THREE.Vector3();
    rightVector.crossVectors(camera.up, direction);
    movement.add(rightVector.multiplyScalar(moveSpeed));
  }
  if (keysPressed.ArrowLeft || keysPressed.a) {
    // Move left relative to camera direction
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0; // Keep movement horizontal
    direction.normalize();
    const rightVector = new THREE.Vector3();
    rightVector.crossVectors(camera.up, direction);
    movement.add(rightVector.multiplyScalar(-moveSpeed));
  }

  // Apply movement
  camera.position.add(movement);
  
  // Update controls target to maintain the same relative view
  if (controls && controls.target) {
    controls.target.add(movement);
  }

  // After the movement is applied, we check for collisions by calling the checkCollision function. If a collision is detected, we revert the camera's position to its previous position, effectively preventing the player from moving through walls.
  if (checkCollision(camera, walls)) {
    camera.position.copy(previousPosition); // reset the camera position to the previous position
    // Also reset the controls target
    if (controls && controls.target) {
      controls.target.sub(movement);
    }
  }
};

// checkCollision takes the camera and the walls as parameters and returns true if there is a collision and false if there isn't.
export const checkCollision = (camera, walls) => {
  const playerBoundingBox = new THREE.Box3(); // create a bounding box for the player
  const cameraWorldPosition = new THREE.Vector3(); // create a vector to hold the camera's world position
  camera.getWorldPosition(cameraWorldPosition); // get the camera's world position and store it in cameraWorldPosition. Note: The camera represents the player's position in our case.
  playerBoundingBox.setFromCenterAndSize(
    // set the playerBoundingBox to the camera's world position and size. The size is 1, 1, 1 because the camera is a single point.
    cameraWorldPosition, // center
    new THREE.Vector3(1, 1, 1) // size
  );

  for (let i = 0; i < walls.children.length; i++) {
    // loop through each wall
    const wall = walls.children[i]; // get the wall
    if (wall.BoundingBox && playerBoundingBox.intersectsBox(wall.BoundingBox)) {
      // check if the playerBoundingBox intersects with the wall's bounding box. If it does, return true.
      return true;
    }
  }

  return false; // if the playerBoundingBox doesn't intersect with any of the walls, return false.
};
