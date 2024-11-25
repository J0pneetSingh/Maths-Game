// Load the background music
const backgroundMusic = new Audio('music/background-music.mp3');
backgroundMusic.loop = true;  // Loop the background music
backgroundMusic.volume = 0.2; // Set the volume

// Load sound files for correct and wrong answers, and time up sound
const correctSound = new Audio('sounds/correct.wav');
const wrongSound = new Audio('sounds/wrong.wav');
const timeUpSound = new Audio('sounds/timeup.wav');

// Game variables
let isMusicPlaying = true;
let score = 0;
let level = 1;
let currentQuestionIndex;
let timeLeft = 30;
let timer;
let questions = [
    {
        question: "What is the speed if a car travels 100 meters in 20 seconds?",
        answer: "5"
    },
    {
        question: "If you travel 150 meters in 30 seconds, what is your speed?",
        answer: "5"
    },
    {
        question: "A cyclist covers 200 meters in 40 seconds. What is their speed?",
        answer: "5"
    },
    {
        question: "If a train moves 600 meters in 90 seconds, what is the speed?",
        answer: "6.67"
    },
    {
        question: "A runner covers 800 meters in 100 seconds. What is the speed?",
        answer: "8"
    }
];

// Start the background music
backgroundMusic.play();

// Toggle music play/pause
function toggleMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
    } else {
        backgroundMusic.play();
    }
    isMusicPlaying = !isMusicPlaying;
}

// Start the game
function startGame() {
    document.getElementById("tutorial").style.display = "none";
    document.getElementById("game").style.display = "block";
    score = 0;
    level = 1;
    timeLeft = 30;
    updateScore();
    updateLevel();
    nextQuestion();
    startTimer();
}

// Start the timer
function startTimer() {
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timerValue").textContent = timeLeft;
        document.getElementById("progressBar").value = 30 - timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            timeUpSound.play();  // Play time-up sound
            alert("Time's up! The correct answer was: " + questions[currentQuestionIndex].answer);
            nextQuestion();
        }
    }, 1000);
}

// Show the next question
function nextQuestion() {
    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    document.getElementById("question").textContent = questions[currentQuestionIndex].question;
    document.getElementById("userAnswer").value = '';
    timeLeft = 30;
    document.getElementById("timerValue").textContent = timeLeft;
    document.getElementById("progressBar").value = 0;
    startTimer();
}

// Check the user's answer
function checkAnswer() {
    const userAnswer = document.getElementById("userAnswer").value;
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (userAnswer === correctAnswer) {
        correctSound.play();  // Play correct sound
        score += 1;
        alert("Correct! Well done.");
    } else {
        wrongSound.play();    // Play wrong sound
        alert("Wrong answer. The correct answer was: " + correctAnswer);
    }

    updateScore();
    updateLevel();
    nextQuestion();
}

// Update the score display
function updateScore() {
    document.getElementById("score").textContent = "Score: " + score;
}

// Update the level display
function updateLevel() {
    if (score % 5 === 0 && score > 0) {
        level += 1;
        document.getElementById("level").textContent = "Level: " + level;
    }
}

// End the game
function endGame() {
    document.getElementById("game").style.display = "none";
    document.getElementById("gameOver").style.display = "block";
    document.getElementById("finalScore").textContent = score;
}

// Restart the game
function restartGame() {
    document.getElementById("gameOver").style.display = "none";
    startGame();
}
