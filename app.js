let timeText = document.querySelector('.h2-time');
let scoreText = document.querySelector('.h2-score')
let wordMain = document.querySelector('.h1-word')
let typeText = document.querySelector('.type');
let gameOver =document.querySelector('.gameover')
let modeSelect = document.querySelector('#select');
let resetText = document.querySelector('.h1-buttonnull')
let scoreOver = document.querySelector('.h1-scoreover')
let highScoreText = document.querySelector('.h1-highscore')
let randomWord='';
let countdown;
let timeLeft = 10;
let wordListEasy = '';
let wordListMedium = '';
let wordListHard = '';
let score = 0;
let highScore;

let allDataLoaded = 0; // 

let saveMode;
    if (localStorage.getItem('mode') !== null) {
        saveMode = localStorage.getItem('mode');
      } else {
        saveMode = 'ปานกลาง';
      }
      modeSelect.value = saveMode;

highScore = localStorage.getItem('latestHighScore')
    if(!highScore){
    localStorage.setItem('latestHighScore',0)
    }
    else{
    highScoreText.innerHTML=`คะแนนมากที่สุดของคุณ = ${highScore}`
    }

fetch("easy.json")
.then(res => res.json())
.then(json => {
    wordListEasy = json.words;
    allDataLoaded++;
    checkDataLoaded();
});

fetch("medium.json")
.then(res => res.json())
.then(json => {
    wordListMedium = json.words;
    allDataLoaded++;
    checkDataLoaded();
});

fetch("hard.json")
.then(res => res.json())
.then(json => {
    wordListHard = json.words;
    allDataLoaded++;
    checkDataLoaded();
});


function checkDataLoaded() {
    if (allDataLoaded === 3) {
        gamePlay();  
    }
}

typeText.addEventListener('input',function(){
    if(typeText.value === randomWord){
        timeLeft+=3
        score ++
        scoreText.innerHTML=`${score} คะแนน`
        typeText.value=""
        gamePlay();
    }
})
modeSelect.addEventListener('change',function(e){
    let level = e.target.value;
    clearInterval(countdown);  
    countdown = null;         
    timeLeft = 10;   
    score = 0;          
    timeText.innerHTML = `เวลา ${timeLeft} วินาที`; 
    typeText.value = "";       
    gameOver.classList.replace('gameoverbg', 'gameover'); 
    localStorage.setItem("mode",level)
    gamePlay();                
    
})

function gamePlay(){
    const randomNumber = Math.floor(Math.random() * wordListEasy.length);
    if(modeSelect.value === "ง่าย"){
    randomWord = `${wordListEasy[randomNumber]}`
    wordMain.innerHTML=randomWord
    }
    else if(modeSelect.value === "ปานกลาง"){
        randomWord = `${wordListMedium[randomNumber]}`
        wordMain.innerHTML=randomWord
    }
    else if(modeSelect.value === "ยาก"){
        randomWord = `${wordListHard[randomNumber]}`
        wordMain.innerHTML=randomWord
    }

    if(!countdown){
        countTime();
    }
}

function countTime(){
    countdown = setInterval(() => {
    timeText.innerHTML=`เวลา ${timeLeft} วินาที`;
    if (timeLeft === 0) {
        clearInterval(countdown);
        gameOver.classList.replace('gameover','gameoverbg')
        scoreOver.innerHTML=`คะแนนของคุณเท่ากับ ${score} คะแนน`
        
        if(score>highScore){
            highScore = score
            localStorage.setItem('latestHighScore', highScore)
            highScoreText.innerHTML=`คะแนนมากที่สุดของคุณ = ${highScore}`
        }
    }
      timeLeft--
  }, 1000);
   
}
function resetGame(){
    clearInterval(countdown);  
    countdown = null;         
    timeLeft = 10;             
    timeText.innerHTML = `เวลา ${timeLeft} วินาที`; 
    typeText.value = "";       
    gameOver.classList.replace('gameoverbg', 'gameover'); 
    score = 0;
    scoreText.innerHTML=`${score} คะแนน`
    gamePlay();                
}
    


