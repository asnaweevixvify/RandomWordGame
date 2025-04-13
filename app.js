let timeText = document.querySelector('.h2-time');
let scoreText = document.querySelector('.h2-score')
let wordMain = document.querySelector('.h1-word')
let typeText = document.querySelector('.type').value;


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
    countTime();
}
function countTime(){
const countdown = setInterval(() => {
    timeText.innerHTML=`เวลา ${timeLeft} วินาที`;
    timeLeft--
    if (timeLeft < 0) {
        clearInterval(countdown);
      }
  }, 1000);
}
gamePlay();