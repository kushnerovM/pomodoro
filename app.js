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
//event listners
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
})
//functions
const updateTime= ()=>timeLine.innerHTML=String(Math.trunc(gap/minute)).padStart(2,"0")+":"+String(gap%minute/second).padStart(2,"0");
updateTime();
function tick(){
    gap-=1000;
    console.log(String(gap%minute));
    updateTime();
}
//if(!isPaused){
//    setInterval(tick,1000);
//}

/*setTimeout(function run(){
    if(!isPaused){
        tick();
        setTimeout(run,1000)
    }
},1000)*/
timeInterval = setInterval(tick,1000);
