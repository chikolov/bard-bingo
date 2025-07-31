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
  document.getElementById("welcomePopup").style.display = "none";
  document.getElementById("bingoContainer").style.display = "block";
  document.getElementById("siteHeader").style.display = "block";
}

function shareBingo() {
  alert("Copy the link or take a screenshot to share on social media!");
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function checkBingo(grid) {
  const size = 5;
  const winPatterns = [];

  for (let i = 0; i < size; i++) {
    winPatterns.push([...Array(size).keys()].map(j => `${i}-${j}`));
    winPatterns.push([...Array(size).keys()].map(j => `${j}-${i}`));
  }

  winPatterns.push([...Array(size).keys()].map(i => `${i}-${i}`));
  winPatterns.push([...Array(size).keys()].map(i => `${i}-${size - 1 - i}`));

  return winPatterns.some(pattern =>
    pattern.every(id => document.getElementById(id).classList.contains("selected"))
  );
}

function createGrid(prompts) {
  const grid = document.getElementById("bingoGrid");
  grid.innerHTML = "";

  prompts.forEach((prompt, index) => {
    const cell = document.createElement("div");
    const row = Math.floor(index / 5);
    const col = index % 5;
    const id = `${row}-${col}`;
    cell.id = id;
    cell.classList.add("bingo-cell");
    cell.innerText = prompt;

    if (prompt === "Free Space") {
      cell.classList.add("selected");
    }

    cell.addEventListener("click", () => {
      cell.classList.toggle("selected");
      if (checkBingo(grid)) {
        document.getElementById("congratsPopup").style.display = "flex";
      }
    });

    grid.appendChild(cell);
  });
}

window.onload = () => {
  const randomVersion = allPromptSets[Math.floor(Math.random() * allPromptSets.length)];
  const shuffled = shuffle(randomVersion.filter(p => p !== "Free Space")).slice(0, 24);
  shuffled.splice(12, 0, "Free Space");
  const prompts = shuffled;
  createGrid(prompts);

  // Hide site header until terms are accepted
  document.getElementById("siteHeader").style.display = "none";
};
