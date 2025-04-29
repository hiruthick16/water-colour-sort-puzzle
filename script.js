const levels = [
  // Level 1
  [
    ["red", "blue", "red", "blue"],
    ["blue", "red", "blue", "red"],
    [],
  ],
  // Level 2
  [
    ["green", "green", "yellow", "yellow"],
    ["yellow", "green", "yellow", "green"],
    [],
    []
  ],
  // Level 3
  [
    ["red", "blue", "yellow", "red"],
    ["yellow", "blue", "red", "blue"],
    ["blue", "yellow", "red", "yellow"],
    [],
    []
  ]
];

let colors = [];
let selectedTube = null;

const gameContainer = document.querySelector(".game-container");

function loadLevel(levelIndex) {
  colors = JSON.parse(JSON.stringify(levels[levelIndex])); // Deep copy
  selectedTube = null;
  createTubes();
}

function createTubes() {
  gameContainer.innerHTML = "";
  colors.forEach((tubeColors, index) => {
    const tube = document.createElement("div");
    tube.className = "tube";
    tube.dataset.index = index;

    tubeColors.forEach(color => {
      const colorDiv = document.createElement("div");
      colorDiv.className = "color";
      colorDiv.style.background = color;
      tube.appendChild(colorDiv);
    });

    tube.addEventListener("click", () => handleTubeClick(index));
    gameContainer.appendChild(tube);
  });
}

function handleTubeClick(index) {
  if (selectedTube === null) {
    selectedTube = index;
  } else {
    if (selectedTube !== index) {
      moveColor(selectedTube, index);
    }
    selectedTube = null;
  }
  createTubes();
}

function moveColor(from, to) {
  if (colors[from].length === 0 || colors[to].length >= 4) return;

  const movingColor = colors[from][colors[from].length - 1];
  let count = 0;

  // Count how many can move
  for (let i = colors[from].length - 1; i >= 0; i--) {
    if (colors[from][i] === movingColor) count++;
    else break;
  }

  while (
    count-- &&
    colors[to].length < 4 &&
    (colors[to].length === 0 || colors[to][colors[to].length - 1] === movingColor)
  ) {
    colors[to].push(colors[from].pop());
  }
}

// Load Level 1 on page load
loadLevel(0);
