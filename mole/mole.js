const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start-btn');

let score = 0;
let currentMole;
let gameInterval;
let moleTimer;
let timeLeft = 30;

function randomHole() {
  holes.forEach(h => h.classList.remove('mole'));
  const index = Math.floor(Math.random() * holes.length);
  currentMole = holes[index];
  currentMole.classList.add('mole');
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = "Score: 0";
  timeDisplay.textContent = "Time Left: 30s";
  clearInterval(gameInterval);
  clearInterval(moleTimer);

  gameInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(moleTimer);
      alert(`⏱ Time's up!\nYour score: ${score}`);
      holes.forEach(h => h.classList.remove('mole'));
    }
  }, 1000);

  moleTimer = setInterval(randomHole, 800);
}

holes.forEach(hole => {
  hole.addEventListener('click', () => {
    if (hole === currentMole) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      hole.classList.remove('mole');
    }
  });
});

startBtn.addEventListener('click', startGame);
