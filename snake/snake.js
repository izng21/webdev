const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart');

const box = 20;
const canvasSize = 400;
const totalBoxes = canvasSize / box;

let snake;
let food;
let direction;
let score;
let game;

function initGame() {
  snake = [{ x: 9 * box, y: 9 * box }];
  direction = 'RIGHT';
  score = 0;
  food = {
    x: Math.floor(Math.random() * totalBoxes) * box,
    y: Math.floor(Math.random() * totalBoxes) * box,
  };
  clearInterval(game);
  game = setInterval(draw, 150);
}

function draw() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  // Draw food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);

  // Draw snake
  ctx.fillStyle = '#007bff';
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Move snake
  let head = { ...snake[0] };

  if (direction === 'LEFT') head.x -= box;
  if (direction === 'RIGHT') head.x += box;
  if (direction === 'UP') head.y -= box;
  if (direction === 'DOWN') head.y += box;

  // Game over conditions
  if (
    head.x < 0 ||
    head.x >= canvasSize ||
    head.y < 0 ||
    head.y >= canvasSize ||
    snake.some((s, i) => i > 0 && s.x === head.x && s.y === head.y)
  ) {
    clearInterval(game);
    alert('💀 Game Over!');
    return;
  }

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * totalBoxes) * box,
      y: Math.floor(Math.random() * totalBoxes) * box,
    };
  } else {
    snake.pop();
  }

  snake.unshift(head);
  scoreEl.innerText = `Score: ${score}`;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
  if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
});

restartBtn.addEventListener('click', initGame);

initGame();
