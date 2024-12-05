const dailyHabitBtn = document.getElementById("daily-habit-btn");
const weeklyHabitBtn = document.getElementById("weekly-habit-btn");
const monthlyHabitBtn = document.getElementById("monthly-habit-btn");
const createHabitButton = document.getElementById("create-habit-btn");
const addHabitBtn = document.getElementById("add-btn");
const cancelBtn = document.getElementById("cancel-btn");
const clearBtn = document.getElementById("clear-btn");
const deleteBtn = document.getElementById("delete-btn");

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
'"Discipline is choosing between what you want now and what you want most." – Abraham Lincoln',
'"The secret of your future is hidden in your daily routine." – Mike Murdock',
'"You’ll never change your life until you change something you do daily. The secret of your success is found in your daily routine." – John C. Maxwell',
'"Good habits are worth being fanatical about." – John Irving',
'"It’s not what we do once in a while that shapes our lives, but what we do consistently." – Tony Robbins',
'"The difference between who you are and who you want to be is what you do." – Charles Duhigg',
'"Every action you take is a vote for the type of person you wish to become." – James Clear'];

let habitsList = JSON.parse(localStorage.getItem("data")) || [];
let currentHabitPage = "Daily";
let idNumber = JSON.parse(localStorage.getItem("idNumber")) || 0;
let currentHabit = {};

dailyHabitBtn.addEventListener("click", showDailyHabits);
weeklyHabitBtn.addEventListener("click", showWeeklyHabits);
monthlyHabitBtn.addEventListener("click", showMonthlyHabits);
createHabitButton.addEventListener("click", openHabitForm);
addHabitBtn.addEventListener("click", addOrEditHabit);
cancelBtn.addEventListener("click", closeHabitForm);
clearBtn.addEventListener("click", clearList);
deleteBtn.addEventListener("click", deleteHabit);

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

    for(let i = 0; i < habitsList.length; i++) {
        let html = `
        <div class="single-habit-container">
            <button class="complete-btn" onclick="increaseProgress('${habitsList[i].id}')"><img id="check-img" src="https://cdn0.iconfinder.com/data/icons/harmonicons-02/64/check-box-512.png"></button>
            <div class="habit" id="${habitsList[i].id}">
                <div class="habit-name habit-item">${habitsList[i].name}</div>
                <div class="habit-frequency habit-item">${habitsList[i].frequency} / ${habitsList[i].interval}</div>
                <div class="habit-progress habit-item">${habitsList[i].progress} / ${habitsList[i].frequency}</div>
            </div>
            <button class="edit-btn" onclick="editHabit('${habitsList[i].id}')"><img id="edit-img" src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png"></button>
        </div>`;
        
        if(habitsList[i].type === "day") {
            dailyHabits.innerHTML += html;
        }
        else if(habitsList[i].type === "week") {
            weeklyHabits.innerHTML += html;
        }
        else {
            monthlyHabits.innerHTML += html;
        }

    }
}

function addOrEditHabit() {
    deleteBtn.hidden = "true";
    
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
    localStorage.setItem("idNumber", JSON.stringify(idNumber));

    habitsList.push(habit);
    localStorage.setItem("data", JSON.stringify(habitsList));

    updateHabitList();

    closeHabitForm();
    clearCreateHabitForm();
}

function clearCreateHabitForm() {
    newHabitNameInput.value = "";
    newHabitFrequencyInput = "";
    newHabitIntervalInput.value = "day";
}

function increaseProgress(id) {

    let habit = findHabitById(id);
    console.log(habit.id);


    if(!habit){
        console.error("Habit not found.");
        return;
    }

    if(Number(habit.progress) === Number(habit.frequency)){
        alert("You have already reached your goal for this habit!");
        return;
    }

    //console.log("Progress: " + habit.progress + " Frequency: " + habit.frequency)
    
    habit.progress++;
    localStorage.setItem("data", JSON.stringify(habitsList));
    updateHabitList();
}

function openHabitForm() {
    mainPage.hidden = "true";
    newHabitForm.removeAttribute("hidden");
}

function closeHabitForm() {
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

function clearList() {
    while(habitsList.length > 0) {
        habitsList.pop();
    }

    localStorage.setItem("data", JSON.stringify(habitsList));
    updateHabitList();
}

function editHabit(id) {
    let habit = findHabitById(id);
    deleteBtn.removeAttribute("hidden");

    openHabitForm();
    document.getElementById("add-habit-title").innerText = "Edit Habit";
    addHabitBtn.innerText = "Save";
    newHabitNameInput.value = habit.name;
    newHabitFrequencyInput.value = habit.frequency;
    newHabitIntervalInput.value = habit.interval;
}

function saveEditedHabit() {

}

function deleteHabit(id) {
    let index = habitsList.indexOf(findHabitById(id));
    habitsList.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(habitsList));
    updateHabitList();
    closeHabitForm();
}