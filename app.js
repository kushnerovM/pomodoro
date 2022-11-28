//variables
const second = 1000;
const minute = second*60;
let isPaused = false;
let timeInterval;

//multi-interval functional
let sessionCount = 6;
let sessionRemain=sessionCount;
let sessionDuration=45;
let breakDuration =10;
let isSession = true;
//time-interval
let interval = sessionDuration*minute;
let gap = interval;
//selectors
const timeLine = document.querySelector("#time-line");
const pauseButton = document.querySelector("#pause");
const stopButton = document.querySelector("#stop");
const startButton = document.querySelector("#start");
const progressBar = document.querySelector("#current-progress");
const caption = document.querySelector("#caption");
const closeButton = document.querySelector(".close-button");
const gearButton = document.querySelector(".gear-button");
const submitButton = document.querySelector("#ok");

//event listners

//close settings window
closeButton.addEventListener("click",()=>{
    document.querySelector("#filler").style.display="none";
});

//open settings window
gearButton.addEventListener("click",()=>{
    document.querySelector("#filler").style.display="flex";
});

//submitting new time settings
submitButton.addEventListener("click",(event)=>{
    event.preventDefault();
    const Count = document.querySelector("#session-count");
    const Duration = document.querySelector("#session-duration");
    const Break = document.querySelector("#break-duration");
    const errors = document.querySelectorAll(".error");
    errors.forEach(n=>n.style.display="none");
    let valid = true;
    if(!test(Count,errors[0])){valid=false;}
    if(!test(Duration,errors[1])){valid=false;}
    if(!test(Break,errors[2])){valid=false;}
    if(valid){
        sessionCount=+Count.value;
        sessionRemain=sessionCount;
        sessionDuration=+Duration.value;
        breakDuration=+Break.value;
        interval = sessionDuration*minute;
        gap = interval;
        isSession = true;
        updateTime(gap);
        gap-=1000;
        caption.innerHTML="";
        //clearing everething       
        clearInterval(timeInterval);
        stopButton.style.display="none";
        pauseButton.style.display="none";
        startButton.style.display="block";
        progressBar.style.width=`0%`;
        //pause reset if it was set
        if(isPaused){
            pauseButton.textContent="pause";
            isPaused = false;
        }
        document.querySelector("#filler").style.display="none";
    } else return;

});

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
stopButton.addEventListener("click",  ()=>{
    clearInterval(timeInterval);
    caption.innerHTML="";
    // set current time-line time to default value
    updateTime(interval);
    stopButton.style.display="none";
    pauseButton.style.display="none";
    gap = interval-1000;
    //pause reset if it was set
    if(isPaused){
        pauseButton.textContent="pause";
        isPaused = false;
    }
    //progress bar configuring
    progressBar.style.width=`0%`;
        startButton.style.display="block";
});

//start
startButton.addEventListener("click",()=>{
    //progress bar configuring
    progressBar.style.backgroundColor="#3EE08C";
    timeInterval = setInterval(tick,1000);
    caption.innerHTML=isSession?`${(sessionCount-sessionRemain)+1} session of ${sessionCount}`:"Break time";
    startButton.style.display="none";
    stopButton.style.display="block";
    pauseButton.style.display="block";

});

//functions
function updateTime(time){
    timeLine.innerHTML=String(Math.trunc(time/minute)).padStart(2,"0")+":"+String(time%minute/second).padStart(2,"0");
}

function tick(){
    document.querySelector("#progress-bar").style.backgroundColor=(gap/1000)%2?"#B8B8B8":"#8F8F8F";
    

    if(gap===0){
        if(isSession){
            sessionRemain--;
            isSession=false;
            interval=breakDuration*minute;
            gap=interval;
        } else{
            isSession=true;
            interval=sessionDuration*minute;
            gap=interval;
        }
        caption.innerHTML=isSession?`${(sessionCount-sessionRemain)+1} session of ${sessionCount}`:"Break time";
    }

    
    updateTime(gap);
    progressBar.style.width=`${100-((gap*100)/interval)}%`;
    gap-=1000;
}

function test(input,error){
    if(!/[0-9]/g.test(input.value)||!Number.isInteger((+input.value))){
        error.innerHTML = "invalid format";
        error.style.display="block";
        return false;
    }
    if(+input.value<+input.min){
        error.innerHTML=`minimum is ${input.min}`;
        error.style.display="block";
        return false;
    }
    if(+input.value>+input.max){
        error.innerHTML=`maximum is ${input.max}`;
        error.style.display="block";
        return false;
    }
    return true
}

updateTime(gap);
gap-=1000;
