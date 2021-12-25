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
        resetTimer()
    }
    $('#difficulty').prop('disabled', true);
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
        $('#time-now').text(parseInt(time/60) + "분 " + time%60 + "초");
        if (time <= 1784){
            patternTimer(time);
        }
        time--;
        if (time < 0){
            clearInterval(timerNow);
            $('#difficulty').prop('disabled', false);
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
        $('#time-nexPattern').text(parseInt(nextPatternTime/60) + "분 " + nextPatternTime%60 + "초")
        nextPattern = false;
    }    
    if (patternTime>1){
        patternTime--;
        $('#time-pattern').text(parseInt(patternTime/60) + "분 " + patternTime%60 + "초")
    }
    else {
        nextPattern = true;
        patternTime = tempPatternTime
    }
}
function resetTimer(){
    $('#difficulty').prop('disabled', false);
    clearInterval(timerNow);
    $('#time-nexPattern').text("00분 00초")
    $('#time-pattern').text("00분 00초")
    $('#time-now').text("00분 00초")
}
$(document).ready(function() {
    $('.timer-set').click(function(){
        let temp = $("button").index(this);
        $('.timer-set').css("background-color", "rgb(255,255,255)")
        $('.timer-set').css("color", "rgb(0,0,0)")
        if (temp == 0) {
            timer();
            $(this).css("background-color", "rgb(0,0,0)")
            $(this).css("color", "rgb(255,255,255)")
        }
        else {
            resetTimer();
        }
    });
    $('.time-select').click(function() {
        let phase = $("button").index(this);
        $('.time-select').css("background-color", "rgb(255,255,255)")
        $('.time-select').css("color", "rgb(0,0,0)")
        $(this).css("background-color", "rgb(0,0,0)")
        $(this).css("color", "rgb(255,255,255)")
        if (phase == 0) {
            tempPatternTime = patternObj.phase1
        } 
        else if (phase == 1) {
            tempPatternTime = patternObj.phase2
        }
        else {
            tempPatternTime = patternObj.phase3
        }
    });
});
