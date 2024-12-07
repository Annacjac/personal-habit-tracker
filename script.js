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
const addHabitTitle = document.getElementById("add-habit-title");
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


dailyHabitBtn.addEventListener("click", showDailyHabits);
weeklyHabitBtn.addEventListener("click", showWeeklyHabits);
monthlyHabitBtn.addEventListener("click", showMonthlyHabits);
createHabitButton.addEventListener("click", () => openHabitForm("add", ""));
cancelBtn.addEventListener("click", closeHabitForm);
//clearBtn.addEventListener("click", () => clearHabitsOfInterval("day"));
deleteBtn.addEventListener("click", deleteHabit);

newHabitForm.addEventListener("submit", (e) => {
    e.preventDefault();
})

updateHabitList(habitsList);
getRandomQuote();
checkDate();
showDailyHabits();

function showDailyHabits(){
    dailyHabits.removeAttribute("hidden");
    weeklyHabits.hidden = "true";
    monthlyHabits.hidden = "true";

    dailyHabitBtn.classList.add("selected-button");
    weeklyHabitBtn.classList.remove("selected-button");
    monthlyHabitBtn.classList.remove("selected-button");

    clearBtn.onclick = () => clearHabitsOfInterval("day");

    currentHabitPage = "Daily";
}

function showWeeklyHabits(){
    dailyHabits.hidden = "true";
    weeklyHabits.removeAttribute("hidden");
    monthlyHabits.hidden = "true";

    dailyHabitBtn.classList.remove("selected-button");
    weeklyHabitBtn.classList.add("selected-button");
    monthlyHabitBtn.classList.remove("selected-button");

    clearBtn.onclick = () => clearHabitsOfInterval("week");

    currentHabitPage = "Weekly";
}

function showMonthlyHabits(){
    dailyHabits.hidden = "true";
    weeklyHabits.hidden = "true";
    monthlyHabits.removeAttribute("hidden");

    dailyHabitBtn.classList.remove("selected-button");
    weeklyHabitBtn.classList.remove("selected-button");
    monthlyHabitBtn.classList.add("selected-button");

    clearBtn.onclick = () => clearHabitsOfInterval("month");

    currentHabitPage = "Monthly";
}

function updateHabitList(array) {

    dailyHabits.innerHTML = "";
    weeklyHabits.innerHTML = "";
    monthlyHabits.innerHTML = "";
    const emptyMessageHTML = `<div id="empty-msg">No habits to display.</div>`

    for(let i = 0; i < array.length; i++) {
        let progressPercentage = (array[i].progress / array[i].frequency) * 100;
        let html = `
        <div class="single-habit-container">
            <button class="complete-btn" onclick="increaseProgress('${array[i].id}')"></button>
            <div class="habit" id="${array[i].id}" style="background: linear-gradient(90deg, #f5f0e6 ${progressPercentage}%, #ece2d0 0%);">
                <div class="habit-name habit-item">${array[i].name}</div>
                <div class="habit-frequency habit-item">${array[i].frequency} / ${array[i].interval} </div>
                <div class="habit-progress habit-item">${array[i].progress} / ${array[i].frequency}</div>
            </div>
            <button class="edit-btn" onclick="openHabitForm('edit', '${array[i].id}')"></button>
        </div>`;
        
        if(array[i].interval === "day") {
            dailyHabits.innerHTML += html;
        }
        else if(array[i].interval === "week") {
            weeklyHabits.innerHTML += html;
        }
        else {
            monthlyHabits.innerHTML += html;
        }

    }

    if(dailyHabits.innerHTML === "") {
        dailyHabits.innerHTML = emptyMessageHTML;
    }

    if(weeklyHabits.innerHTML === "") {
        weeklyHabits.innerHTML = emptyMessageHTML;
    }

    if(monthlyHabits.innerHTML === "") {
        monthlyHabits.innerHTML = emptyMessageHTML;
    }
    
}

function addHabit() {
    deleteBtn.hidden = "true";
    
    if(!newHabitNameInput.value || !newHabitFrequencyInput.value) {
        alert("Please fill all input fields.");
        return;
    }   

    
    let habit = {
        id: `habit${idNumber}`,
        name: newHabitNameInput.value,
        frequency: newHabitFrequencyInput.value,
        interval: newHabitIntervalInput.value,
        progress: 0
    }

    idNumber++;
    localStorage.setItem("idNumber", JSON.stringify(idNumber));

    habitsList.push(habit);
    localStorage.setItem("data", JSON.stringify(habitsList));

    updateHabitList(habitsList);
    closeHabitForm();
}

function clearCreateHabitForm() {
    newHabitNameInput.value = "";
    newHabitFrequencyInput.value = "";
    
}

function increaseProgress(id) {

    let habit = findHabitById(id);


    if(!habit){
        console.error("Habit not found.");
        return;
    }

    if(Number(habit.progress) === Number(habit.frequency)){
        alert("You have already reached your goal for this habit!");
        return;
    }
    
    habit.progress++;

    localStorage.setItem("data", JSON.stringify(habitsList));
    updateHabitList(habitsList);
}

function openHabitForm(addOrEdit, id) {
    habit = findHabitById(id);
    mainPage.hidden = "true";
    newHabitForm.removeAttribute("hidden");
    if(addOrEdit === "add") {
        addHabitTitle.innerText = "Add Habit";
        addHabitBtn.innerText = "Add";
        deleteBtn.hidden = "true";
        addHabitBtn.onclick = () => addHabit();

        if(currentHabitPage === "Daily") {
            newHabitIntervalInput.value = "day";
        }
        else if(currentHabitPage === "Weekly") {
            newHabitIntervalInput.value = "week";
        }
        else {
            newHabitIntervalInput.value = "month";
        }
    }
    else if(addOrEdit === "edit") {
        newHabitNameInput.value = habit.name;
        newHabitFrequencyInput.value = habit.frequency;
        newHabitIntervalInput.value = habit.interval; 
        addHabitTitle.innerText = "Edit Habit";
        addHabitBtn.innerText = "Save";
        deleteBtn.removeAttribute("hidden");
        addHabitBtn.onclick = () => editHabit(habit.id);
    }
}

function closeHabitForm() {
    newHabitForm.hidden = "true";
    mainPage.removeAttribute("hidden");
    clearCreateHabitForm();
    
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
        updateHabitList(habitsList);
    }
    idNumber = 0;
    localStorage.setItem("idNumber", JSON.stringify(idNumber));
    localStorage.setItem("data", JSON.stringify(habitsList));
}

function clearHabitsOfInterval(interval) {
    let habitsToClear = findHabitsByInterval(interval);
    for(let i = 0; i < habitsToClear.length; i++) {
        let index = habitsList.indexOf(habitsToClear[i]);
        habitsList.splice(index, 1);
    }
    localStorage.setItem("data", JSON.stringify(habitsList));
    updateHabitList(habitsList);
}

function editHabit(id) {
    if(!newHabitNameInput.value || !newHabitFrequencyInput.value) {
        alert("Please fill all input fields.");
        return;
    }   

    findHabitById(id).name = newHabitNameInput.value;
    findHabitById(id).frequency = newHabitFrequencyInput.value;
    findHabitById(id).interval = newHabitIntervalInput.value;
    localStorage.setItem("data", JSON.stringify(habitsList));
    closeHabitForm();
    updateHabitList(habitsList);
}

function deleteHabit(id) {
    let index = habitsList.indexOf(findHabitById(id));
    habitsList.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(habitsList));
    if (habitsList.length === 0 ) {
        idNumber = 0;
        localStorage.setItem("idNumber", JSON.stringify(idNumber));
    }
    updateHabitList(habitsList);
    closeHabitForm();
}

function findHabitsByInterval(interval) {
    let habits = [];
    for(let i = 0; i < habitsList.length; i++) {
        if(habitsList[i].interval === interval) {
            habits.push(habitsList[i]);
        }
    }

    return habits;
}

function findHabitsByName(name, array) {
    
}

function checkDate() {
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    let storedDate = localStorage.getItem("oldDate");
    let oldDate = storedDate ? new Date(storedDate) : new Date();
    oldDate.setHours(0, 0, 0, 0);


    const startOfThisWeek = new Date(currentDate);
    startOfThisWeek.setDate(currentDate.getDate() - currentDate.getDay());


    let dailyHabitsList = findHabitsByInterval("day");
    let weeklyHabitsList = findHabitsByInterval("week");
    let monthlyHabitsList = findHabitsByInterval("month");

    if(currentDate > oldDate) {
        for(let i = 0; i < dailyHabitsList.length; i++) {
            resetProgress(dailyHabitsList[i].id);
        }
    }

    if(currentDate > startOfThisWeek && oldDate < startOfThisWeek) {
        for(let i = 0; i < weeklyHabitsList.length; i++) {
            resetProgress(weeklyHabitsList[i].id);
        }
    }

    if(currentDate.getMonth() > oldDate.getMonth() || currentDate.getFullYear() > oldDate.getFullYear()) {
        for(let i = 0; i < monthlyHabitsList.length; i++) {
            resetProgress(monthlyHabitsList[i].id);
        }
    }

    localStorage.setItem("oldDate", currentDate);
    
}

function resetProgress(id) {
    findHabitById(id).progress = 0;
    localStorage.setItem("data", JSON.stringify(habitsList));
    updateHabitList();
}

function confirmChanges() {

}
