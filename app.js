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
const progressBar = document.querySelector("#current-progress");
//event listners

//pause/resume
pauseButton.addEventListener("click",()=>{
    if(isPaused){
        pauseButton.textContent="pause";
        timeInterval = setInterval(tick,1000);
        isPaused= false;
        //progress bar configuring
        progressBar.style.backgroundColor="#3EE08C";
    } else {
        pauseButton.textContent="resume";
        clearInterval(timeInterval);
        isPaused = true;
        //progress bar configuring
        progressBar.style.backgroundColor="#FFCE5C";
    }
});

//stop
stopButton.addEventListener("click",()=>{
    clearInterval(timeInterval);
    // set cirrent time-line time to default value
    updateTime(interval);
    gap = interval;
    stopButton.style.display="none";
    pauseButton.style.display="none";
    //pause reset if it was set
    if(isPaused){
        pauseButton.textContent="pause";
        isPaused = false;
    }
    //progress bar configuring
    progressBar.style.backgroundColor="#F64740";
    progressBar.style.transition =" width 1s linear";
    progressBar.style.width=`0%`;
    progressBar.addEventListener('transitionend',()=>{
        startButton.style.display="block";
        progressBar.style.transition =" none";
    });
});

//start
startButton.addEventListener("click",()=>{
    startButton.style.display="none";
    stopButton.style.display="block";
    pauseButton.style.display="block"; 
    //progress bar configuring
    progressBar.style.width=`0%`;
    progressBar.style.backgroundColor="#3EE08C";
    timeInterval = setInterval(tick,1000);

});

//functions
function updateTime(time){
    timeLine.innerHTML=String(Math.trunc(time/minute)).padStart(2,"0")+":"+String(time%minute/second).padStart(2,"0");
}

function tick(){
    gap-=1000;
    document.querySelector("#progress-bar").style.backgroundColor=(gap/1000)%2?"#B8B8B8":"#8F8F8F";
    progressBar.style.width=`${100-((gap*100)/interval)}%`;
    console.log(100-((gap*100)/interval));
    updateTime(gap);
}

updateTime(gap);
