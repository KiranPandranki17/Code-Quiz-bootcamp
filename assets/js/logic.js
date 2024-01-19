// Get DOM elements
var timerElement = document.querySelector("#time");
var startQuizButton = document.querySelector("#start");
var questionsContainer = document.querySelector("#questions");
var choicesContainer = document.querySelector("#choices");
var initialsInput = document.querySelector("#initials");
var submitButton = document.querySelector("#submit");
var feedbackElement = document.querySelector("#feedback");

// Object for a quiz, which will have question objects
var currentQuestionIndex = 0;
var timeRemaining = questions.length * 15;
var timerId;

// Looping through the array of questions and answers to create a list of buttons
function displayQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var questionTitleElement = document.getElementById("question-title");
    questionTitleElement.textContent = currentQuestion.question;
    choicesContainer.innerHTML = "";
    currentQuestion.choices.forEach(function (option, i) {
      var optionButton = document.createElement("button");
      optionButton.setAttribute("value", option);
      optionButton.textContent = i + 1 + ". " + option;
      optionButton.addEventListener("click", handleQuestionClick);
      choicesContainer.appendChild(optionButton);
    });
  }
  
  // Checking for the right answer and deducting time off for the wrong answer
  function handleQuestionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
      timeRemaining -= 10;
      if (timeRemaining < 0) {
        timeRemaining = 0;
      }
      timerElement.textContent = timeRemaining;
      feedbackElement.textContent = `Incorrect! The correct answer was ${questions[currentQuestionIndex].answer}.`;
      feedbackElement.style.color = "red";
    } else {
      feedbackElement.textContent = "Correct!";
      feedbackElement.style.color = "green";
    }
    feedbackElement.setAttribute("class", "feedback");
    setTimeout(function () {
      feedbackElement.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if (currentQuestionIndex === questions.length) {
      endQuiz();
    } else {
      displayQuestion();
    }
  }


// Showing the final score and resetting everything when the quiz is overShowing the final score and resetting everything when the quiz is over
  // When the quiz ends, the questions are hidden, the timer stops, and the final score is displayed
function endQuiz() {
    clearInterval(timerId);
    var endScreenElement = document.getElementById("end-screen");
    endScreenElement.removeAttribute("class");
    var finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = timeRemaining;
    questionsContainer.setAttribute("class", "hide");
  }
  
  // Stop the quiz if the timer reaches 0
  function updateTimer() {
    timeRemaining--;
    timerElement.textContent = timeRemaining;
    if (timeRemaining <= 0) {
      endQuiz();
    }
  }
  
  // Save user's name and the score in local storage
  function saveHighScore() {
    var userInitials = initialsInput.value.trim();
    if (userInitials !== "") {
      var highScores =
        JSON.parse(window.localStorage.getItem("highScores")) || [];
      var latestScore = { score: timeRemaining, initials: userInitials };
      highScores.push(latestScore);
      window.localStorage.setItem("highScores", JSON.stringify(highScores));
      alert("Your score has been submitted");
    }
  }

  
// After pressing Enter, it saves the user's score
function handleEnterKey(event) {
    if (event.key === "Enter") {
      saveHighScore();
      alert("Your score has been submitted");
    }
  }
  
  // Also responds to an Enter key if you want
  initialsInput.onkeyup = handleEnterKey;
  
  // After clicking submit, it saves the user's score
  submitButton.addEventListener("click", saveHighScore);
  
  // Starts quiz when you click the start button
  startQuizButton.addEventListener("click", startQuiz);
