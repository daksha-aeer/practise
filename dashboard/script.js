const time = document.getElementById("time");
const goalLabel = document.getElementById("goal-label");
const goalInput = document.getElementById("goal-input");
const goalButton = document.getElementById("submit-goal-button");
const goalDisplay = document.getElementById("goal-value");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const loc = document.getElementById("location");
const photographer = document.getElementById("photographer")
const WEATHER_API = "";
const ACCESS_KEY = "";

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
    console.log(goalInput.value)
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

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else { 
  console.log("Geolocation is not supported by this browser");
}

async function showPosition(position) {
    coordinates = position.coords
    console.log("Latitude: " + coordinates.latitude)
    console.log("Longitude: " + coordinates.longitude)

    try {
        const weather = await fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_API}&q=${coordinates.latitude},${coordinates.longitude}&aqi=yes`).then(r => r.json())
        // console.log(weather)
        console.log(weather.current.condition.text)
        console.log(weather.current.temp_c)
        // console.log(weather.location.name)
        condition.textContent = weather.current.condition.text
        temp.textContent = weather.current.temp_c
        loc.textContent = weather.location.name
        
    } catch (error) {
        console.log(error)
    }
}

async function getImage() {
    const image = await fetch(`https://api.unsplash.com/photos/random/?client_id=${ACCESS_KEY}&orientation=landscape&query=nature`).then(r => r.json())
    // const id = image.id
    console.log(image)
    console.log(image.urls.regular)
    document.body.style.backgroundImage = `url(${image.urls.regular})`
    photographer.textContent = "Photographer: " + image.user.name
    // document.body.style.backgroundSize = "cover"
    // document.body.style.backgroundRepeat = "no-repeat"
    // document.body.style.height = '100vh';
    // document.body.style.backgroundPosition = 'center';
}

getImage()