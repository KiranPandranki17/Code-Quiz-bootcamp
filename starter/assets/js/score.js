// Function to rank the scores in order by retrieving them from local storage
function displayHighScores() {
    let scoresArray = JSON.parse(window.localStorage.getItem("highScores")) || [];
  
    // Sorting scores in descending order
    scoresArray.sort(function (a, b) {
      return b.score - a.score;
    });
  
    // Displaying scores in the HTML
    scoresArray.forEach(function (score) {
      var listItemElement = document.createElement("li");
      listItemElement.textContent = score.initials + " - " + score.score;
      var highScoresListElement = document.getElementById("highscores");
      highScoresListElement.appendChild(listItemElement);
    });
  }
  
  // Function to clear previous scores when the button is clicked
  function clearScores() {
    window.localStorage.removeItem("highScores");
    window.location.reload();
  }
  
  // Event listener for the clear button
  document.getElementById("clear").addEventListener("click", clearScores);
  
  // Display high scores on page load
  displayHighScores();
  