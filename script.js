const comicSelect = document.getElementById("comicSelect");
const viewer = document.getElementById("viewer");
const comicTitle = document.getElementById("comicTitle");

// Configure your comics here:
const comics = [
  {
    id: "Invincible-0001",
    path: "Comics/Invincible/0001/",
    label: "Invincible #1"
  },
  {
    id: "Invincible-0002",
    path: "Comics/Invincible/0002/",
    label: "Invincible #2"
  }
];

// Populate dropdown
comics.forEach(comic => {
  const opt = document.createElement("option");
  opt.value = comic.path;
  opt.textContent = comic.label;
  comicSelect.appendChild(opt);
});

// Handle loading comic
async function loadComic(path) {
  viewer.innerHTML = "";
  comicTitle.textContent = "Loading...";

  try {
    // Fetch settings.json
    const settingsRes = await fetch(path + "settings.json");
    const settings = await settingsRes.json();

    const tag = settings.tag || "Issue";
    const name = settings.name || "Untitled";
    const folderName = path.split("/").filter(p => p).pop();

    comicTitle.textContent = `${tag} ${folderName}: ${name}`;

    // Load images (001.jpg, 002.jpg, ...)
    let index = 1;
    const loadNext = () => {
      const padded = index.toString().padStart(3, "0");
      const img = new Image();
      img.src = `${path}${padded}.jpg`;

      img.onload = () => {
        viewer.appendChild(img);
        index++;
        loadNext();
      };

      img.onerror = () => {}; // Stop when no more
    };

    loadNext();
  } catch (err) {
    comicTitle.textContent = "Failed to load comic.";
    console.error(err);
  }
}

// Initial load
loadComic(comics[0].path);

// On dropdown change
comicSelect.addEventListener("change", (e) => {
  loadComic(e.target.value);
});
