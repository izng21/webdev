let randomNumber;
let attempts = 0;
let time = 0;
let timerInterval;

const guessInput = document.getElementById('guess-input');
const checkBtn = document.getElementById('check-btn');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restart-btn');

function generateNumber() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  time = 0;
  attemptsDisplay.textContent = "Attempts: 0";
  timerDisplay.textContent = "Time: 0s";
  feedback.textContent = "";
  guessInput.value = "";
  guessInput.disabled = false;
  checkBtn.disabled = false;
  restartBtn.style.display = "none";

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    time++;
    timerDisplay.textContent = `Time: ${time}s`;
  }, 1000);
}

function checkGuess() {
  const guess = parseInt(guessInput.value);
  if (isNaN(guess) || guess < 1 || guess > 100) {
    feedback.textContent = "❗ Please enter a number between 1 and 100!";
    return;
  }

  attempts++;
  attemptsDisplay.textContent = `Attempts: ${attempts}`;

  if (guess === randomNumber) {
    feedback.textContent = `🎉 Correct! The number was ${randomNumber}.`;
    guessInput.disabled = true;
    checkBtn.disabled = true;
    clearInterval(timerInterval);
    restartBtn.style.display = "inline-block";
  } else if (Math.abs(guess - randomNumber) <= 5) {
    feedback.textContent = guess < randomNumber
      ? "🔥 Very close, but a bit too low!"
      : "🔥 Very close, but a bit too high!";
  } else {
    feedback.textContent = guess < randomNumber
      ? "Too low! Try again."
      : "Too high! Try again.";
  }
}

checkBtn.addEventListener('click', checkGuess);
restartBtn.addEventListener('click', generateNumber);

generateNumber(); // Start game
