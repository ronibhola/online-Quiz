const questions = [
    {
        question: "Which team win the T-20 worldcup of 2024?",
        answers: [
            {text: "India", correct: true},
            {text: "South Africa", correct: false},
            {text: "England", correct: false},
            {text: "Afghanistan", correct: false},
        ]
    },

    {
        question: "When was the first train started in India?",
        answers: [
            {text: "1823", correct: false},
            {text: "1853", correct: true},
            {text: "1902", correct: false},
            {text: "1843", correct: false},
        ]
    },

    {
        question: "Which is the smallest country in the world?",
        answers: [
            {text: "Monaco", correct: false},
            {text: "Nauru", correct: false},
            {text: "San Marino", correct: false},
            {text: "Vatican City", correct: true},
        ]
    },

    {
        question: "Tripitakas are sacred books of?",
        answers: [
            {text: "Buddhists", correct: true},
            {text: "Hindus", correct: false},
            {text: "Jains", correct: false},
            {text: "None of the above", correct: false},
        ]
    },

    {
        question: "Brass gets discoloured in air because of the presence of which of the following gases in air?",
        answers: [
            {text: "Oxygen", correct: false},
            {text: "Hydrogen sulphide", correct: true},
            {text: "Carbon dioxide", correct: false},
            {text: "Nitrogen", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
