let isInfoLocked = false;
let lockedPainting = null; // To keep track of which painting's info is locked

// Display painting info in the DOM
export const displayPaintingInfo = (info, lock = false, painting = null) => {
  const infoElement = document.getElementById("painting-info"); // Get the reference

  if (lock) {
    isInfoLocked = true;
    lockedPainting = painting;
  }

  // Set the html content inside info element
  infoElement.innerHTML = `
    <h3>${info.title}</h3>
    <p>Artist: ${info.artist}</p>
    <p>Description: ${info.description}</p>
    <p>Year: ${info.year}</p>
  `;
  infoElement.classList.add("show"); // Add the 'show' class
};

// Hide painting info in the DOM
export const hidePaintingInfo = (currentPaintingInRange = null) => {
  const infoElement = document.getElementById("painting-info"); // Get the reference

  // Only hide if info is not locked, or if it's locked but the user moved away from that specific painting
  if (
    !isInfoLocked ||
    (isInfoLocked && lockedPainting !== currentPaintingInRange)
  ) {
    infoElement.classList.remove("show"); // Remove the 'show' class
    isInfoLocked = false; // Unlock if hidden
    lockedPainting = null;
  }
};

export const getIsInfoLocked = () => isInfoLocked;
export const getLockedPainting = () => lockedPainting;
