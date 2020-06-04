var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "What does JSON stand for?",
      choices: ["javascript obong notation", "jelloshot object notation", "javascript object notification", "javascript object notation"],
      answer: "javascript object notation"
    },
    {
      title: "Which of these is NOT a front-end development language?",
      choices: ["html", "sql", "css", "javascript"],
      answer: "sql"
    },
    {
      title: "Which of these symbols is the css class selector?",
      choices: [".", "!", "<>", "#"],
      answer: "."
    }
  ];
  
  //Query Selector Block
  var titleEl = document.querySelector("#title");
  var choice1El = document.querySelector("#choice1");
  var choice2El = document.querySelector("#choice2");
  var choice3El = document.querySelector("#choice3");
  var choice4El = document.querySelector("#choice4");
  var commentEl = document.querySelector("#comment");
  var timerEl = document.querySelector("#timer");
  var quizEl = document.querySelector("#quiz");
  var scoreEl = document.querySelector("#highscore");
  var scoreListEl = document.querySelector("#scoreList");
  var landingEl = document.querySelector("#landing");
  var finalScoreEl = document.querySelector("#finalScore");
  
  //Counting Variables
  var currentQuestion = 0;
  var countdown = 75;
  var finalTime = 0;
  var quizFinished = false;
  var scores = [];
  
  function startQuiz () {
    landingEl.classList.add("hide");
    getQuestion();
    startTimer();
    quizEl.classList.remove("hide");
  }
  
  document.getElementById("start").addEventListener("click", startQuiz);
  
  function startTimer (){
    timerEl.textContent =  "Time: " + countdown--;
    var result = setInterval(function(){
      timerEl.textContent =  "Time: " + countdown--;
      if (countdown <= 0 || quizFinished) {
        clearInterval(result);
        //high score page
      }
    }, 1000);
  };
  
  function getQuestion() {
    titleEl.textContent = questions[currentQuestion].title;
    choice1El.textContent = questions[currentQuestion].choices[0];
    choice2El.textContent = questions[currentQuestion].choices[1];
    choice3El.textContent = questions[currentQuestion].choices[2];
    choice4El.textContent = questions[currentQuestion].choices[3];
  }
  
  document.addEventListener("click", function(event){
    //validate the answer
    if (event.target.matches("button")){
      commentEl.textContent = "";
      commentEl.classList.remove("hide");
  
      if (event.target.textContent === questions[currentQuestion].answer) {
        commentEl.textContent = "Correct!";
        currentQuestion++; 
        if (questions.length === currentQuestion) {
          showScore();
        } else {
          getQuestion();
          setTimeout(function(){ 
            commentEl.classList.add("hide");
          }, 1000);
        }
      } else {
        countdown = countdown - 15;
        commentEl.textContent = "Wrong!";
        setTimeout(function(){ 
          commentEl.classList.add("hide");
        }, 1000);
      }
    }
  
  })
  
  // View score and enter initials
  function showScore() {
    finalTime = countdown;
    quizFinished = true;
    landingEl.classList.add("hide");
    finalScoreEl.textContent = "Final Score: " + finalTime;
    scoreEl.classList.remove("hide");
    quizEl.classList.add("hide");
  }
  
  function renderScores() {
    landingEl.classList.add("hide");
    scoreEl.classList.add("hide");
    quizEl.classList.add("hide");
    scoreListEl.classList.remove("hide");
    var list = document.querySelector("ul");
    list.innerHTML = "";
    for (var i = 0; i < scores.length; i++) {
        var score = scores[i];
        var li = document.createElement("li");
        li.classList.add("list-group-item");
        li.textContent = score;
        list.appendChild(li);
    }
  }
  
  function saveScore() {
    var initials = document.querySelector("input").value;
    scores.push(initials + "........... " + finalTime);
    localStorage.setItem("scores", JSON.stringify(scores));
    renderScores();
  }
  
  function loadScores() {
    scores = JSON.parse(localStorage.getItem("scores")) || [];
  }
  
  function reset() {
    scoreListEl.classList.add("hide");
    landingEl.classList.remove("hide");
    currentQuestion = 0;
    countdown = 75;
    finalTime = 0;
    quizFinished = false;
  }
  
  function clearScores() {
    localStorage.clear();
    scores = [];
    renderScores();
  }
  
  loadScores();