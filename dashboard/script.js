let time = document.getElementById("time");

function displayDate(){
    const now = new Date();
    time.innerHTML = now.toLocaleTimeString();
}

let timerId = setInterval(displayDate, 1000);
