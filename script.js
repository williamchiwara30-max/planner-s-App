let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showPage(pageId){

    let pages = document.querySelectorAll(".page");

    pages.forEach(page=>{
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
}

function addTask(){

    let input = document.getElementById("taskInput");

    if(input.value.trim() === ""){
        return;
    }

    tasks.push({
        text:input.value,
        done:false
    });

    input.value = "";

    saveTasks();
    displayTasks();
}

function displayTasks(){

    let list = document.getElementById("taskList");

    list.innerHTML = "";

    let completed = 0;

    tasks.forEach((task,index)=>{

        if(task.done){
            completed++;
        }

        let li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.done ? 'done' : ''}">
                ${task.text}
            </span>

            <div class="actions">
                <button class="complete" onclick="toggleTask(${index})">✓</button>
                <button class="delete" onclick="deleteTask(${index})">X</button>
            </div>
        `;

        list.appendChild(li);
    });

    document.getElementById("taskCount").textContent = tasks.length;
    document.getElementById("completeCount").textContent = completed;
}

function toggleTask(index){

    tasks[index].done = !tasks[index].done;

    saveTasks();
    displayTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();
    displayTasks();
}

function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function saveNote(){

    let note = document.getElementById("noteInput").value;

    localStorage.setItem("note",note);

    document.getElementById("savedNote").textContent = note;
}

function loadNote(){

    let note = localStorage.getItem("note") || "";

    document.getElementById("noteInput").value = note;
    document.getElementById("savedNote").textContent = note;
}

function loadDate(){

    let date = new Date();

    document.getElementById("todayDate").textContent =
    date.toLocaleDateString();
}

function createCalendar(){

    let date = new Date();

    let days = new Date(
        date.getFullYear(),
        date.getMonth()+1,
        0
    ).getDate();

    document.getElementById("month").textContent =
    date.toLocaleString("default",{month:"long"}) +
    " " +
    date.getFullYear();

    let grid = document.getElementById("calendarGrid");

    grid.innerHTML = "";

    for(let i=1;i<=days;i++){

        let div = document.createElement("div");

        div.classList.add("day");

        if(i === date.getDate()){
            div.classList.add("today");
        }

        div.textContent = i;

        grid.appendChild(div);
    }
}

displayTasks();
loadNote();
loadDate();
createCalendar();