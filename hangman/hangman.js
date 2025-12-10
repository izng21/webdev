const wordEl = document.getElementById('word');
const lettersEl = document.getElementById('letters');
const hintEl = document.getElementById('hint');
const bodyParts = document.querySelectorAll('.body-part');

const words = [
  { word: "computer", hint: "An electronic device" },
  { word: "internet", hint: "World Wide Web" },
  { word: "keyboard", hint: "Used to type" },
  { word: "monitor", hint: "Displays visual output" },
  { word: "software", hint: "Programs and applications" },
  { word: "network", hint: "A group of connected computers" },
  { word: "firewall", hint: "A system that blocks unauthorized access" },
  { word: "database", hint: "Organized collection of information" },
  { word: "algorithm", hint: "Step-by-step solution method" },
  { word: "html", hint: "Standard markup language for web pages" },
  { word: "python", hint: "Popular programming language with a snake logo" },
  { word: "browser", hint: "Used to access websites" },
  { word: "linux", hint: "An open-source operating system" },
  { word: "server", hint: "Provides resources to other computers" },
  { word: "cookie", hint: "Stores user data in web browsing" },
  { word: "malware", hint: "Malicious software" },
  { word: "cloud", hint: "Internet-based storage and services" },
  { word: "debug", hint: "Process of fixing code errors" },
  { word: "cache", hint: "Temporary storage for quick access" },
  { word: "script", hint: "Small program that runs on web pages" },
  { word: "token", hint: "Used for secure authentication" }
];

let selectedWord = "";
let guessedLetters = [];

function startGame() {
  const random = words[Math.floor(Math.random() * words.length)];
  selectedWord = random.word;
  guessedLetters = [];
  hintEl.textContent = `Hint: ${random.hint}`;
  displayWord();
  renderLetters();
  updateHangman();
}

function displayWord() {
  wordEl.innerHTML = selectedWord
    .split("")
    .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

function renderLetters() {
  lettersEl.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i).toLowerCase();
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.disabled = guessedLetters.includes(letter);
    btn.addEventListener("click", () => guess(letter));
    lettersEl.appendChild(btn);
  }
}

function guess(letter) {
  guessedLetters.push(letter);
  displayWord();
  renderLetters();
  updateHangman();
  checkGameStatus();
}

function updateHangman() {
  const wrongGuesses = guessedLetters.filter(l => !selectedWord.includes(l)).length;
  bodyParts.forEach((part, index) => {
    part.style.display = index < wrongGuesses ? 'block' : 'none';
  });
}

function checkGameStatus() {
  const wrongCount = guessedLetters.filter(l => !selectedWord.includes(l)).length;

  if (selectedWord.split("").every(l => guessedLetters.includes(l))) {
    setTimeout(() => alert("🎉 You guessed the word!"), 200);
  }

  if (wrongCount === bodyParts.length) {
    wordEl.textContent = selectedWord.split("").join(" ");
    setTimeout(() => alert("💀 Game over! The word was: " + selectedWord), 200);
  }
}

startGame();
