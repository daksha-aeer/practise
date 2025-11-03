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
    goalDisplay.style.display = "";
    
    const newGoal = localStorage.getItem("goal")
    console.log(newGoal)

    goalDisplay.textContent = "Today's goal: " + newGoal;
    const resetButton = document.createElement("button");

    resetButton.textContent = "Reset Goal";
    resetButton.id = "reset-goal";

    resetButton.addEventListener("click", () => {
        localStorage.removeItem("goal");
        showGoalInput();
    });
    goalDisplay.appendChild(resetButton);
}

function showGoalInput() {
    goalLabel.style.display = "";
    goalInput.style.display = "";
    goalButton.style.display = "";
    goalInput.value = "";
    goalDisplay.style.display = "none";
}

function storeGoal() {
    localStorage.setItem("goal", goalInput.value);
}

if (savedGoal) {
    goalExists();
}
else {
    console.log("goal doesnt exist")
    goalInput.addEventListener("keydown", function(e){
        if (e.key == "Enter") {
            storeGoal();
            goalExists();
        }
    })

    goalButton.addEventListener("click", () => {
        storeGoal();
        goalExists()
    })
}