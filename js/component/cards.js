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

    this.classList.add('flip'); // .memory-card.flip??? ???????????? ????????? ???????????? ????????? ??????.

    if (!hasFlippedCard) {       // ????????? ????????? ????????? ????????? ??????
        hasFlippedCard = true;   // ?????? ????????? ???????????? ??????
        firstCard = this;        // ????????? ????????? ?????? ??????
    } else {
        secondCard = this;       // ???????????? ?????? ????????? ????????? ??????

        if (isSameCard(firstCard, secondCard)) {
            disableCards();
        } else {
            enableCards().then(resolve => console.log('????????????')).catch(reject => console.log('????????????'));
        }
    }

}

function unFlipCard(card, timeOutMilliSec) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            card.classList.remove('flip');
            resolve("????????? ????????????");
        }, timeOutMilliSec);
    })

}

async function enableCards() {

    lockBoard = true;

    try {
        await Promise.all([unFlipCard(firstCard, 1000), unFlipCard(secondCard, 1500)]);
    } catch (e) {
        console.log('catch ??????', e);
    } finally {
        resetBoard();
    }

}

function disableCards() {

    const disableCardCnt = document.body.querySelectorAll('.flip').length;
    const cardTotCnt = document.body.querySelectorAll('.memory-card').length;

    // ????????? ????????? ???????????? ????????? ??????

    firstCard.classList.add('success');
    secondCard.classList.add('success');

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    if (disableCardCnt === cardTotCnt) {
        stopTimer();
        saveScore();
        displayScore();

        setTimeout(() => alert('??????'), 500);
    }

    resetBoard();

}


function resetBoard() {

    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [false, false]

}


///////////////////////////////////////////////////////////////////
// promise??? ????????? ?????? ????????? ??????
// function enableCards() {
//
//     lockBoard = true;
//
//     let promise = unFlipCard(firstCard, 1000)
//         .then(() => unFlipCard(secondCard, 1500))
//         .then((res) => console.log(res))
//         .catch((res) => console.log('????????? ??????????????? ?????? ????????????.'))
//         .finally(() => {
//             resetBoard();
//         });
//
// }

///////////////////////////////////////////////////////////////////
// ?????? ??????
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
//     }, 1500);  // unFlip 1.5??? ?????? ????????? ??????
// }
///////////////////////////////////////////////////////////////////
