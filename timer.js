let onTimer = false;
let nextPattern = false;
let difficulty = "";
let patternObj = ""
let patternTime = "";
let nextPatternTime = "";
let normal = {
    phase1:180,
    phase2:150,
    phase3:120
}
let hard = {
    phase1:150,
    phase2:125,
    phase3:100
}
let tempPatternTime = "";
function timer() {
    if (onTimer == true){
        clearInterval(timerNow);
        console.log("reset timer")
    }
    difficulty = $('#difficulty option:selected').val();  
    if (difficulty == "normal") {
        patternObj = normal
    }
    else {
        patternObj = hard
    }
    console.log("startTimer")
    let time = 1800;
    onTimer = true;
    timerNow = setInterval(function() {
        $('#time-now').text(parseInt(time/60) + "분" + time%60 + "초");
        if (time <= 1784){
            patternTimer(time);
        }
        time--;
        if (time < 0){
            clearInterval(timerNow);
        }
    }
    , 1000)
}
function patternTimer(time) {
    if (time == 1784) { //입장 초기값 설정
        nextPattern = true;
        patternTime = patternObj.phase1  
    }
    if (nextPattern == true){
        let nextPatternTime = time - patternTime;
        $('#time-nexPattern').text(parseInt(nextPatternTime/60) + "분" + nextPatternTime%60 + "초")
        nextPattern = false;
    }    
    if (patternTime>1){
        patternTime--;
        $('#time-pattern').text(parseInt(patternTime/60) + "분" + patternTime%60 + "초")
    }
    else {
        nextPattern = true;
        patternTime = tempPatternTime
    }
}
$(document).ready(function() {
    $('.time-select').click(function() {
        let phase = $("button").index(this);
        if (phase == 1) {
            tempPatternTime = patternObj.phase1
        } 
        else if (phase == 2) {
            tempPatternTime = patternObj.phase2
        }
        else {
            tempPatternTime = patternObj.phase3
        }
    });
});
