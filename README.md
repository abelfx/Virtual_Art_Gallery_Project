# 🎨 Virtual Art Gallery – Ethiopian Ancient History

An immersive 3D virtual art gallery built with **Three.js**, highlighting Ethiopia's rich cultural legacy through interactive models, realistic lighting, and VR support.

---

## 🚀 Setup Instructions

1. **Clone the Repository**
   ```sh
   git clone <your-repo-url>
   cd Virtual_Art_Gallery_Project
   ```
2. **Install Dependencies**
   ```sh
   npm install
   ```
3. **Start the Development Server**
   ```sh
   npm run dev
   # or
   npx vite
   ```
4. **Open in Browser**
   Visit [http://localhost:5173](http://localhost:5173) in your web browser.

---

## Live Demo

- **Demo 1**: [https://virtual-art-gallery-project.vercel.app](https://virtual-art-gallery-project.vercel.app)  
- **Demo 2**: [https://virtual-art-gallery-project-git-main-abelfxs-projects.vercel.app](https://virtual-art-gallery-project-git-main-abelfxs-projects.vercel.app)  
- **Demo 3**: [https://virtual-art-gallery-project-owfxqnf31-abelfxs-projects.vercel.app](https://virtual-art-gallery-project-owfxqnf31-abelfxs-projects.vercel.app)
  ![image](https://github.com/user-attachments/assets/6ff63800-6a44-4675-b591-41bac0446db7)
  ![image](https://github.com/user-attachments/assets/5426354f-71f8-4729-ac8a-d2ae786e8f40)
  ![image](https://github.com/user-attachments/assets/b4765041-44b0-4256-8893-a71114f3016b)
  ![image](https://github.com/user-attachments/assets/e01c27a4-b057-4d8a-b9a6-8cd05b8646e9)




## GitHub Repository

- [https://github.com/abelfx/Virtual_Art_Gallery_Project](https://github.com/abelfx/Virtual_Art_Gallery_Project)

## ✨ Features

- **5+ Unique 3D Objects**: Statues, paintings, ceiling lamp, Nefertiti bust, and more.
- **Camera Controls**: OrbitControls for smooth navigation (mouse drag, zoom, pan, keyboard movement).
- **Lighting**: Ambient and multiple spotlights for realistic illumination.
- **User Interaction**: Click on paintings/statues for info, keyboard navigation, drag to orbit.
- **Texture Mapping**: High-res textures for walls, floor, ceiling, and paintings.
- **Procedural Materials**: Used for some objects (e.g., Nefertiti bust).
- **Animation**: Rotating statues, smooth camera transitions.
- **GLTF/GLB Model Loading**: Efficient loading of external 3D models.
- **Raycasting**: For object selection and interaction.
- **VR Support**: WebXR integration for immersive experience (if supported by your browser and device).
- **Post-processing Ready**: Libraries for bloom and depth of field included (can be enabled/extended).

---

## 🕹️ How to Use

### **Navigation**
| Control         | Action                        |
|-----------------|-------------------------------|
| Mouse Drag      | Orbit/rotate camera           |
| Mouse Wheel     | Zoom in/out                   |
| WASD / Arrows   | Move camera                   |
| Q / E           | Rotate camera left/right      |
| `+` / `-`       | Zoom in/out                   |
| Spacebar        | Toggle auto-rotation          |
| R               | Reset camera                  |
| ESC / M         | Toggle main menu              |

### **Interacting with Objects**
- **Click on a painting**: Focus camera and view info panel.
- **Click on a statue**: Focus camera and view detailed info.
- **Click on the Nefertiti bust**: Toggle animation.
- **GUI Controls**: Adjust lighting, lamp, and object positions in real time.

### **VR Mode**
- If your browser and device support WebXR, click the VR button to enter immersive mode.

---

## 🗂️ Project Structure

```
Virtual_Art_Gallery_Project/
├── modules/
│   ├── ceiling.js
│   ├── ceilingLamp.js
│   ├── clickHandling.js
│   ├── eventListeners.js
│   ├── floor.js
│   ├── lighting.js
│   ├── menu.js
│   ├── movement.js
│   ├── nefertitiBust.js
│   ├── paintingData.js
│   ├── paintingInfo.js
│   ├── paintings.js
│   ├── rendering.js
│   ├── scene.js
│   ├── sceneHelpers.js
│   ├── statue.js
│   ├── VRSupport.js
│   └── walls.js
├── public/
│   ├── artworks/
│   ├── img/
│   ├── models/
│   └── index.html
├── style.css
├── main.js
├── package.json
├── vite.config.js
└── README.md
```

---

## 🧰 Tech Stack
- **Three.js** – 3D graphics & rendering
- **Vite** – Fast development server & bundler
- **GLTFLoader** – Efficient 3D model loading
- **WebXR** – VR support
- **Tween.js** – Smooth camera and object animation
- **(Optional) Cannon.js / Ammo.js** – Physics engine (add if needed)

---

## 🎨 Artwork Credits
All 3D models and textures are either:
- Original creations by the development team
- Public domain or culturally significant Ethiopian models
- Properly attributed and licensed (see `/public/models/ceiling-lamp/license.txt` and others)

---

## 📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

---


## 🔮 Future Improvements

- **Multiplayer Mode**: Enable multiple users to explore the gallery together in real time via WebRTC or WebSockets.
- **Voice-Guided Tours**: Add audio narration for selected artworks, available in multiple languages.
- **Dynamic Artwork Loading**: Integrate a backend or CMS to load new artworks and descriptions without redeployment.
- **Accessibility Features**: Add screen reader support, captions, and adjustable font sizes for inclusive experience.
- **Mobile Optimization**: Improve controls and performance on smartphones and tablets.
- **Machine Learning**: Use AI to recommend art based on user interests and time spent near objects.

---

## 👥 Team Members

| Name              | Student ID     | Section   |
|-------------------|----------------|-----------|
| ABEL TESFA        | UGR/3106/15    |    3      |
| ALAZAR ANDUALEM   | UGR/4511/15    |    3      |
| BETRETSION AKLILU | UGR/4566/15    |    3      |
| BIRHANU SOLOMON   | UGR/9606/14    |    3      |
| NAHOM ZENEBE      | UGR/0216/15    |    3      |
---

## ❤️ About
This project was created to promote and preserve Ethiopia's ancient history and cultural legacy through immersive 3D technology. From the rock-hewn churches of Lalibela to traditional coffee ceremonies and ancient sculptures, every artifact tells a story worth exploring.

---

## 🔗 Useful Links
- [Three.js Documentation](https://threejs.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [WebXR API](https://immersive-web.github.io/webxr/)
- [GLTF Format](https://github.com/KhronosGroup/glTF)

    Built with 🇪🇹 pride to showcase history in a digital world.
