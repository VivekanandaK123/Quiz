// Quiz data with questions, options, correct answers, and responses
const quizData = [
  {
    question:
      "In which movie does the character Tony Stark first appear as Iron Man?",
    options: [
      "A) The Avengers",
      "B) Iron Man",
      "C) Spider-Man: Homecoming",
      "D) Captain America: Civil War",
    ],
    correct: 1, // Index of correct answer (B)
    responses: [
      "The Avengers? Tony was already a suited-up genius by then! You're so late to the MCU party, you probably think Thanos is just a grumpy grape. Rewatch the origin story, rookie!",
      "Nailed it! Iron Man (2008) introduced Tony Stark's shiny armor and snarky charm. You're flying high like JARVIS, and I bet you've got RDJ's smirk down pat. Keep rocking that superhero IQ!",
      "Spider-Man? Tony's mentoring Peter, not debuting! Your MCU timeline's so tangled, it's like you let Loki mess with your brain. Swing back to the start of the Stark saga!",
      "Civil War? That's Team Iron Man vs. Team Cap, not Tony's first rodeo! Your pick's so off, it's like you think the suit was built in a group therapy session. Back to the cave, pal!",
    ],
  },
  {
    question:
      'Which 1999 film features the line, "You take the red pill, you stay in Wonderland"?',
    options: [
      "A) Fight Club",
      "B) The Matrix",
      "C) Star Wars: The Phantom Menace",
      "D) The Sixth Sense",
    ],
    correct: 1, // Index of correct answer (B)
    responses: [
      "Fight Club? Rule number one: that's not the right movie! You're throwing punches in the wrong matrix. Stop breaking the first rule and pick the sci-fi classic!",
      "Jacked in and correct! The Matrix dropped that iconic red pill line, rewiring our brains in '99. You're dodging bullets like Neo—now go hack reality with that trivia swagger!",
      "Phantom Menace? More like phantom answer! Jar Jar's not offering pills, just bad puns. Your choice is so far from the truth, it's stuck in a galaxy far, far away!",
      "Sixth Sense? No pills here, just dead people! Your guess is so off, it's like you're seeing ghosts instead of code. Plug back into the right movie, Morpheus wannabe!",
    ],
  },
  {
    question:
      "What is Elon Musk known for (other than tweeting like your drunk uncle)?",
    options: [
      "A) Making rockets",
      "B) Buying Twitter and turning it into X",
      "C) Being Tony Stark IRL (in his head)",
      "D) All of the above",
    ],
    correct: 3, // Index of correct answer (D)
    responses: [
      "Yes, but that's just one side of the madness.",
      "Yes, and since then Twitter became a meme battlefield with crypto bros and conspiracy theorists.",
      "He wishes. But RDJ still wins in charisma and not calling his employees aliens.",
      "Correct! He's the full combo pack: tech genius, billionaire, memelord, and walking HR risk. ✅",
    ],
  },
  {
    question: "Who won the FIFA World Cup 2022?",
    options: [
      "A) France",
      "B) Brazil",
      "C) Argentina",
      "D) The team you randomly supported to impress your crush",
    ],
    correct: 2, // Index of correct answer (C)
    responses: [
      "France almost did it. But then Messi reminded them that karma exists — especially when you get cocky at 80th minute.",
      "Brazil fans: dancing when it started, crying with dhol by the quarterfinal. Neymar's WiFi was down that day.",
      "Correct! Argentina and Messi finally did it. Goat unlocked, memes printed, and half of India claimed they were Messi fans since 2002. ✅",
      "Ah yes, the Insta-story-supporter. You didn't know offsides existed, but posted 'Vamosss' with a flag you thought was Portugal's.",
    ],
  },
  {
    question: "What ideology did Nazi Germany follow?",
    options: [
      "A) Communism",
      "B) Capitalism",
      "C) Nazism / Fascism",
      "D) Pure villain origin story",
    ],
    correct: 2, // Index of correct answer (C)
    responses: [
      "Wrong regime. Communism was chilling in the USSR corner.",
      "That's the American default setting.",
      "Correct! Nazism — the ideology that combined racism, war crimes, and the worst moustache trend of all time. ✅",
      "Also valid, but you won't find that in NCERT books.",
    ],
  },
];

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let answered = false;

// DOM elements
const introContainer = document.getElementById("introContainer");
const startBtn = document.getElementById("startBtn");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const responseElement = document.getElementById("response");
const nextBtn = document.getElementById("nextBtn");
const currentQuestionElement = document.getElementById("currentQuestion");
const totalQuestionsElement = document.getElementById("totalQuestions");
const progressFill = document.getElementById("progressFill");
const quizContainer = document.getElementById("quizContainer");
const resultsContainer = document.getElementById("resultsContainer");
const finalScoreElement = document.getElementById("finalScore");
const resultsSummaryElement = document.getElementById("resultsSummary");
const restartBtn = document.getElementById("restartBtn");

// Initialize quiz
function initQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  answered = false;

  introContainer.style.display = "none";
  quizContainer.style.display = "block";
  resultsContainer.style.display = "none";

  totalQuestionsElement.textContent = quizData.length;
  loadQuestion();
}

// Start quiz function
function startQuiz() {
  introContainer.style.display = "none";
  quizContainer.style.display = "block";
  resultsContainer.style.display = "none";

  totalQuestionsElement.textContent = quizData.length;
  loadQuestion();
}

// Load current question
function loadQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];

  questionElement.textContent = currentQuestion.question;
  currentQuestionElement.textContent = currentQuestionIndex + 1;

  // Update progress bar
  const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
  progressFill.style.width = `${progress}%`;

  // Clear previous options and response
  optionsElement.innerHTML = "";
  responseElement.innerHTML = "";
  responseElement.classList.remove("show");
  nextBtn.style.display = "none";
  answered = false;

  // Create option buttons
  currentQuestion.options.forEach((option, index) => {
    const optionButton = document.createElement("div");
    optionButton.className = "option";
    optionButton.textContent = option;
    optionButton.addEventListener("click", () => selectOption(index));
    optionsElement.appendChild(optionButton);
  });
}

// Handle option selection
function selectOption(selectedIndex) {
  if (answered) return;

  answered = true;
  const currentQuestion = quizData[currentQuestionIndex];
  const options = document.querySelectorAll(".option");
  const isCorrect = selectedIndex === currentQuestion.correct;

  // Store user's answer
  userAnswers.push({
    question: currentQuestion.question,
    selectedOption: currentQuestion.options[selectedIndex],
    isCorrect: isCorrect,
    response: currentQuestion.responses[selectedIndex],
  });

  // Update score if correct
  if (isCorrect) {
    score++;
  }

  // Style the selected option
  options[selectedIndex].classList.add(isCorrect ? "correct" : "incorrect");

  // If incorrect, also highlight the correct answer
  if (!isCorrect) {
    options[currentQuestion.correct].classList.add("correct");
  }

  // Disable all options
  options.forEach((option) => option.classList.add("disabled"));

  // Show response
  responseElement.innerHTML = currentQuestion.responses[selectedIndex];
  responseElement.classList.add("show");

  // Show next button or finish quiz
  if (currentQuestionIndex < quizData.length - 1) {
    nextBtn.style.display = "block";
    nextBtn.textContent = "Next Question";
  } else {
    nextBtn.style.display = "block";
    nextBtn.textContent = "Show Results";
  }
}

// Move to next question or show results
function nextQuestion() {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showResults();
  }
}

// Show final results
function showResults() {
  quizContainer.style.display = "none";
  resultsContainer.style.display = "block";

  // Calculate and display score
  const percentage = Math.round((score / quizData.length) * 100);
  finalScoreElement.innerHTML = `${score}/${quizData.length}<br><span style="font-size: 1.5rem; color: #666;">${percentage}%</span>`;

  // Create results summary
  let summaryHTML = "";
  userAnswers.forEach((answer, index) => {
    summaryHTML += `
            <div class="result-item ${
              answer.isCorrect ? "correct" : "incorrect"
            }">
                <div class="result-question">Q${index + 1}: ${
      answer.question
    }</div>
                <div class="result-answer">Your answer: ${
                  answer.selectedOption
                }</div>
                <div class="result-status ${
                  answer.isCorrect ? "correct" : "incorrect"
                }">
                    ${answer.isCorrect ? "✓ Correct" : "✗ Incorrect"}
                </div>
                <div style="margin-top: 10px; font-style: italic; color: #555;">
                    "${answer.response}"
                </div>
            </div>
        `;
  });

  resultsSummaryElement.innerHTML = summaryHTML;
}

// Event listeners
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", initQuiz);

// Show intro page initially
introContainer.style.display = "block";
quizContainer.style.display = "none";
resultsContainer.style.display = "none";
