const questions = [
  {
    question: "What is the capital of Philippines?",
    choices: ["Cebu", "Manila", "Baguio", "Davao"],
    answer: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: 1
  },
  {
    question: "What is the largest ocean on Earth?",
    choices: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: 2
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    choices: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
    answer: 2
  },
  {
    question: "Which element has the chemical symbol O?",
    choices: ["Oxygen", "Osmium", "Oxide", "Ozone"],
    answer: 0
  },
  {
    question: "Where did Jose Rizal been shot at?",
    choices: ["At the Back", "Fort Santiago", "Jones Bridge", "Bagumbayan"],
    answer: 3
  },
  {
    question: "Bus Line that has a PITX - Ternate route with red and yellow in color?",
    choices: ["Saulog", "Saint Anthony of Padua", "Saint Gabriel", "DLTB.co"],
    answer: 1
  },
  {
    question: "What is the National Animal of the Philippines?",
    choices: ["Eagle", "Carabao", "Crocodile", "Rabbit"],
    answer: 1
  },
  {
    question: "What does 'HTML' stand for?",
    choices: ["HyperText Markup Language", "HighText Machine Language", "HyperLoop Text Module", "HyperType Machine Language"],
    answer: 0
  },
  {
    question: "Which company developed the Windows operating system?",
    choices: ["Apple", "Microsoft", "Google", "IBM"],
    answer: 1
  },
  {
    question: "What does 'CPU' stand for?",
    choices: ["Central Process Unit", "Computer Processing Unit", "Central Processing Unit", "Control Panel Unit"],
    answer: 2
  },
  {
    question: "Which programming language is used for web page styling?",
    choices: ["HTML", "CSS", "Java", "Python"],
    answer: 1
  },
  {
    question: "What does 'URL' stand for?",
    choices: ["Universal Resource Location", "Uniform Resource Locator", "United Resource Link", "Uniform Retrieval Link"],
    answer: 1
  },
  {
    question: "Which one is NOT a programming language?",
    choices: ["Java", "Python", "HTML", "C++"],
    answer: 2
  },
  {
    question: "What symbol is used in JavaScript to make a single-line comment?",
    choices: ["<!--", "//", "/*", "#"],
    answer: 1
  },
  {
    question: "Which protocol is used to send emails?",
    choices: ["FTP", "HTTP", "SMTP", "SSH"],
    answer: 2
  },
  {
    question: "Which of the following is a JavaScript framework?",
    choices: ["Laravel", "Django", "React", "Flask"],
    answer: 2
  },
  {
    question: "What device connects a local network to the internet?",
    choices: ["Router", "Switch", "Hub", "Bridge"],
    answer: 0
  }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const timerEl = document.getElementById('timer');

function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  timerEl.textContent = `⏳ Time left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏳ Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      feedbackEl.textContent = "⏱ Time's up!";
      disableChoices();
      nextBtn.style.display = "inline-block";
    }
  }, 1000);
}

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  choicesEl.innerHTML = "";
  feedbackEl.textContent = "";
  nextBtn.style.display = "none";
  timerEl.textContent = "";

  q.choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(index);
    choicesEl.appendChild(btn);
  });

  startTimer();
}

function disableChoices() {
  Array.from(choicesEl.children).forEach(btn => {
    btn.disabled = true;
  });
}

function checkAnswer(selected) {
  clearInterval(timer);
  const correct = questions[currentQuestion].answer;

  if (selected === correct) {
    feedbackEl.textContent = "✅ Correct!";
    score++;
  } else {
    feedbackEl.textContent = `❌ Wrong! Correct answer: ${questions[currentQuestion].choices[correct]}`;
  }

  scoreEl.textContent = `Score: ${score}`;
  disableChoices();
  nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  questionEl.textContent = "🎉 Quiz Complete!";
  choicesEl.innerHTML = "";
  feedbackEl.textContent = `Your final score is ${score}/${questions.length}`;
  timerEl.textContent = "";
  nextBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  scoreEl.textContent = "Score: 0";
  restartBtn.style.display = "none";
  loadQuestion();
}

nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Start the game
loadQuestion();
