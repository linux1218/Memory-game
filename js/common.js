function padStartZeros(value, n) {

    let stringConversion;
    if (typeof value === "string") {
        stringConversion = value;
    } else {
        stringConversion = String(value);
    }

    return stringConversion.padStart(n, '0');

}

function toStringByFormatting(source, delimiter = '-') {

    const year = source.getFullYear();
    const month = padStartZeros(source.getMonth() + 1, 2);
    const day = padStartZeros(source.getDate(), 2);

    return [year, month, day].join(delimiter);

}

function getTimeFormat( time ){

    const strTime=padStartZeros(time, 6);

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
