# 🎨 Virtual Art Gallery – Ethiopian Ancient History

An immersive 3D virtual art gallery experience built with **Three.js**, highlighting Ethiopia’s rich cultural legacy through realistic lighting, interactive models, audio guides, and VR support.

---

## 🗂️ Project Structure

```
Virtual_Art_Gallery/
├── modules/
│   └── JS/
│       ├── audioGuide.js
│       ├── boundingBox.js
│       ├── ceiling.js
│       ├── ceilingLamp.js
│       ├── clickHandling.js
│       ├── eventListeners.js
│       ├── floor.js
│       ├── lighting.js
│       ├── menu.js
│       ├── movement.js
│       ├── nefertitiBust.js
│       ├── paintingData.js
│       ├── paintingInfo.js
│       ├── paintings.js
│       ├── rendering.js
│       ├── scene.js
│       ├── sceneHelpers.js
│       ├── statue.js
│       ├── VRSupport.js
│       └── walls.js
├── public/
│   ├── artworks/
│   ├── img/
│   │   ├── ceiling.jpg
│   │   ├── Floor.jpg
│   │   ├── frame.jpg
│   │   ├── starrynight.jpg
│   │   ├── wall.jpg
│   │   └── white-texture.jpg
│   ├── models/
│   │   ├── ceiling-lamp/
│   │   ├── statue/
│   │   ├── lalibela.glb
│   │   ├── ethiopian_coffee_ceremony.glb
│   │   ├── ethiopian_shield_and_spear.glb
│   │   ├── australopithecus_africanus.glb
│   │   ├── ibex_statue_scan.glb
│   │   ├── snake_statue.glb
│   │   └── license.txt
│   └── index.html
├── JS/
│   └── main.js
├── style.css
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```
## ✨ Features

### ✅ Cultural Assets

Showcasing over **5 unique Ethiopian historical artifacts**, accurately modeled in 3D:

- **Lalibela Rock-Hewn Churches** – Ancient monolithic architecture carved from solid rock.
- **Fasil Ghebbi Fortress** – Royal enclosure of Ethiopian emperors in Gondar.
- **Genbeba Drum & Ceremonial Tools** – Traditional instruments used in cultural and religious events.
- **Ethiopian Coffee Ceremony Setup** – Includes jebena, cups, incense, and traditional utensils.
- **Sculptures & Shields** – Historic Ibex statues, shields, and spears representing Ethiopian heritage.

---

### 🎮 Camera & Navigation

| Control       | Action                        |
|---------------|-------------------------------|
| Mouse Drag    | Orbit camera                  |
| WASD / Arrows | Move camera                   |
| Q / E         | Rotate camera                 |
| `+` / `-`     | Zoom in / out                 |
| Spacebar      | Toggle auto-rotation          |
| R             | Reset camera                  |
| ESC / M       | Toggle main menu              |

---

### 💡 Visual & Interaction

- **Realistic Lighting**:
  - Ambient, directional, and spotlights for immersive visuals.

- **Interactive Elements**:
  - Clickable 3D objects
  - Hover tooltips
  - Info panels with metadata

- **Smooth UX**:
  - Camera animation and transitions via Tween.js

---

### 🧱 3D Models & Materials

- **GLTF / GLB Support** – Load optimized 3D models.
- **High-Resolution Textures** – For floors, walls, and objects.
- **Procedural Materials** – Enhance realism under dynamic lighting.
- **Normal / Bump Maps** – Detailed surface appearance.
- **Post-Processing Effects**:
  - Bloom for lighting glow
  - Depth of Field (DoF) for cinematic focus

---

### 🔊 Audio & VR

- **Audio Guide**:
  - Narrated artifact info
  - Start/Stop control buttons

- **Virtual Reality**:
  - WebXR support for full immersion
  - Compatible with VR headsets

- **Physics Integration**:
  - Basic interactions with **Cannon.js** / **Ammo.js**

---


⚙️ Setup Instructions
1. Install Dependencies

npm install

2. Start Development Server

npm run dev

or using Vite directly:

npx vite

3. Open in Browser

http://localhost:5173
---
🧰 Tech Stack

    Three.js – 3D graphics & rendering

    Vite – Lightning-fast bundler

    GLTFLoader – Model loading

    Cannon.js / Ammo.js – Physics engine

    Tween.js – Animation transitions

    WebXR – VR integration
---

🎨 Artwork Credits

All 3D models and textures used in this project are either:

    Original creations by the development team

    Public domain models with cultural significance to Ethiopia

    Properly attributed and licensed under respective terms
---
📜 License

This project is licensed under the MIT License. See the LICENSE file for details.
---
❤️ About

This project was created to promote and preserve Ethiopia’s ancient history and cultural legacy through immersive 3D technology. From the rock-hewn churches of Lalibela to traditional coffee ceremonies and ancient sculptures, every artifact tells a story worth exploring.
🔗 Useful Links

    Three.js Documentation

    Vite Documentation

    WebXR API

    GLTF Format

    Built with 🇪🇹 pride to showcase history in a digital world.
