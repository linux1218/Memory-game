let firstCard, secondCard, hasFlippedCard = false, lockBoard = false;


function cardController(button) {

    if (button.classList.contains('start-button')) {
        enableUnFlipCards();
        disableLevelButton();
    } else if (button.classList.contains('pause-button')) {
        disableAllCards();
    } else {
        disableAllCards();
        clearCard();
        enableLevelButton();
    }

}

function disableLevelButton() {
    document.querySelectorAll(".game-level-list")
        .forEach(levelButton => levelButton.disabled = true);
}

function enableLevelButton() {
    document.querySelectorAll(".game-level-list")
        .forEach(levelButton => levelButton.disabled = false);
}


function disableAllCards() {
    document.querySelectorAll(".memory-card").forEach(card => card.removeEventListener('click', flipCard));
}

function enableUnFlipCards() {
    // document.querySelectorAll(".memory-card:not(.flip)").forEach(card => card.addEventListener('click', flipCard));
    document.querySelectorAll(".memory-card:not(.success)").forEach(card => card.addEventListener('click', flipCard));
}

function isCreateCard() {
    return (document.querySelectorAll(".memory-card")?.length) ? true : false;

    // if (document.querySelectorAll(".memory-card")) {
    //     if( document.querySelectorAll(".memory-card").length > 0 ){
    //         return true;
    //     }else {
    //         return false;
    //     }
    // }
    // return false;
}

function createCard(cardCount) {
    let frameWorkName;
    for (let loopIdx = 0; loopIdx < (cardCount / 2); loopIdx++) {
        const filteredFrameworks = framework.filter(eachFramework => eachFramework !== frameWorkName);
        frameWorkName = filteredFrameworks[Math.floor(Math.random() * filteredFrameworks.length)];
        for (let loopIdxIn = 0; loopIdxIn < 2; loopIdxIn++) {

            const memoryCard = document.createElement("div");
            memoryCard.classList.add("memory-card");
            memoryCard.dataset.framework = frameWorkName;

            const frontFace = document.createElement('img');
            frontFace.classList.add('front-face');
            frontFace.src = './img/' + `${frameWorkName}.svg`;

            const backFace = document.createElement('img');
            backFace.classList.add('back-face');
            backFace.src = './img/js-badge.svg';

            memoryCard.appendChild(frontFace);
            memoryCard.appendChild(backFace);

            document.querySelector('.memory-game-area').appendChild(memoryCard);
        }
    }
}

function resizeCard(cardCount) {
    document.querySelectorAll(".memory-card").forEach((card) => {
        card.style.width = `calc(${100 / cardCount}% - 10px)`;
        card.style.height = `calc(${100 / cardCount}$ - 10px)`;
    });
}

function shuffle(cardCount) {
    document.querySelectorAll(".memory-card").forEach(card => {
        card.style.order = Math.floor(Math.random() * cardCount);
    });
}

function clearCard() {
    if (document.querySelectorAll(".memory-card")) {
        document.querySelectorAll(".memory-card").forEach(
            (card) => card.remove()
        );
    }
}

function isSameCard(firstCard, secondCard) {
    return firstCard.dataset.framework === secondCard.dataset.framework;
}

function createMemoryCard() {

    const cardCount = Math.pow(this.value, 2);

    clearCard();
    createCard(cardCount);
    resizeCard(this.value);
    shuffle(this.value);
}


function flipCard() {

    if (lockBoard) {
        return;
    } else if (this === firstCard) {
        return;
    }

    this.classList.add('flip'); // .memory-card.flip이 성립되며 카드가 뒤집히는 동작을 한다.

    if (!hasFlippedCard) {       // 뒤집힌 카드가 없다면 첫번째 시도
        hasFlippedCard = true;   // 하나 뒤집힌 상태라는 표시
        firstCard = this;        // 뒤집힌 카드를 일단 저장
    } else {
        secondCard = this;       // 여기까지 오면 두번째 뒤집은 상태

        if (isSameCard(firstCard, secondCard)) {
            disableCards();
        } else {
            enableCards().then(resolve => console.log('성공처리')).catch(reject => console.log('실패처리'));
        }
    }

}

function unFlipCard(card, timeOutMilliSec) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            card.classList.remove('flip');
            resolve("무조건 성공인듯");
        }, timeOutMilliSec);
    })

}

async function enableCards() {

    lockBoard = true;

    try {
        await Promise.all([unFlipCard(firstCard, 1000), unFlipCard(secondCard, 1500)]);
    } catch (e) {
        console.log('catch 확인', e);
    } finally {
        resetBoard();
    }

}

function disableCards() {

    const disableCardCnt = document.body.querySelectorAll('.flip').length;
    const cardTotCnt = document.body.querySelectorAll('.memory-card').length;

    // 더이상 클릭에 동작하지 않도록 처리

    firstCard.classList.add('success');
    secondCard.classList.add('success');

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    if (disableCardCnt === cardTotCnt) {
        stopTimer();
        saveScore();
        displayScore();

        setTimeout(() => alert('성공'), 500);
    }

    resetBoard();

}


function resetBoard() {

    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [false, false]

}


///////////////////////////////////////////////////////////////////
// promise로 만들면 이런 형태가 가능
// function enableCards() {
//
//     lockBoard = true;
//
//     let promise = unFlipCard(firstCard, 1000)
//         .then(() => unFlipCard(secondCard, 1500))
//         .then((res) => console.log(res))
//         .catch((res) => console.log('실패를 안만들어서 여긴 못들어옴.'))
//         .finally(() => {
//             resetBoard();
//         });
//
// }

///////////////////////////////////////////////////////////////////
// 기존 코드
// function unFlipCards(firstCard, secondCard) {
//
//     firstCard.classList.remove('flip');
//     secondCard.classList.remove('flip');
//
// }

// function enableCards() {
//
//     lockBoard = true;
//
//     setTimeout(() => {
//         unFlipCards(firstCard, secondCard);
//         resetBoard();
//     }, 1500);  // unFlip 1.5초 정도 딜레이 처리
// }
///////////////////////////////////////////////////////////////////
