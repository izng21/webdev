const game = document.getElementById("game");
const basket = document.getElementById("basket");
const scoreEl = document.getElementById("score");

let score = 0;
let basketX = 160;
let gameWidth = 400;
let gameHeight = 500;

const emojis = ['🍎', '🍊', '🍇', '🍌', '🍒', '🥝'];

function spawnEmoji() {
  const emoji = document.createElement("div");
  emoji.classList.add("falling");
  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = Math.floor(Math.random() * (gameWidth - 30)) + "px";
  game.appendChild(emoji);

  let posY = 0;
  const fallSpeed = 2;

  const fallInterval = setInterval(() => {
    posY += fallSpeed;
    emoji.style.top = posY + "px";

    // Collision check
    const emojiX = parseInt(emoji.style.left);
    const basketLeft = basketX;
    const basketRight = basketX + 80;

    if (
      posY >= 460 &&
      emojiX >= basketLeft &&
      emojiX <= basketRight
    ) {
      score++;
      scoreEl.innerText = score;
      clearInterval(fallInterval);
      game.removeChild(emoji);
    }

    // Missed
    if (posY > gameHeight) {
      clearInterval(fallInterval);
      game.removeChild(emoji);
    }
  }, 16);
}

function moveBasket(e) {
  if (e.key === "ArrowLeft" && basketX > 0) {
    basketX -= 20;
  } else if (e.key === "ArrowRight" && basketX < (gameWidth - 80)) {
    basketX += 20;
  }
  basket.style.left = basketX + "px";
}

document.addEventListener("keydown", moveBasket);
setInterval(spawnEmoji, 1200); // Spawn every 1.2 seconds
