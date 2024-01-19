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