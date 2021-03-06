let start = document.querySelector("#start");
let next = document.querySelector("#next");
let submit = document.querySelector("#submit");
let submitFinal = document.querySelector("#subFinal");
let exit = document.querySelector("#exit");
let timer = document.querySelector("#timer");
let score = document.querySelector("#score");
let final = document.querySelector("#final");
let highCard = document.querySelector("#highScores");
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
let finalTimer = 0;
let canceled = false;
score.textContent = "Total Score: " + points;

let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

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

    document.getElementById("submit").style.zIndex = 14;

}

function submitAns () {
    let radios = document.querySelectorAll('input[name="answer"]');
    let selectedVal = '';
    let isSelected = false;
        for (let radio of radios) {
            if (radio.checked) {
                selectedVal = radio.value;
                isSelected = true;
                radio.checked = false;
            }
        }
        if (isSelected == false){
          document.getElementById("submit").style.zIndex = 14;
        }
        else if (selectedVal == "correct") {
          document.getElementById("rightAns").style.zIndex = 14;
          points = points + 10;
          score.textContent = "Total Score: " + points;
          document.getElementById("submit").style.zIndex = 0;
        }
        else{
          document.getElementById("wrongAns").style.zIndex = 14;
          score.textContent = "Total Score: " + points;
          timeLeft = timeLeft - 10;
          document.getElementById("submit").style.zIndex = 0;
        }

        if (index == 10) {
          document.getElementById("subFinal").style.zIndex = 14;
        }
        // console.log(selectedVal);
}

function finalPage() {
    finalTimer = timeLeft;
    canceled = true;
    document.getElementById("c13").style.zIndex = 12;
    document.getElementById("exit").style.zIndex = 14;
    document.getElementById("rightAns").style.zIndex = 0;
    document.getElementById("wrongAns").style.zIndex = 0;
    final.innerHTML = "Final Score: " + points + "<br />" + "Time Remaining: " + finalTimer + " seconds.";
    let promptInitials = prompt("Please enter your three initials:");
    let initials = promptInitials.toUpperCase();
    // console.log(initials);
    while (promptInitials.length > 3 || promptInitials.length < 3) {
      promptInitials = prompt("Please enter your three initials:");
    }
    let setHighScores = {
      initials: initials,
      endScore: points,
      endTime: finalTimer 
    };

    highScores.push(setHighScores);

    highScores.sort(function(a, b) {
      return a.endScore - b.endScore;
    });

    highScores.sort(function(a, b) {
      return a.endTime - b.endTime;
    });

    // console.log(highScores);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayScore();
  }

function countDown() {
    timeLeft = 180;
  
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
      if (timeLeft <= 0) {
        timeLeft = 0;
        finalPage();
      }
      if (canceled == true) {
        clearInterval(timeInterval);
      }
    }, 1000);


  }

let displayScore = function() {
  
if (highScores.length > 5){
  for (let i = (highScores.length - 5); i < highScores.length; i++) {
    // console.log(highScores[i]);

    let table = document.getElementById("highScores");
  
    let resultsRow = table.insertRow(1);
    let cell1 = resultsRow.insertCell(0);
    let cell2 = resultsRow.insertCell(1);
    let cell3 = resultsRow.insertCell(2);
    let cell4 = resultsRow.insertCell(3);
    
    if(highScores.length - i != 0){
    cell1.innerHTML = (highScores.length - i) + ".";}
    cell2.innerHTML = highScores[i].initials;
    cell3.innerHTML = highScores[i].endScore;
    cell4.innerHTML = highScores[i].endTime;
  }
}

  else{
    for (let i = 0; i < 5; i++) {
    // console.log(highScores[i]);

    let table = document.getElementById("highScores");
  
    let resultsRow = table.insertRow(1);
    let cell1 = resultsRow.insertCell(0);
    let cell2 = resultsRow.insertCell(1);
    let cell3 = resultsRow.insertCell(2);
    let cell4 = resultsRow.insertCell(3);
    
    if(highScores.length - i != 0){
    cell1.innerHTML = (highScores.length - i) + ".";}
    cell2.innerHTML = highScores[i].initials;
    cell3.innerHTML = highScores[i].endScore;
    cell4.innerHTML = highScores[i].endTime;
  }
}}


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

submitFinal.addEventListener("click", function(event) {
    event.stopPropagation();
    event.preventDefault();
    finalPage();
  

});

exit.addEventListener("click", function(event) {
  event.stopPropagation();
  event.preventDefault();
  window.location.reload();

});
