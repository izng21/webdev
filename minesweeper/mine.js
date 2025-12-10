const gridSize = 5;
const totalMines = 5;
let cells = [];
let minePositions = [];

const statusText = document.getElementById('status');
const board = document.getElementById('minesweeper');
const restartBtn = document.getElementById('restart-btn');

function generateMines() {
  const positions = new Set();
  while (positions.size < totalMines) {
    positions.add(Math.floor(Math.random() * gridSize * gridSize));
  }
  return Array.from(positions);
}

function getAdjacentIndices(index) {
  const adj = [];
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const r = row + dr;
      const c = col + dc;
      if (r >= 0 && r < gridSize && c >= 0 && c < gridSize) {
        adj.push(r * gridSize + c);
      }
    }
  }
  return adj;
}

function countAdjacentMines(index) {
  const adjacent = getAdjacentIndices(index);
  return adjacent.filter(i => minePositions.includes(i)).length;
}

function createBoard() {
  board.innerHTML = '';
  cells = [];
  minePositions = generateMines();

  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('button');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
    cells.push(cell);
  }

  statusText.innerText = 'Click a cell to start.';
}

function handleClick(e) {
  const index = parseInt(e.target.dataset.index);
  const cell = cells[index];

  if (minePositions.includes(index)) {
    revealAll();
    cell.innerText = '💣';
    cell.classList.add('revealed');
    statusText.innerText = '💥 Boom! Game Over.';
    disableAll();
  } else {
    revealCell(index);
    checkWin();
  }
}

function revealCell(index) {
  const cell = cells[index];
  if (cell.classList.contains('revealed') || minePositions.includes(index)) return;

  cell.classList.add('revealed');
  cell.disabled = true;

  const count = countAdjacentMines(index);
  if (count > 0) {
    cell.innerText = count;
  } else {
    // reveal surrounding if 0
    getAdjacentIndices(index).forEach(i => revealCell(i));
  }
}

function revealAll() {
  minePositions.forEach(index => {
    const cell = cells[index];
    cell.innerText = '💣';
    cell.classList.add('revealed');
    cell.disabled = true;
  });
}

function disableAll() {
  cells.forEach(cell => cell.disabled = true);
}

function checkWin() {
  const safeRevealed = cells.filter((cell, i) =>
    !minePositions.includes(i) && cell.classList.contains('revealed')
  ).length;

  if (safeRevealed === gridSize * gridSize - totalMines) {
    revealAll();
    statusText.innerText = '🎉 You Win!';
    disableAll();
  }
}

restartBtn.addEventListener('click', createBoard);
createBoard();
