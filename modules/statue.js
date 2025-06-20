import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import { GUI } from "lil-gui";

// Store references to loaded statues for animation
export const statues = [];

// Function to navigate camera to a specific position
export const navigateToObject = (camera, controls, targetPosition, targetRotation = null) => {
  if (!controls || !controls.target) {
    console.warn("Controls or controls.target is undefined. Navigation skipped.");
    return;
  }

  const originalPosition = camera.position.clone();
  const originalTarget = controls.target.clone();

  // Calculate offset direction: from object toward room center (0, y, 0)
  const center = new THREE.Vector3(0, targetPosition.y, 0);
  let direction = center.clone().sub(targetPosition).normalize();
  if (direction.length() === 0) direction = new THREE.Vector3(0, 0, -1); // fallback
  const offset = direction.multiplyScalar(5).add(new THREE.Vector3(0, 2, 0));
  let targetCameraPosition = targetPosition.clone().add(offset);

  // Clamp camera position to stay inside the room (x/z in [-18, 18], y in [1, 9])
  targetCameraPosition.x = Math.max(-18, Math.min(18, targetCameraPosition.x));
  targetCameraPosition.y = Math.max(1, Math.min(9, targetCameraPosition.y));
  targetCameraPosition.z = Math.max(-18, Math.min(18, targetCameraPosition.z));

  // Clamp target position as well
  let clampedTarget = targetPosition.clone();
  clampedTarget.x = Math.max(-18, Math.min(18, clampedTarget.x));
  clampedTarget.y = Math.max(0, Math.min(9, clampedTarget.y));
  clampedTarget.z = Math.max(-18, Math.min(18, clampedTarget.z));

  const duration = 2000;
  const startTime = Date.now();

  const animateCamera = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const easedProgress = easeInOutCubic(progress);

    camera.position.lerpVectors(originalPosition, targetCameraPosition, easedProgress);
    controls.target.lerpVectors(originalTarget, clampedTarget, easedProgress);
    controls.update();

    if (progress < 1) {
      requestAnimationFrame(animateCamera);
    }
  };

  animateCamera();
};

export const loadStatueModel = (scene, camera, controls) => {
  const gltfLoader = new GLTFLoader();
  const gui = new GUI();

  // Model configurations with real-world scaling, positioning, and detailed descriptions
  const modelConfigs = [
    {
      name: "Australopithecus Afarensis (Lucy)",
      path: "/models/statue/australopithecus_afarensis_lucycrane_et_mand..glb",
      position: { x: 0, y: 0, z: 0 }, // Center position
      scale: 1.5,
      rotation: { x: 0, y: 0, z: 0 },
      realWorldHeight: 1.2,
      rotationSpeed: 0.2,
      animationType: "rotate",
      description: "Lucy, discovered in 1974 in Ethiopia, is one of the most complete early hominin fossils ever found. Dating back 3.2 million years, she represents Australopithecus afarensis, a key species in human evolution. Lucy walked upright but still had some ape-like features, providing crucial evidence for the transition from tree-dwelling to ground-dwelling hominins.",
      historicalContext: "Lucy's discovery revolutionized our understanding of human evolution, showing that bipedalism evolved before large brain size. She was found in the Afar region of Ethiopia by paleoanthropologist Donald Johanson.",
      significance: "This fossil represents a crucial link in human evolution, showing the transition from ape-like ancestors to more human-like forms.",
      era: "3.2 million years ago",
      location: "Afar Region, Ethiopia"
    },
    {
      name: "Lalibela Rock-Hewn Churches",
      path: "/models/statue/lalibela.glb",
      position: { x: -15, y: 0, z: -15 },
      scale: 1.2,
      rotation: { x: 0, y: Math.PI / 4, z: 0 },
      realWorldHeight: 2.0,
      rotationSpeed: 0.3,
      animationType: "rotate",
      description: "The rock-hewn churches of Lalibela are among the most remarkable architectural achievements of medieval Ethiopia. Carved directly into solid rock in the 12th-13th centuries, these 11 churches represent a unique form of monolithic architecture. The complex includes the famous Church of St. George (Bete Giyorgis), shaped like a cross.",
      historicalContext: "Built during the reign of King Lalibela (1181-1221), these churches were created as a 'New Jerusalem' for Ethiopian Christians who could not make the pilgrimage to the Holy Land due to Muslim conquests.",
      significance: "UNESCO World Heritage site representing the pinnacle of Ethiopian rock-cut architecture and religious devotion.",
      era: "12th-13th century",
      location: "Lalibela, Amhara Region, Ethiopia"
    },
    {
      name: "Mystical Snake Statue",
      path: "/models/statue/snake_statue.glb",
      position: { x: 15, y: 0, z: -15 },
      scale: 1.5,
      rotation: { x: 0, y: -Math.PI / 4, z: 0 },
      realWorldHeight: 1.5,
      rotationSpeed: 0.4,
      animationType: "float",
      description: "This mystical snake statue represents the deep spiritual and cultural significance of serpents in Ethiopian mythology and religious traditions. Snakes are often associated with wisdom, protection, and the connection between earthly and spiritual realms in Ethiopian culture.",
      historicalContext: "Snake symbolism appears throughout Ethiopian art and religious texts, often representing divine wisdom and the protective aspects of nature.",
      significance: "Represents the rich mythological traditions and spiritual beliefs of Ethiopian culture.",
      era: "Traditional Ethiopian Art",
      location: "Ethiopian Cultural Heritage"
    },
    {
      name: "Ibex Statue from Berlin Tierpark",
      path: "/models/statue/ibex_statue_scan_-_berlin_-_tierpark.glb",
      position: { x: -12, y: 0, z: 12 },
      scale: 1.0,
      rotation: { x: 0, y: Math.PI / 2, z: 0 },
      realWorldHeight: 1.8,
      rotationSpeed: 0.2,
      animationType: "bounce",
      description: "This graceful ibex statue represents the Nubian ibex, a species native to the mountainous regions of Ethiopia and surrounding areas. The ibex is known for its impressive curved horns and ability to navigate steep, rocky terrain with remarkable agility.",
      historicalContext: "Ibex have been important in Ethiopian culture for thousands of years, appearing in rock art and serving as symbols of strength and adaptability in harsh mountain environments.",
      significance: "Represents the diverse wildlife of Ethiopia's mountainous regions and the cultural importance of native species.",
      era: "Contemporary Wildlife Art",
      location: "Ethiopian Highlands"
    },
    {
      name: "Traditional Ethiopian Shield",
      path: "/models/statue/ethiopian_shield_a.1958.5.2.glb",
      position: { x: 12, y: 0, z: 12 },
      scale: 1.3,
      rotation: { x: 0, y: -Math.PI / 2, z: 0 },
      realWorldHeight: 1.2,
      rotationSpeed: 0.5,
      animationType: "spin",
      description: "This traditional Ethiopian shield represents the rich martial traditions of Ethiopia. Made from leather and decorated with intricate patterns, such shields were used by Ethiopian warriors throughout history, including during the resistance against Italian colonization.",
      historicalContext: "Ethiopian shields have a long history dating back to ancient times, with different regions developing distinct styles and decorative patterns.",
      significance: "Symbolizes Ethiopian military traditions and the country's successful resistance against European colonization.",
      era: "19th-20th century",
      location: "Ethiopian Highlands"
    },
    {
      name: "Traditional Coffee Cup (Jebena)",
      path: "/models/statue/ethiopian_coffee_cup.glb",
      position: { x: 0, y: 0, z: 18 },
      scale: 2.0,
      rotation: { x: 0, y: 0, z: 0 },
      realWorldHeight: 0.8,
      rotationSpeed: 0.6,
      animationType: "rotate",
      description: "The Jebena is the traditional Ethiopian coffee pot used in the elaborate coffee ceremony, a central part of Ethiopian culture and social life. Coffee was first discovered in Ethiopia, and the ceremony represents hospitality, community, and cultural identity.",
      historicalContext: "According to legend, coffee was discovered by an Ethiopian goat herder named Kaldi in the 9th century. The coffee ceremony has been practiced for centuries and remains a vital part of Ethiopian social customs.",
      significance: "Represents Ethiopia's status as the birthplace of coffee and the importance of coffee culture in Ethiopian society.",
      era: "Traditional Ethiopian Culture",
      location: "Ethiopia (Birthplace of Coffee)"
    }
  ];

  // Load each model
  modelConfigs.forEach((config) => {
    gltfLoader.load(config.path, (gltf) => {
      const statue = gltf.scene;
      
      // Calculate proper scale based on real-world dimensions
      const box = new THREE.Box3().setFromObject(statue);
      const size = box.getSize(new THREE.Vector3());
      const height = size.y;
      
      // Calculate scale factor to match real-world height
      const scaleFactor = (config.realWorldHeight / height) * config.scale;
      statue.scale.set(scaleFactor, scaleFactor, scaleFactor);
      
      // Recalculate bounding box after scaling
      box.setFromObject(statue);
      const newSize = box.getSize(new THREE.Vector3());
      
      // Position on floor (y = 0 is floor level)
      statue.position.set(
        config.position.x,
        newSize.y / 2, // Place bottom on floor
        config.position.z
      );
      
      statue.rotation.set(
        config.rotation.x,
        config.rotation.y,
        config.rotation.z
      );

      // Add shadows and improve materials
      statue.traverse(child => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Enhance materials if they exist
          if (child.material) {
            child.material.envMapIntensity = 1.0;
            child.material.needsUpdate = true;
          }
        }
      });

      // Store statue reference with config for animation and interaction
      const statueData = {
        object: statue,
        config: config,
        isAnimating: true,
        animationTime: 0,
        originalPosition: statue.position.clone(),
        originalRotation: statue.rotation.clone(),
        originalScale: statue.scale.clone()
      };
      statues.push(statueData);

      scene.add(statue);

      // Add GUI controls
      const statueFolder = gui.addFolder(config.name);
      statueFolder.add(statue.position, "x", -20, 20).name("X Position");
      statueFolder.add(statue.position, "y", -1, 5).name("Y Position");
      statueFolder.add(statue.position, "z", -20, 20).name("Z Position");
      statueFolder.add(statue.scale, "x", 0.1, 3).name("X Scale").onChange(v => {
        statue.scale.y = v;
        statue.scale.z = v;
      });
      statueFolder.add(statue.rotation, "y", -Math.PI, Math.PI).name("Rotation");
      
      // Add animation controls
      statueFolder.add(statueData, "isAnimating").name("Auto Animate");
      statueFolder.add(config, "rotationSpeed", 0, 2).name("Animation Speed");
      
      // Add animation type selector
      const animationTypes = ["rotate", "float", "bounce", "spin", "none"];
      statueFolder.add(config, "animationType", animationTypes).name("Animation Type");
      
      // Add navigation button
      statueFolder.add({
        navigateTo: () => {
          navigateToObject(camera, controls, statue.position);
          showDetailedInfo(config);
        }
      }, "navigateTo").name("Navigate to Object");
      
      // Add reset button
      statueFolder.add({
        resetPosition: () => {
          statue.position.copy(statueData.originalPosition);
          statue.rotation.copy(statueData.originalRotation);
          statue.scale.copy(statueData.originalScale);
        }
      }, "resetPosition").name("Reset Position");

      console.log(`${config.name} loaded. Actual height: ${newSize.y.toFixed(2)} units`);
    }, 
    (progress) => {
      console.log(`Loading ${config.name}: ${(progress.loaded / progress.total * 100).toFixed(1)}%`);
    },
    (error) => {
      console.error(`Error loading ${config.name}:`, error);
    });
  });
};

// Function to show detailed information about an object
export const showDetailedInfo = (config) => {
  const infoElement = document.getElementById("painting-info");
  if (infoElement) {
    infoElement.innerHTML = `
      <h3>${config.name}</h3>
      <p><strong>Description:</strong> ${config.description}</p>
      <p><strong>Historical Context:</strong> ${config.historicalContext}</p>
      <p><strong>Significance:</strong> ${config.significance}</p>
      <p><strong>Era:</strong> ${config.era}</p>
      <p><strong>Location:</strong> ${config.location}</p>
      <button onclick="this.parentElement.classList.remove('show')" style="margin-top: 10px; padding: 5px 10px; background: #667eea; color: white; border: none; border-radius: 3px; cursor: pointer;">Close</button>
    `;
    infoElement.classList.add("show");
  }
};

// Function to update statue animations
export const updateStatueRotations = (deltaTime) => {
  statues.forEach(statueData => {
    if (statueData.isAnimating && statueData.object) {
      const config = statueData.config;
      statueData.animationTime += deltaTime;
      
      switch (config.animationType) {
        case "rotate":
          // Simple rotation around Y-axis
          statueData.object.rotation.y += config.rotationSpeed * deltaTime;
          break;
          
        case "float":
          // Floating up and down motion
          const floatHeight = Math.sin(statueData.animationTime * 2) * 0.3;
          statueData.object.position.y = statueData.originalPosition.y + floatHeight;
          statueData.object.rotation.y += config.rotationSpeed * deltaTime * 0.5;
          break;
          
        case "bounce":
          // Bouncing motion
          const bounceHeight = Math.abs(Math.sin(statueData.animationTime * 3)) * 0.4;
          statueData.object.position.y = statueData.originalPosition.y + bounceHeight;
          statueData.object.rotation.y += config.rotationSpeed * deltaTime;
          break;
          
        case "spin":
          // Fast spinning motion
          statueData.object.rotation.y += config.rotationSpeed * deltaTime * 3;
          // Add some wobble
          statueData.object.rotation.x = Math.sin(statueData.animationTime * 4) * 0.1;
          break;
          
        case "none":
          // No animation
          break;
      }
    }
  });
};

// Function to add interactive effects
export const addStatueInteractions = (camera, scene, controls) => {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  const onMouseClick = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    
    // Check for statue intersections
    const statueMeshes = statues.map(s => s.object).flatMap(statue => {
      const meshes = [];
      statue.traverse(child => {
        if (child.isMesh) meshes.push(child);
      });
      return meshes;
    });
    
    const intersects = raycaster.intersectObjects(statueMeshes, true);
    
    if (intersects.length > 0) {
      // Find which statue was clicked
      const clickedMesh = intersects[0].object;
      const clickedStatue = statues.find(s => {
        let found = false;
        s.object.traverse(child => {
          if (child === clickedMesh) found = true;
        });
        return found;
      });
      
      if (clickedStatue) {
        // Navigate to the statue and show detailed info
        navigateToObject(camera, controls, clickedStatue.object.position);
        showDetailedInfo(clickedStatue.config);
        
        // Add visual feedback
        clickedStatue.object.scale.setScalar(clickedStatue.originalScale.x * 1.2);
        setTimeout(() => {
          clickedStatue.object.scale.copy(clickedStatue.originalScale);
        }, 200);
        
        console.log(`${clickedStatue.config.name} clicked! Showing detailed information.`);
      }
    }
  };
  
  window.addEventListener('click', onMouseClick);
  
  // Add hover effects
  const onMouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    
    const statueMeshes = statues.map(s => s.object).flatMap(statue => {
      const meshes = [];
      statue.traverse(child => {
        if (child.isMesh) meshes.push(child);
      });
      return meshes;
    });
    
    const intersects = raycaster.intersectObjects(statueMeshes, true);
    
    if (intersects.length > 0) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }
  };
  
  window.addEventListener('mousemove', onMouseMove);
};
