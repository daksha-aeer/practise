const time = document.getElementById("time");
const goalLabel = document.getElementById("goal-label");
const goalInput = document.getElementById("goal-input");
const goalButton = document.getElementById("submit-goal-button");
const goalDisplay = document.getElementById("goal-value");

function displayDate(){
    const now = new Date();
    time.innerHTML = now.toLocaleTimeString();
}

let timerId = setInterval(displayDate, 1000);

const savedGoal = localStorage.getItem("goal")

function goalExists() {
    goalLabel.style.display = "none";
    goalInput.style.display = "none";
    goalButton.style.display = "none";

    goalDisplay.textContent = "Today's goal: " + savedGoal;
    const resetButton = document.createElement("button");

    resetButton.textContent = "Reset Goal";
    resetButton.id = "reset-goal";

    resetButton.addEventListener("click", localStorage.removeItem("goal"));
    goalDisplay.appendChild(resetButton);
}

if (savedGoal) {
    goalExists();
}
else {
    goalInput.addEventListener("keydown", function(e){
        if (e.key == "Enter") {
            localStorage.setItem("goal", goalInput.value);
        }
    })
}