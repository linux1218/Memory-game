

function gameController() {

    if (this.classList.contains('start-button')) {
        if (!isLogin()) {
            alert('LogIn!!');
            return;
        }

        if (!isCreateCard()) {
            alert('Card!!');
            return;
        }
    }

    switchButton(document.querySelectorAll('.game-button-list'));

    // if (this.classList.contains('start-button') || this.classList.contains('reset-button')) {
    if (this.classList.contains('reset-button')) {
        resetBoard();
    }

    cardController(this);

    timerController(this);

}