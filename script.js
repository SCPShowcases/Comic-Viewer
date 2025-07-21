const chapterSelect = document.getElementById('chapterSelect');
const viewer = document.getElementById('viewer');

// Set up available chapters
const chapters = ['Chapter01']; // Add more if needed
chapters.forEach(chapter => {
  const option = document.createElement('option');
  option.value = chapter;
  option.textContent = chapter;
  chapterSelect.appendChild(option);
});

function loadChapter(chapter) {
  viewer.innerHTML = ''; // Clear viewer
  let index = 1;

  function loadNextImage() {
    const img = new Image();
    const num = index.toString().padStart(3, '0');
    img.src = `comics/${chapter}/${num}.jpg`;
    img.onload = () => {
      viewer.appendChild(img);
      index++;
      loadNextImage(); // Recursively load more
    };
    img.onerror = () => {
      // Stop loading when no more images
    };
  }

  loadNextImage();
}

// Initial load
loadChapter(chapters[0]);

// Change chapter
chapterSelect.addEventListener('change', (e) => {
  loadChapter(e.target.value);
});
