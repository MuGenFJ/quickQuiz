const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        "question": "What is the Kanji of [to run] ?",
        "choice1": "走れる",
        "choice2": "覚える",
        "choice3": "行く",
        "choice4": "散歩",
        "answer": 1
      },
      {
        "question": "[Select the right translation] : \nI'll go probably with my family in Tokyo next winter.",
        "choice1": "東京に行こうと思っています。",
        "choice2": "友達に会って海に行くつもりです。",
        "choice3": "次の冬家族と東京に行くでしょう。",
        "choice4": "冬家族と遊びに行くつもりです。",
        "answer": 3
      },
      {
        "question": "How do we say [Flashlight] in Japanese ?",
        "choice1": "電灯",
        "choice2": "電池",
        "choice3": "電気",
        "choice4": "懐中電灯",
        "answer": 4
      },
      {
        "question": "What is the Kanji of [inconvenient] ?",
        "choice1": "便利",
        "choice2": "大事",
        "choice3": "不便",
        "choice4": "封筒",
        "answer": 3
      },
      {
        "question": "[Select the right translation] : \nSince my japanese is not so good, i try to study everyday.",
        "choice1": "僕の日本語はあまり上手じゃないので毎日勉強するようにしています。",
        "choice2": "毎日日本語を勉強すれば上手になりますよ。",
        "choice3": "日本語は難しいですが面白いとおもいます。",
        "choice4": "先生が言ったとおりにテストは複雑でした。",
        "answer": 1
      },
]

// Constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = questions.length;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("../pages/end.html");
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} / ${MAX_QUESTIONS}`;
    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();

        }, 1000);
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame();