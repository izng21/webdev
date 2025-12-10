document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('game-board');
  const status = document.getElementById('status');
  const restartBtn = document.getElementById('restart');

  let currentPlayer = 'X';
  let gameActive = true;
  let gameState = ['', '', '', '', '', '', '', '', ''];

  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];

  function createBoard() {
    board.innerHTML = '';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.addEventListener('click', handleCellClick);
      board.appendChild(cell);
    }
  }

  function handleCellClick(e) {
    const index = e.target.dataset.index;

    if (!gameActive || gameState[index]) return;

    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer.toLowerCase());


    if (checkWin()) {
      status.textContent = `🎉 Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (gameState.every(cell => cell)) {
      status.textContent = "It's a draw! 🤝";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  }

  function checkWin() {
    return winCombos.some(combo => {
      const [a, b, c] = combo;
      return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
  }

  restartBtn.addEventListener('click', createBoard);

  createBoard();
});
