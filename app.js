//variables
const second = 1000;
const minute = second*60;
//time-interval
let interval = 45*minute;
let gap = interval;
//selectors
const timeLine = document.querySelector("#time-line");
const pauseButton = document.querySelector("#pause");
const stopButton = document.querySelector("#stop");
//event listners

//functions
const updateTime= ()=>timeLine.innerHTML=String(Math.trunc(gap/minute)).padStart(2,"0")+":"+String(gap%minute/second).padStart(2,"0");
updateTime();
function tick(){
    gap-=1000;
    console.log(String(gap%minute));
    updateTime();
}
setInterval(tick,1000);