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

function acceptTerms() {
  document.getElementById("welcomePopup").hidden = true;
  document.getElementById("bingoContainer").hidden = false;
  document.getElementById("siteHeader").hidden = false;
}

function shareBingo() {
  alert("Copy the link or take a screenshot to share on social media!");
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function checkBingo() {
  const size = 5;
  const grid = document.getElementById("bingoGrid");
  const winPatterns = [];

  for (let i = 0; i < size; i++) {
    winPatterns.push(Array.from({ length: size }, (_, j) => `${i}-${j}`));
    winPatterns.push(Array.from({ length: size }, (_, j) => `${j}-${i}`));
  }

  winPatterns.push(Array.from({ length: size }, (_, i) => `${i}-${i}`));
  winPatterns.push(Array.from({ length: size }, (_, i) => `${i}-${size - 1 - i}`));

  return winPatterns.some(pattern =>
    pattern.every(id => document.getElementById(id).classList.contains("selected"))
  );
}

function createGrid(prompts) {
  const grid = document.getElementById("bingoGrid");
  grid.innerHTML = "";

  prompts.forEach((prompt, index) => {
    const row = Math.floor(index / 5);
    const col = index % 5;
    const id = `${row}-${col}`;
    const cell = document.createElement("div");
    cell.id = id;
    cell.className = "bingo-cell";
    cell.textContent = prompt;

    if (prompt === "Free Space") {
      cell.classList.add("selected");
    }

    cell.addEventListener("click", () => {
      cell.classList.toggle("selected");

      if (checkBingo()) {
        document.getElementById("congratsPopup").hidden = false;
      }
    });

    grid.appendChild(cell);
  });
}

window.onload = () => {
  const randomVersion = allPromptSets[Math.floor(Math.random() * allPromptSets.length)];
  const shuffled = shuffle(randomVersion.filter(p => p !== "Free Space")).slice(0, 24);
  shuffled.splice(12, 0, "Free Space"); // insert in center
  createGrid(shuffled);
};
