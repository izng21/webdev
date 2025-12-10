const userChoiceSpan = document.getElementById('user-choice');
const compChoiceSpan = document.getElementById('computer-choice');
const outcomeText = document.getElementById('outcome');
const userScoreSpan = document.getElementById('user-score');
const compScoreSpan = document.getElementById('comp-score');

let userScore = 0;
let compScore = 0;

function play(userChoice) {
  const choices = ['rock', 'paper', 'scissors'];
  const compChoice = choices[Math.floor(Math.random() * 3)];

  userChoiceSpan.textContent = format(userChoice);
  compChoiceSpan.textContent = format(compChoice);

  const outcome = getResult(userChoice, compChoice);

  if (outcome === 'win') {
    userScore++;
    outcomeText.textContent = 'Result: You Win! 🎉';
  } else if (outcome === 'lose') {
    compScore++;
    outcomeText.textContent = 'Result: You Lose 😢';
  } else {
    outcomeText.textContent = 'Result: It\'s a Draw ⚔️';
  }

  userScoreSpan.textContent = userScore;
  compScoreSpan.textContent = compScore;
}

function getResult(user, comp) {
  if (user === comp) return 'draw';
  if (
    (user === 'rock' && comp === 'scissors') ||
    (user === 'paper' && comp === 'rock') ||
    (user === 'scissors' && comp === 'paper')
  ) {
    return 'win';
  }
  return 'lose';
}

function format(choice) {
  return choice.charAt(0).toUpperCase() + choice.slice(1);
}
