const board = document.querySelector('.game-board');
const resetBtn = document.getElementById('reset');

const emojis = ['🍎','🍌','🍇','🍓','🍒','🍍','🥝','🍉'];
let cards = [...emojis, ...emojis]; // make pairs
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let timerInterval;


function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  board.innerHTML = '';
  matchedPairs = 0;
  flippedCards = [];
  moves = 0;
  timer = 0;
  updateStats();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    updateStats();
  }, 1000);

  shuffle(cards).forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerText = '❓';
    card.addEventListener('click', flipCard);
    board.appendChild(card);
  });
}


function flipCard(e) {
  const card = e.target;

  if (card.classList.contains('flipped') || flippedCards.length === 2) return;

  card.innerText = card.dataset.emoji;
  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    moves++;
    updateStats();
    const [first, second] = flippedCards;
    if (first.dataset.emoji === second.dataset.emoji) {
      matchedPairs++;
      flippedCards = [];
      if (matchedPairs === emojis.length) {
        clearInterval(timerInterval);
        setTimeout(() => {
            alert(`🎉 You matched all pairs!\nMoves: ${moves}\nTime: ${timer} seconds`);
        }, 300);
    }
    } else {
      setTimeout(() => {
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        first.innerText = '❓';
        second.innerText = '❓';
        flippedCards = [];
      }, 800);
    }
  }
}

function updateStats() {
  document.getElementById('moves').innerText = `Moves: ${moves}`;
  document.getElementById('timer').innerText = `Time: ${timer}s`;
}

resetBtn.addEventListener('click', createBoard);

createBoard(); // Start game on load
