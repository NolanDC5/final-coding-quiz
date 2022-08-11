var questionsEl = document.querySelector("#questions");
var selection = document.querySelector("#selection");
var highScoreBoxEl = document.querySelector('#high-score-box');
var submitButtonEl = document.querySelector('#submitbutton');

let countdown;


var startButton = document.querySelector("#start-btn");
var timeSecond = questions.length *15;

startButton.addEventListener("click", function() {
    
    var countdownEl = document.querySelector("#timeleft");
    countdownEl.innerHTML =`00:${timeSecond}`;

    countdown = setInterval (()=>{
        timeSecond--;
        countdownEl.innerHTML =`00:${timeSecond}`;
        if(timeSecond <= 0 || timeSecond < 1){
            clearInterval(countdown);
            endQuiz();
        }
    },1000)
  });


 
  let currentQuestionIndex = 0;

  function startGame() {
    
    var currentQuestion = questions[currentQuestionIndex];

    startButton.className = "hide";
    selection.classList.remove('hide');
    questionsEl.className = "hide";
    selection.textContent = "";      

 
   
      var h1 = document.createElement("H1");
      h1.style.textAlign = "center";
      h1.textContent = questions[currentQuestionIndex].question;
      selection.appendChild(h1);
    
    currentQuestion.options.forEach((answer, index) => {
      var buttonOption = document.createElement("button");
      buttonOption.setAttribute("class", "answerbuttons")
      buttonOption.textContent  = `${index + 1}. ${answer}`;
      buttonOption.addEventListener('click', function () {
        answerClick(answer);
      });
    
      selection.append(buttonOption)
    });
    
}
    function answerClick(answer) {
      console.log('answer function')
      if (answer === questions[currentQuestionIndex].answer) {
      } else {
        timeSecond = timeSecond-5; 
      }
      currentQuestionIndex++;
      if (currentQuestionIndex === questions.length){
          endQuiz();
      } else {
        startGame();
      }
    }
  

function endQuiz() {
  clearInterval(countdown);
  questionsEl.classList.remove('hide');
    questionsEl.textContent = "All done!";
    selection.textContent = "Your final score is " + [timeSecond] + ".";
    selection.setAttribute("class", "final-score-text")
    highScoreBoxEl.classList.remove('hide');
    highScoreBoxEl.setAttribute("class", "high-score-div")
}

    
function saveHighScores() {

  if (document.getElementById('input').value != "") {
    var highScores =
      JSON.parse(window.localStorage.getItem("highScores")) || [];

    
    var newScore = {
      initials: document.getElementById('input').value,
      score: timeSecond,
    };

    highScores.push(newScore);

    window.localStorage.setItem("highScores", JSON.stringify(highScores));

    
    window.location.href = "scores.html";
  }

}



startButton.addEventListener("click", startGame);
    
submitButtonEl.addEventListener("click", saveHighScores);
    








        










   