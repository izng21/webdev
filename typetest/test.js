document.addEventListener('DOMContentLoaded', () => {
  const promptText = document.getElementById('prompt');
  const inputArea = document.getElementById('input');
  const timerDisplay = document.getElementById('timer');
  const wpmDisplay = document.getElementById('wpm');
  const startBtn = document.getElementById('start-btn');

  const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing fast is a useful skill for productivity.",
    "Practice every day to improve your speed.",
    "HTML, CSS, and JavaScript make web magic.",
    "Always aim for accuracy before speed.",
    "JavaScript brings websites to life.",
    "Focus on the flow, not just the fingers.",
    "Mistakes are proof that you're trying.",
    "Every keystroke is a step to mastery.",
    "A clean UI improves user experience.",
    "Typing is like playing piano with letters.",
    "Front-end development is both art and logic.",
    "Your brain will catch up with your fingers.",
    "Keep calm and keep typing.",
    "The best way to learn is by doing.",
    "Build projects to sharpen your coding skills.",
    "Speed comes with practice and patience.",
    "Good code is like good writing: clear and concise.",
    "Challenge yourself every time you type.",
    "Mobile-first design is the new standard.",
    "Debugging is twice as hard as writing the code.",
    "Web developers solve problems with creativity.",
    "Auto-save is a developer's best friend.",
    "Progress, not perfection, is the key.",
    "One line of code can change everything."
];


  let currentSentence = "";
  let startTime;
  let interval;

  function startTest() {
    inputArea.disabled = true;
    inputArea.value = "";
    promptText.textContent = "Get ready...";

  let countdown = 3;
    startBtn.disabled = true;
    timerDisplay.textContent = `Starting in ${countdown}...`;
    wpmDisplay.textContent = "WPM: 0";

  const countdownInterval = setInterval(() => {
    countdown--;
    timerDisplay.textContent = `Starting in ${countdown}...`;

    if (countdown === 0) {
      clearInterval(countdownInterval);
      startBtn.disabled = false;
      runTypingTest();
    }
  }, 1000);
}

  function runTypingTest() {
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    promptText.textContent = currentSentence;
    inputArea.disabled = false;
    inputArea.focus();
    startTime = Date.now();
    timerDisplay.textContent = "Time: 0s";
    wpmDisplay.textContent = "WPM: 0";

    interval = setInterval(updateStats, 1000);
}


  function updateStats() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = `Time: ${elapsed}s`;

    const wordsTyped = inputArea.value.trim().split(/\s+/).length;
    const wpm = Math.floor((wordsTyped / elapsed) * 60);
    if (elapsed > 0) {
      wpmDisplay.textContent = `WPM: ${isFinite(wpm) ? wpm : 0}`;
    }
  }

  function endTest() {
    clearInterval(interval);
    inputArea.disabled = true;
  }

  inputArea.addEventListener('input', () => {
    if (inputArea.value.trim() === currentSentence) {
      endTest();
    }
  });

  startBtn.addEventListener('click', () => {
    clearInterval(interval);
    startTest();
  });
});
