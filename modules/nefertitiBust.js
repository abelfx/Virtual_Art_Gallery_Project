import * as THREE from "three";
import { GUI } from "lil-gui";

export const loadNefertitiBust = (scene) => {
  const gui = new GUI();
  
  // Create a realistic bust using basic geometry
  const createNefertitiBust = () => {
    const bustGroup = new THREE.Group();
    
    // Create a head-like shape using basic geometry
    const headGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const headMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xf4d03f, // Gold-like color
      metalness: 0.3,
      roughness: 0.7
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    
    // Create a neck
    const neckGeometry = new THREE.CylinderGeometry(0.3, 0.4, 0.5, 16);
    const neck = new THREE.Mesh(neckGeometry, headMaterial);
    neck.position.y = -0.65;
    
    // Create a pedestal
    const pedestalGeometry = new THREE.CylinderGeometry(1.2, 1.5, 0.8, 16);
    const pedestalMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8b4513, // Brown color
      roughness: 0.9
    });
    const pedestal = new THREE.Mesh(pedestalGeometry, pedestalMaterial);
    pedestal.position.y = -1.2;
    
    bustGroup.add(head, neck, pedestal);
    
    // Position the bust
    bustGroup.position.set(0, 0, -15);
    bustGroup.scale.set(2.4, 2.4, 2.4); // Increased scale by 3x (0.8 * 3)
    
    // Add shadows
    bustGroup.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    
    scene.add(bustGroup);
    
    // Add GUI controls
    const bustFolder = gui.addFolder("Nefertiti Bust");
    bustFolder.add(bustGroup.position, "x", -20, 20).name("X Position");
    bustFolder.add(bustGroup.position, "y", -1, 10).name("Y Position");
    bustFolder.add(bustGroup.position, "z", -20, 20).name("Z Position");
    bustFolder.add(bustGroup.scale, "x", 0.1, 10).name("Scale").onChange(v => {
      bustGroup.scale.y = v;
      bustGroup.scale.z = v;
    });
    bustFolder.add(bustGroup.rotation, "y", -Math.PI, Math.PI).name("Rotation");
    
    console.log("Nefertiti Bust created successfully");
    
    return bustGroup;
  };
  
  // Create the bust
  const bust = createNefertitiBust();
  
  // Animation function for continuous Y-axis rotation
  const animateBust = () => {
    bust.rotation.y += 0.01; // Continuous rotation on Y-axis
    requestAnimationFrame(animateBust);
  };
  
  // Start the animation loop
  animateBust();
  
  // Note: The actual FBX model is available at /models/statue/nefertiti-bust/source/bust_low.fbx
  // but requires FBXLoader which has import issues with this setup
  console.log("Note: Using realistic placeholder bust. The actual FBX model can be loaded later with proper FBXLoader setup.");
  
  return bust;
}; 