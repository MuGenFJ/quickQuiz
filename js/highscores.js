const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores.map(thescoreitself => {
    return `<li class="high-score">${thescoreitself.name} - ${thescoreitself.score}</li>`;
})
.join("");