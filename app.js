let timeText = document.querySelector('.h2-time');
let scoreText = document.querySelector('.h2-score')
let wordMain = document.querySelector('.h1-word')
let typeText = document.querySelector('.type');
let gameOver =document.querySelector('.gameover')

let countdown;
let timeLeft = 15;

const wordListEasy=[
    {id:1 ,word:"ไก่"},
    {id:2 ,word:"แมว"},
    {id:3 ,word:"ปลา"},
    {id:4 ,word:"หมา"},
    {id:5 ,word:"วัว"}
]

function gamePlay(){
    const randomNumber = Math.floor(Math.random() * wordListEasy.length);
    let randomWord = `${wordListEasy[randomNumber].word}`
    wordMain.innerHTML=randomWord
    if(!countdown){
        countTime();
    }
    typeText.addEventListener('input',function(){
        if(typeText.value === randomWord){
            timeLeft+=2
            typeText.value=""
            gamePlay();
        }
    })
    
}
function countTime(){
    countdown = setInterval(() => {
    timeText.innerHTML=`เวลา ${timeLeft} วินาที`;
    if (timeLeft === 0) {
        clearInterval(countdown);
    }
      timeLeft--
  }, 1000);
   
}
    


gamePlay();