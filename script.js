let next = document.querySelector("#next");
let start = document.querySelector("#start");
document.getElementById("start").style.zIndex = 7;
document.getElementById("next").style.zIndex = 6;
document.getElementById("c1").style.zIndex = 4;

let slideDeck = ["c3", "c4"];
let index = 0;
let card = '';

function nextQuestion () {
    card = slideDeck[index];
    card = document.getElementById(card);
    card.style.zIndex = 5;
    index++;
}

next.addEventListener("click", function(event) {
    event.stopPropagation();
    event.preventDefault();
    
    nextQuestion();
  
});

function startQuiz () {
    document.getElementById("start").style.zIndex = 0;
    document.getElementById("c1").style.zIndex = 0;
    document.getElementById("c2").style.zIndex = 5;
}

start.addEventListener("click", function(event) {
    event.stopPropagation();
    event.preventDefault();
    
    startQuiz();
  
});