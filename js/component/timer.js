let timer_micro;
let timer_sec;
let timer_min;

let cur_micro;
let cur_sec;
let cur_min;

function getCurTimer(){
    const micro = parseInt(document.getElementById("micro").innerText);
    const sec = parseInt(document.getElementById("sec").innerText);
    const min = parseInt(document.getElementById("min").innerText);

    return (parseInt(min) * 10000) + (parseInt(sec) * 100) + parseInt(micro);
}

function timerController(button) {

    if (button.classList.contains('start-button')) {
        startTimer();
    } else if (button.classList.contains('pause-button')) {
        stopTimer();
    } else {
        resetTimer();
    }

    displayScore(); // 게임기록에 해당 user의 기록을 강조하기 위해서 다시 호출
}

function startTimer() {

    cur_micro = parseInt(document.getElementById("micro").innerText);
    cur_sec = parseInt(document.getElementById("sec").innerText);
    cur_min = parseInt(document.getElementById("min").innerText);

    timer_micro = setInterval(function () {
        cur_micro++;
        if (cur_micro === 100) {
            cur_micro = "00";
        } else if (cur_micro < 10) {
            cur_micro = "0" + cur_micro;
        }
        document.getElementById("micro").innerText = cur_micro;
    }, 10);

    timer_sec = setInterval(function () {
        cur_sec++;
        if (cur_sec === 60) {
            cur_sec = (document.querySelector("#min")) ? "00" : cur_sec;
        } else if (cur_sec < 10) {
            cur_sec = "0" + cur_sec;
        }
        document.getElementById("sec").innerText = cur_sec;
    }, 1000);

    timer_min = setInterval(function () {
        cur_min++;
        if (cur_min < 10) {
            cur_min = "0" + cur_min;
        }
        document.getElementById("min").innerText = cur_min;
    }, 60000);
}

function resetTimer() {
    stopTimer();
    document.getElementById("micro").innerText = "00";
    document.getElementById("sec").innerText = "00";
    document.getElementById("min").innerText = "00";
}

function stopTimer() {
    clearInterval(timer_micro);
    clearInterval(timer_sec);
    clearInterval(timer_min);
}
