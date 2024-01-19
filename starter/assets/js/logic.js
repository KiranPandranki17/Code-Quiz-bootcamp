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