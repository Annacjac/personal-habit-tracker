const dailyHabitBtn = document.getElementById("daily-habit-btn");
const weeklyHabitBtn = document.getElementById("weekly-habit-btn");
const monthlyHabitBtn = document.getElementById("monthly-habit-btn");
const createHabitButton = document.getElementById("create-habit-btn");
const addHabitBtn = document.getElementById("add-btn");
const cancelBtn = document.getElementById("cancel-btn");
const clearBtn = document.getElementById("clear-btn");
const deleteBtn = document.getElementById("delete-btn");
const searchBtn = document.getElementById("search-btn");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const changeThemeBtn = document.getElementById("theme-btn");

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
const searchBar = document.getElementById("search-bar");
const confirmationPrompt = document.getElementById("prompt");
const confirmationPopup = document.getElementById("confirmation-prompt-background");
const overallProgressBar = document.getElementById("overall-progress-bar");
const progressBarText = document.getElementById("progress-bar-text");
const themeDropdown = document.getElementById("theme-dropdown");
const dateText = document.getElementById("date");
const colorSchemes = [{
        name: "Rose",
        id: 0,
        color1: "#6d2e46",
        color2: "rgba(109, 46, 70, .75)",
        color3: "#a26769",
        color4: "rgba(213, 185, 178, 1)",
        color5: "#cebebe",
        color6: "#ece2d0",
        color7: "#fdfded"
    },
    {
        name: "Sky",
        id: 1,
        color1: "#03045e",
        color2: "rgba(3, 4, 94, .75)",
        color3: "#0077b6",
        color4: "rgb(0, 180, 216, 1)",
        color5: "#90e0ef",
        color6: "#caf0f8",
        color7: "#fdfded"
    },
    {
        name: "Magma",
        id: 2,
        color1: "#6a040f",
        color2: "rgba(106, 4, 15, .75)",
        color3: "#d00000",
        color4: "rgb(232, 93, 4, 1)",
        color5: "#f48c06",
        color6: "#ffba08",
        color7: "#ffe854"
    },
    {
        name: "Forest",
        id: 3,
        color1: "#1b4332",
        color2: "rgba(27, 67, 50, .75)",
        color3: "#40916c",
        color4: "rgb(116, 198, 157, 1)",
        color5: "#95d5b2",
        color6: "#b7e4c7",
        color7: "#d8f3dc"
    },
    {
        name: "Greyscale",
        id: 4,
        color1: "#212529",
        color2: "rgba(33, 37, 41, .75)",
        color3: "#6c757d",
        color4: "rgb(173, 181, 189, 1)",
        color5: "#ced4da",
        color6: "#dee2e6",
        color7: "#fdfdfd"
    }];

const motivationalQuotes = ['"Motivation gets you started. Habit keeps you going." \n– Jim Ryun',
'"We are what we repeatedly do. Excellence, then, is not an act, but a habit." \n– Aristotle',
'"Success is the product of daily habits, not once-in-a-lifetime transformations." \n– James Clear',
'"Small disciplines repeated with consistency every day lead to great achievements gained slowly over time." \n– John C. Maxwell',
'"Your habits will determine your future." – Jack Canfield',
'"First forget inspiration. Habit is more dependable. Habit will sustain you whether you’re inspired or not." \n– Octavia Butler',
'"Discipline is choosing between what you want now and what you want most." \n– Abraham Lincoln',
'"The secret of your future is hidden in your daily routine." – Mike Murdock',
'"You’ll never change your life until you change something you do daily. The secret of your success is found in your daily routine." \n– John C. Maxwell',
'"Good habits are worth being fanatical about." \n– John Irving',
'"It’s not what we do once in a while that shapes our lives, but what we do consistently." \n– Tony Robbins',
'"The difference between who you are and who you want to be is what you do." \n– Charles Duhigg',
'"Every action you take is a vote for the type of person you wish to become." \n– James Clear'];
let habitsList = JSON.parse(localStorage.getItem("data")) || [];
let currentHabitPage = "Daily";
let idNumber = JSON.parse(localStorage.getItem("idNumber")) || 0;
let currentTheme = JSON.parse(localStorage.getItem("theme")) || colorSchemes[0];

dailyHabitBtn.addEventListener("click", showDailyHabits);
weeklyHabitBtn.addEventListener("click", showWeeklyHabits);
monthlyHabitBtn.addEventListener("click", showMonthlyHabits);
createHabitButton.addEventListener("click", () => openHabitForm("add", ""));
cancelBtn.addEventListener("click", () => confirmChanges("cancel", ""));
searchBtn.addEventListener("click", () => searchHabits(searchBar.value));
noBtn.addEventListener("click", noButton);
themeDropdown.addEventListener("change", () => changeColorScheme(colorSchemes[themeDropdown.value]))
// newHabitForm.addEventListener("submit", (e) => {
//     e.preventDefault();
// })

themeDropdown.value = Number(currentTheme.id);
dateText.innerText = getFormattedDate();

confirmationPopup.hidden = "true";
updateHabitList(habitsList);
getRandomQuote();
checkDate();
showDailyHabits();
changeColorScheme(currentTheme);

function showDailyHabits(){
    currentHabitPage = "Daily";
    dailyHabits.removeAttribute("hidden");
    weeklyHabits.hidden = "true";
    monthlyHabits.hidden = "true";

    dailyHabitBtn.classList.add("selected-button");
    weeklyHabitBtn.classList.remove("selected-button");
    monthlyHabitBtn.classList.remove("selected-button");

    searchBar.value = "";
    updateHabitList(habitsList);

    clearBtn.onclick = () => confirmChanges("clear", "day");

    
}

function showWeeklyHabits(){
    currentHabitPage = "Weekly";
    dailyHabits.hidden = "true";
    weeklyHabits.removeAttribute("hidden");
    monthlyHabits.hidden = "true";

    dailyHabitBtn.classList.remove("selected-button");
    weeklyHabitBtn.classList.add("selected-button");
    monthlyHabitBtn.classList.remove("selected-button");

    searchBar.value = "";
    updateHabitList(habitsList);

    clearBtn.onclick = () => confirmChanges("clear", "week");

    
}

function showMonthlyHabits(){
    currentHabitPage = "Monthly";
    dailyHabits.hidden = "true";
    weeklyHabits.hidden = "true";
    monthlyHabits.removeAttribute("hidden");

    dailyHabitBtn.classList.remove("selected-button");
    weeklyHabitBtn.classList.remove("selected-button");
    monthlyHabitBtn.classList.add("selected-button");

    searchBar.value = "";
    updateHabitList(habitsList);

    clearBtn.onclick = () => confirmChanges("clear", "month");

    
}

function updateHabitList(array) {

    dailyHabits.innerHTML = "";
    weeklyHabits.innerHTML = "";
    monthlyHabits.innerHTML = "";
    const emptyMessageHTML = `<div id="empty-msg">No habits to display.</div>`
    let dailyOverallGoal = 0;
    let dailyOverallProgress = 0;
    let weeklyOverallGoal = 0;
    let weeklyOverallProgress = 0;
    let monthlyOverallGoal = 0;
    let monthlyOverallProgress = 0;


    for(let i = 0; i < array.length; i++) {
        let progressPercentage = (array[i].progress / array[i].frequency) * 100;
        let html = `
        <div class="single-habit-container">
            <button class="complete-btn" onclick="increaseProgress('${array[i].id}')"></button>
            <div class="habit" id="${array[i].id}" style="background: linear-gradient(90deg, var(--color7) ${progressPercentage}%, var(--color6) 0%);">
                <div class="habit-name habit-item">${array[i].name}</div>
                <div class="habit-frequency habit-item">${array[i].frequency} / ${array[i].interval} </div>`;

        if(array[i].progress > array[i].frequency) {
            html += `<div class="habit-progress habit-item" id="progress${i}">${array[i].frequency} / ${array[i].frequency}</div>`;
        }
        else {
            html += `<div class="habit-progress habit-item" id="progress${i}">${array[i].progress} / ${array[i].frequency}</div>`;
        }

        html += `</div>
            <button class="edit-btn" onclick="openHabitForm('edit', '${array[i].id}')"></button>
        </div>`;
        
        if(array[i].interval === "day") {
            dailyHabits.innerHTML += html;
            dailyOverallGoal += Number(array[i].frequency);
            dailyOverallProgress += Number(array[i].progress);
        }
        else if(array[i].interval === "week") {
            weeklyHabits.innerHTML += html;
            weeklyOverallGoal += Number(array[i].frequency);
            weeklyOverallProgress += Number(array[i].progress);
        }
        else if(array[i].interval === "month"){
            monthlyHabits.innerHTML += html;
            monthlyOverallGoal += Number(array[i].frequency);
            monthlyOverallProgress += Number(array[i].progress);
        }

        if(array[i].progress > array[i].interval){
            document.getElementById()
        }

    }

    if(currentHabitPage === "Daily") {
        let dailyProgressPercentage = (dailyOverallProgress / dailyOverallGoal) * 100;
        if(dailyProgressPercentage >= 100 && (dailyOverallGoal !== 0 && dailyOverallProgress !== 0)) {
            progressBarText.innerText = `You have completed your daily habit goal!`;
        }
        else if(dailyOverallGoal === 0 && dailyOverallProgress === 0) {
            progressBarText.innerText = "You currently have no habit goals for today."
            overallProgressBar.style.background = "#cebebe";
        }
        else {
            progressBarText.innerText = `${dailyOverallProgress} / ${dailyOverallGoal} habits completed`;
        }
        overallProgressBar.style.background = `linear-gradient(90deg, var(--color7) ${dailyProgressPercentage}%, var(--color6) 0%)`;
    }
    else if(currentHabitPage === "Weekly") {
        let weeklyProgressPercentage = (weeklyOverallProgress / weeklyOverallGoal) * 100;
        if(weeklyProgressPercentage >= 100 && (weeklyOverallGoal !== 0 && weeklyOverallProgress !== 0)) {
            progressBarText.innerText = "You have completed your weekly habit goal!"
        }
        else if(weeklyOverallGoal === 0 && weeklyOverallProgress === 0) {
            progressBarText.innerText = "You currently have no habit goals for this week."
            overallProgressBar.style.background = "#cebebe";
        }
        else{
            progressBarText.innerText = `${weeklyOverallProgress} / ${weeklyOverallGoal} habits completed`;
        }
        overallProgressBar.style.background = `linear-gradient(90deg, var(--color7) ${weeklyProgressPercentage}%, var(--color6) 0%)`;
    }
    else if(currentHabitPage === "Monthly") {
        let monthlyProgressPercentage = (monthlyOverallProgress / monthlyOverallGoal) * 100;
        if(monthlyProgressPercentage >= 100 && (monthlyOverallGoal !== 0 && monthlyOverallProgress !== 0)) {
            progressBarText.innerText = "You have completed your monthly habit goal!"
        }
        else if(monthlyOverallGoal === 0 && monthlyOverallProgress === 0) {
            progressBarText.innerText = "You currently have no habit goals for this month."
            overallProgressBar.style.background = "#cebebe";
        }
        else{
            progressBarText.innerText = `${monthlyOverallProgress} / ${monthlyOverallGoal} habits completed`;
        }
        overallProgressBar.style.background = `linear-gradient(90deg, var(--color7) ${monthlyProgressPercentage}%, var(--color6) 0%)`;
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
        deleteBtn.onclick = () => confirmChanges("delete", "", habit.id);
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
    searchHabits(searchBar.value);
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
    let habits = [];
    for(let i = 0; i < array.length; i++) {
        if(array[i].name.match(name)) {
            habits.push(array[i]);
        }
    }
    return habits;
}

function searchHabits(name) {
    if(currentHabitPage === "Daily") {
        updateHabitList(findHabitsByName(name, findHabitsByInterval("day")));
    }
    else if(currentHabitPage === "Weekly") {
        updateHabitList(findHabitsByName(name, findHabitsByInterval("week")));
    }
    else {
        updateHabitList(findHabitsByName(name, findHabitsByInterval("month")));
    }
}

function checkDate() {
    let currentDate = new Date();
    //let currentDate = new Date("2024-12-08");
    currentDate.setHours(0, 0, 0, 0);
    let storedDate = localStorage.getItem("oldDate");
    let oldDate = storedDate ? new Date(storedDate) : new Date();
    //let oldDate = new Date("2024-12-07");
    oldDate.setHours(0, 0, 0, 0);

    console.log(currentDate > oldDate);

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


function confirmChanges(action, interval, id) {
    document.getElementsByTagName("body").overflow
    if(action === "clear") {
        if(findHabitsByInterval(interval).length === 0){
            return;
        }
        confirmationPopup.removeAttribute("hidden");
        let intervalText = "";
        switch (interval) {
            case "day" :
                intervalText = "daily";
                break;
            case "week":
                intervalText = "weekly";
                break;
            case "month":
                intervalText = "monthly";
                break;
            default:
                break;
        }
        confirmationPrompt.innerText = `Are you sure you want to clear your ${intervalText} habits? This cannot be undone.`;
        yesBtn.onclick = () => yesButton("clear", interval, "");
    }
    else if(action === "delete") {
        confirmationPopup.removeAttribute("hidden");
        confirmationPrompt.innerText = "Are you sure you want to delete this task? This cannot be undone.";
        yesBtn.onclick = () => yesButton("delete", "", id, "");
    }
    else if(action === "cancel") {
        confirmationPopup.removeAttribute("hidden");
        confirmationPrompt.innerText = "Are you sure you want to cancel? Any unsaved changes will be lost!";
        yesBtn.onclick = () => yesButton("cancel", "", "");
    }
}

function yesButton(action, interval, id) {
    confirmationPopup.hidden = "true";
    if(action === "clear") {
        clearHabitsOfInterval(interval);
    }

    else if(action === "delete") {
        deleteHabit(id);
    }

    else if(action === "cancel") {
        closeHabitForm();
    }
}

function noButton() {
    confirmationPopup.hidden = "true";
    window.onscroll(() => {});
}

function changeColorScheme(colorScheme) {

    document.documentElement.style.setProperty("--color1", colorScheme.color1);
    document.documentElement.style.setProperty("--color2", colorScheme.color2);
    document.documentElement.style.setProperty("--color3", colorScheme.color3);
    document.documentElement.style.setProperty("--color4", colorScheme.color4);
    document.documentElement.style.setProperty("--color5", colorScheme.color5);
    document.documentElement.style.setProperty("--color6", colorScheme.color6);
    document.documentElement.style.setProperty("--color7", colorScheme.color7);

    localStorage.setItem("theme", JSON.stringify(colorScheme));
    
}

function getFormattedDate() {
    let date = new Date();
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let dateText = `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    return dateText;
}

console.log(getFormattedDate());