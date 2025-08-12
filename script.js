/*
  Bard Bingo
  Georgi Chikolov
  2025-08-12

  Description:
  Handles all game logic for displaying the bingo grid, tracking selections,
  detecting wins, and showing popups.
*/

// ===== PROMPTS =====
//In the works: multiple case handling with categories for the picked sets
const allPromptSets = [
  [
    "Admission kiosk", "10 distribution requirements", "Meditation statue", "The bell tower", "Sculpture of three red circles",
    "Swings", "Post office", "MPR", "Toaster", "Heaviest doors on campus",
    "Learning Commons", "Stone smiley face by stone row", "Free Space", "Blue face on door of root cellar", "Blue boxes",
    "Leon", "Bard bucks", "Flags for Bard Houses", "Waterfall", "Crypt",
    "Car on campus", "Shipping containers", "Bike racks", "Five Pillars", "L&T"
  ],
  [
    "FYSEM", "CitSci", "Moderation", "Sproj", "Bard Network",
    "Berlin", "Farm", "Halal Bros", "18 varsity sports teams", "SMOG",
    "Catskill mountains", "A student", "A professor", "Admission Counselors (COD)", "Chipmunk",
    "Squirrel", "Deer", "A Bard Sweatshirt", "Holidays", "Events (FOH and ASD)",
    "Scooter", "Ravines", "Tivoli Bays", "Blithewood", "CCS Hessel"
  ]
];

// ===== EVENT HANDLERS =====
function acceptTerms() {
  // Hide welcome popup & show main game
  document.getElementById("welcomePopup").style.display = "none";
  document.getElementById("bingoContainer").style.display = "block";
  document.getElementById("siteHeader").style.display = "block";
}

function shareBingo() {
  alert("Copy the link or take a screenshot to share on social media!");
}

// ===== HELPER FUNCTIONS =====
function shuffle(array) {
  // Returns a shuffled copy of an array
  return array.sort(() => Math.random() - 0.5);
}

function checkBingo() {
  const size = 5;
  const winPatterns = [];

  // Rows & columns
  for (let i = 0; i < size; i++) {
    winPatterns.push([...Array(size).keys()].map(j => `${i}-${j}`)); // Row i
    winPatterns.push([...Array(size).keys()].map(j => `${j}-${i}`)); // Col i
  }

  // Diagonals
  winPatterns.push([...Array(size).keys()].map(i => `${i}-${i}`)); // Top-left to bottom-right
  winPatterns.push([...Array(size).keys()].map(i => `${i}-${size - 1 - i}`)); // Top-right to bottom-left

  // Check if any pattern is fully selected
  return winPatterns.some(pattern =>
    pattern.every(id => document.getElementById(id).classList.contains("selected"))
  );
}

function createGrid(prompts) {
  const grid = document.getElementById("bingoGrid");
  grid.innerHTML = ""; // Clear any existing cells

  prompts.forEach((prompt, index) => {
    const cell = document.createElement("div");
    const row = Math.floor(index / 5);
    const col = index % 5;
    const id = `${row}-${col}`;

    cell.id = id;
    cell.classList.add("bingo-cell");
    cell.innerText = prompt;

    // Auto-select "Free Space"
    if (prompt === "Free Space") {
      cell.classList.add("selected");
    }

    // Click to toggle selection & check win
    cell.addEventListener("click", () => {
      cell.classList.toggle("selected");
      if (checkBingo()) {
        document.getElementById("congratsPopup").style.display = "flex";
      }
    });

    grid.appendChild(cell);
  });
}

// ===== INIT =====
window.onload = () => {
  // Pick random prompt set
  const randomVersion = allPromptSets[Math.floor(Math.random() * allPromptSets.length)];

  // Shuffle, keeping "Free Space" in the center
  const shuffled = shuffle(randomVersion.filter(p => p !== "Free Space")).slice(0, 24);
  shuffled.splice(12, 0, "Free Space"); // Insert in center position

  createGrid(shuffled);

  // Hide header until terms are accepted
  document.getElementById("siteHeader").style.display = "none";
};
