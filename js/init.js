let curAccount;

framework = ["aurelia", "vue", "angular", "ember", "backbone", "react"];


function registEventListener() {

    document.querySelectorAll('.account-button-list')
        .forEach(button => button.addEventListener('click', logInController));

    document.querySelectorAll('.game-button-list')
        .forEach(button => button.addEventListener('click', gameController));

    document.querySelectorAll('.game-level-list')
        .forEach(button => button.addEventListener('click', createMemoryCard));

}


function initBoard() {

    registEventListener();

    resetBoard();

    document.querySelector('.game-level-list').click(); // 시작은 강제로 2x2 이벤트 발생시킨다.
}

initBoard();

showScore();