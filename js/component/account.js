function isLoggedIn() {

    // if ((curAccount === undefined) || (curAccount === null) || (curAccount.length === 0)) {
    return curAccount;


}

function logInController() {

    if (document.querySelector('.header-account input')?.value.length === 0) {
        alert('input account')
        return;
    }

    switchButton(document.querySelectorAll('.account-button-list'));

    if (this.classList.contains('login-button')) {
        curAccount = document.querySelector('.header-account input')?.value;
        document.querySelector('.header-account input').disabled = true;
    } else {
        curAccount = "";
        document.querySelector('.header-account input').disabled = false;
    }

}

