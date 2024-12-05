const dailyHabitBtn = document.getElementById("daily-habit-btn");
const weeklyHabitBtn = document.getElementById("weekly-habit-btn");
const monthlyHabitBtn = document.getElementById("monthly-habit-btn");
const createHabitButton = document.getElementById("create-habit-btn");
const addHabitBtn = document.getElementById("add-btn");
const cancelBtn = document.getElementById("cancel-btn");

const dailyHabits = document.getElementById("daily-habits");
const weeklyHabits = document.getElementById("weekly-habits");
const monthlyHabits = document.getElementById("monthly-habits");
const newHabitForm = document.getElementById("new-habit");
const mainPage = document.getElementById("main");
const newHabitNameInput = document.getElementById("name-input");
const newHabitFrequencyInput = document.getElementById("frequency-input");
const newHabitIntervalInput = document.getElementById("interval-dropdown");
const quote = document.getElementById("quote");

const motivationalQuotes = ['"Motivation gets you started. Habit keeps you going." – Jim Ryun',
'"We are what we repeatedly do. Excellence, then, is not an act, but a habit." – Aristotle',
'"Success is the product of daily habits, not once-in-a-lifetime transformations." – James Clear',
'"Small disciplines repeated with consistency every day lead to great achievements gained slowly over time." – John C. Maxwell',
'"Your habits will determine your future." – Jack Canfield',
'"First forget inspiration. Habit is more dependable. Habit will sustain you whether you’re inspired or not." – Octavia Butler',
'"Chains of habit are too light to be felt until they are too heavy to be broken." – Warren Buffett',
'"Discipline is choosing between what you want now and what you want most." – Abraham Lincoln',
'"The secret of your future is hidden in your daily routine." – Mike Murdock',
'"You’ll never change your life until you change something you do daily. The secret of your success is found in your daily routine." – John C. Maxwell',
'"Good habits are worth being fanatical about." – John Irving',
'"It’s not what we do once in a while that shapes our lives, but what we do consistently." – Tony Robbins',
'"The difference between who you are and who you want to be is what you do." – Charles Duhigg',
'"Every action you take is a vote for the type of person you wish to become." – James Clear'];

let habitsList = JSON.parse(localStorage.getItem("data")) || [];
let currentHabitPage = "Daily";
let idNumber = 0;

dailyHabitBtn.addEventListener("click", showDailyHabits);
weeklyHabitBtn.addEventListener("click", showWeeklyHabits);
monthlyHabitBtn.addEventListener("click", showMonthlyHabits);
addHabitBtn.addEventListener("click", addHabit);
createHabitButton.addEventListener("click", openNewHabitForm);
cancelBtn.addEventListener("click", closeNewHabitForm);
newHabitForm.addEventListener("submit", (e) => {
    e.preventDefault();
})

updateHabitList();
getRandomQuote();

function showDailyHabits(){
    dailyHabits.removeAttribute("hidden");
    weeklyHabits.hidden = "true";
    monthlyHabits.hidden = "true";

    dailyHabitBtn.classList.add("selected-button");
    weeklyHabitBtn.classList.remove("selected-button");
    monthlyHabitBtn.classList.remove("selected-button");

    currentHabitPage = "Daily";
}

function showWeeklyHabits(){
    dailyHabits.hidden = "true";
    weeklyHabits.removeAttribute("hidden");
    monthlyHabits.hidden = "true";

    dailyHabitBtn.classList.remove("selected-button");
    weeklyHabitBtn.classList.add("selected-button");
    monthlyHabitBtn.classList.remove("selected-button");

    currentHabitPage = "Weekly";
}

function showMonthlyHabits(){
    dailyHabits.hidden = "true";
    weeklyHabits.hidden = "true";
    monthlyHabits.removeAttribute("hidden");

    dailyHabitBtn.classList.remove("selected-button");
    weeklyHabitBtn.classList.remove("selected-button");
    monthlyHabitBtn.classList.add("selected-button");

    currentHabitPage = "Monthly";
}

function updateHabitList() {

    dailyHabits.innerHTML = "";
    weeklyHabits.innerHTML = "";
    monthlyHabits.innerHTML = "";

    habitsList.forEach(({id, name, type, frequency, interval, progress}) => {
        
        let html = `
        <div class="single-habit-container">
            <button class="complete-btn" onclick="increaseProgress('${id}')"><img src="https://cdn0.iconfinder.com/data/icons/harmonicons-02/64/check-box-512.png"></button>
            <div class="habit" id="${id}">
                <div class="habit-name habit-item">${name}</div>
                <div class="habit-frequency habit-item">${frequency} / ${interval}</div>
                <div class="habit-progress habit-item">${progress} / ${frequency}</div>
            </div>
            <button class="edit-btn"><img src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png"></button>
        </div>`;
        
        if(type === "day") {
            dailyHabits.innerHTML += html;
        }
        else if(type === "week") {
            weeklyHabits.innerHTML += html;
        }
        else {
            monthlyHabits.innerHTML += html;
        }
    })
}

function addHabit() {
    if(!newHabitNameInput.value || !newHabitFrequencyInput) {
        alert("Please fill all input fields.");
        return;
    }   

    
    let habit = {
        id: `habit${idNumber}`,
        name: newHabitNameInput.value,
        type: newHabitIntervalInput.value,
        frequency: newHabitFrequencyInput.value,
        interval: newHabitIntervalInput.value,
        progress: 0
    }

    idNumber++;

    habitsList.push(habit);
    localStorage.setItem("data", JSON.stringify(habitsList));

    updateHabitList();

    closeNewHabitForm();
    clearCreateHabitForm();
}

function clearCreateHabitForm() {
    newHabitNameInput.value = "";
    newHabitFrequencyInput = "";
    newHabitIntervalInput.value = "day";
}

function increaseProgress(id) {

    if(!findHabitById(id)){
        console.error("Habit not found.");
        return;
    }

    if(Number(findHabitById(id).progress) === Number(findHabitById(id).frequency)){
        console.log("You have already reached your goal for this habit!");
    }

    console.log("Progress: " + findHabitById(id).progress + " Frequency: " + findHabitById(id).frequency)
    
    findHabitById(id).progress++;
    localStorage.setItem("data", JSON.stringify(habitsList));
    updateHabitList();
}

function openNewHabitForm() {
    mainPage.hidden = "true";
    newHabitForm.removeAttribute("hidden");
}

function closeNewHabitForm() {
    newHabitForm.hidden = "true";
    mainPage.removeAttribute("hidden");
}

function getRandomQuote() {
    let index = Math.floor(Math.random() * (motivationalQuotes.length - 1));
    quote.innerText = motivationalQuotes[index];
}

function findHabitById(id) {

    for(let i = 0; i < habitsList.length; i++){
        if(habitsList[i].id === id){
            return habitsList[i];
        }
    }
    return null;
}

//localStorage.clear();