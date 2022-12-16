const SCORE_LOCAL_STORAGE_KEY = "localStorageKey";
const MAX_RECORD_CNT = 5;

let score = [];


function showScore() {

    if (score.length === 0) {
        loadScore();
    }
    displayScore();

}


function loadScore() {

    const loadScore = localStorage.getItem(SCORE_LOCAL_STORAGE_KEY);

    if (loadScore === null) {
        score = []; // getItem 결과가 없을때는 추후 add를 위해 빈 배열
    } else {
        score = JSON.parse(loadScore);
    }

}


function clearScore() {

    document.querySelectorAll(".record div").forEach((record) => record.remove());

    // if (document.querySelectorAll(".record div")) {
    //     document.querySelectorAll(".record div").forEach(
    //         (record) => record.remove()
    //     );
    // }
}


function displayScore() {

    const scoreArea = document.querySelector('.record');
    if ((score === null) || (score === undefined)) {
        return;
    }

    clearScore();

    score.forEach(function (scoreInfo) {
        const ScoreDiv = document.createElement('div');

        const time = getTimeFormat(scoreInfo.time);
        const recordRow = `${scoreInfo.account}  ${time}  ${scoreInfo.date}`;

        const ScoreDiv_Span = document.createElement('span');
        ScoreDiv_Span.innerText = recordRow;

        ScoreDiv.append(ScoreDiv_Span);

        scoreArea.append(ScoreDiv);
    });

}


function saveScore() {

    const newRecord = {};

    newRecord.account = curAccount;
    newRecord.time = getCurTimer();
    newRecord.date = toStringByFormatting(new Date(), '.');

    score.push(newRecord);

    sortScore(); // 오름차순으로 기록을 재배열

    localStorage.setItem(SCORE_LOCAL_STORAGE_KEY, JSON.stringify(score));

}


function sortScore() {

    if ((score === null) || (score === undefined)) {
        return;
    }

    score.sort((a, b) => {
        return a.time - b.time;
    });

    // 최대 MAX_RECORD_CNT 까지
    if (score.length > MAX_RECORD_CNT) {
        score.length = MAX_RECORD_CNT;
    }

}
