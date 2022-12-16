function leftPad(value) {

    if (value >= 10) {
        return value;
    }

    return `0${value}`;

}

function toStringByFormatting(source, delimiter = '-') {

    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    return [year, month, day].join(delimiter);

}

function getTimeFormat( time ){

    const strTime=String(time).padStart(6,'0');

    const micro = strTime.slice( 4, 6 );
    const sec = strTime.slice( 2, 4 );
    const min = strTime.slice( 0, 2 );

    return `${min}:${sec}:${micro}`;

}

function switchButton(buttonList) {
    buttonList.forEach(button => {
        if (getComputedStyle(button).visibility === 'visible') {
            button.style.visibility = "hidden";
        } else {
            button.style.visibility = "visible";
        }
    });
}