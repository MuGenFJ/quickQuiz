const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


if(mostRecentScore <= 0){
    finalScore.innerText = mostRecentScore  + " point";
}else{
    finalScore.innerText = mostRecentScore  + " points";
}

username.addEventListener("keyup", () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore, //Math.floor(Math.random() * 100),
        name: username.value
    };
    highScores.push(score); 
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("../index.html");
};