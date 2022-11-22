//variables

const second = 1000;
const minute = second*60;
let isPaused = false;
let timeInterval;
//time-interval
let interval = 45*minute;
let gap = interval;

//selectors

const timeLine = document.querySelector("#time-line");
const pauseButton = document.querySelector("#pause");
const stopButton = document.querySelector("#stop");
const startButton = document.querySelector("#start");

//event listners

//pause/resume
pauseButton.addEventListener("click",()=>{
    if(isPaused){
        pauseButton.textContent="pause";
        timeInterval = setInterval(tick,1000);
        isPaused= false;
    } else {
        pauseButton.textContent="resume";
        clearInterval(timeInterval);
        isPaused = true;
    }
});

//stop
stopButton.addEventListener("click",()=>{
    clearInterval(timeInterval);
    // set cirrent time-line time to default value
    updateTime(interval);
    gap = interval;
    stopButton.style.display="none";
    startButton.style.display="block";
    pauseButton.style.display="none";
    //pause reset if it was set
    if(isPaused){
        pauseButton.textContent="pause";
        isPaused = false;
    }
});

//start
startButton.addEventListener("click",()=>{
    startButton.style.display="none";
    stopButton.style.display="block";
    pauseButton.style.display="block";
    timeInterval = setInterval(tick,1000);
});

//functions
function updateTime(time){
    timeLine.innerHTML=String(Math.trunc(time/minute)).padStart(2,"0")+":"+String(time%minute/second).padStart(2,"0");
}

function tick(){
    gap-=1000;
    console.log(String(gap%minute));
    updateTime(gap);
}

updateTime(gap);
