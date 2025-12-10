let score = 0;
const questionElem = document.getElementById('question');
const choicesElem = document.getElementById('choices');
const scoreElem = document.getElementById('score');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
  const num1 = getRandomInt(1, 20);
  const num2 = getRandomInt(1, 20);
  const ops = ['+', '-', '*'];
  const op = ops[getRandomInt(0, ops.length - 1)];

  let correctAnswer;
  switch (op) {
    case '+': correctAnswer = num1 + num2; break;
    case '-': correctAnswer = num1 - num2; break;
    case '*': correctAnswer = num1 * num2; break;
  }

  const questionText = `What is ${num1} ${op} ${num2}?`;
  const answers = [correctAnswer];
  while (answers.length < 4) {
    const wrong = correctAnswer + getRandomInt(-10, 10);
    if (!answers.includes(wrong)) answers.push(wrong);
  }

  return {
    question: questionText,
    correct: correctAnswer,
    choices: shuffleArray(answers)
  };
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function showQuestion() {
  const q = generateQuestion();
  questionElem.textContent = q.question;
  choicesElem.innerHTML = '';
  q.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.onclick = () => {
      if (choice === q.correct) {
        score++;
        scoreElem.textContent = `Score: ${score}`;
        nextQuestion();
      } else {
        alert('Wrong answer! Try again.');
      }
    };
    choicesElem.appendChild(btn);
  });
}

function nextQuestion() {
  showQuestion();
}

showQuestion();
