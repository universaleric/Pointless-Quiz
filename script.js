let start = document.querySelector("#start");
let next = document.querySelector("#next");
let submit = document.querySelector("#submit");
let exit = document.querySelector("#exit");
let timer = document.querySelector("#timer");
let score = document.querySelector("#score");
document.getElementById("start").style.zIndex = 15;
document.getElementById("submit").style.zIndex = 14;
document.getElementById("next").style.zIndex = 13;
document.getElementById("c2").style.zIndex = 12;

let slideDeck = ["c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "c11", "c12"];
let index = 0;
let card = '';
let timerStart = false;
let points = 0;
let timeLeft;
score.textContent = "Total Score: " + points;

function startQuiz () {
    document.getElementById("start").style.zIndex = 0;
    document.getElementById("c3").style.zIndex = 12;
    nextQuestion();
}

function nextQuestion () {
    document.getElementById("rightAns").style.zIndex = 0;
    document.getElementById("wrongAns").style.zIndex = 0;
    card = slideDeck[index];
    card = document.getElementById(card).style.zIndex = 12;
    index++;

    if (timerStart === false) {
        timerStart = true;
        countDown();
    }

    if (index == 10) {
      document.getElementById("exit").style.zIndex = 14;
    }
    else{
      document.getElementById("submit").style.zIndex = 14;
    }
}

function submitAns () {
    document.getElementById("submit").style.zIndex = 0;
    let radios = document.querySelectorAll('input[name="answer"]');
    let selectedVal;
        for (let radio of radios) {
            if (radio.checked) {
                selectedVal = radio.value;
            }
        }
        if (selectedVal == "correct") {
          document.getElementById("rightAns").style.zIndex = 14;
          points = points + 10;
          score.textContent = "Total Score: " + points;
        }
        else{
          document.getElementById("wrongAns").style.zIndex = 14;
          score.textContent = "Total Score: " + points;
          timeLeft = timeLeft - 5;
        }    
        console.log(selectedVal);
}

function countDown() {
    timeLeft = 90;
  
    let timeInterval = setInterval(function () {
      if (timeLeft > 1) {
        timer.textContent = timeLeft + ' seconds remaining';
        timeLeft--;
      } else if (timeLeft === 1) {
        timer.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else {
        timer.textContent = '';
        clearInterval(timeInterval);
      }
    }, 1000);
  }

start.addEventListener("click", function(event) {
    event.stopPropagation();
    event.preventDefault();
    
    startQuiz();
    
});

next.addEventListener("click", function(event) {
    event.stopPropagation();
    event.preventDefault();
    
    nextQuestion();
  
});

submit.addEventListener("click", function(event) {
    event.stopPropagation();
    event.preventDefault();

    submitAns();

});

exit.addEventListener("click", function(event) {
  event.stopPropagation();
  event.preventDefault();
  window.location.reload();

});
