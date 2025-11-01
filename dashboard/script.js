let time = document.getElementById("time");

function displayDate(){
    const now = new Date();
    time.innerHTML = now.toLocaleTimeString();
}

let timerId = setInterval(displayDate, 1000);


let submitGoal = document.getElementById("submit-goal");
let setGoal = document.getElementById("goal-value")
let existingGoal = localStorage.getItem("goal")

document.getElementById("goal").addEventListener("keydown", function (e){
    if (e.key == "Enter") {
        storeGoal();
    }
})

submitGoal.addEventListener("click", storeGoal);

function storeGoal(){
    goalValue = document.getElementById("goal").value;
    setGoal.textContent = "Today's focus: "+ goalValue;
    localStorage.setItem("goal", goalValue)
}

if (existingGoal) {
    console.log("existing goal: " + existingGoal)
    setGoal.textContent = "Today's focus: "+ existingGoal;
    const reset = document.createElement("button")
}
else {

}