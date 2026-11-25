let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskName = document.getElementById("taskName");
const taskCategory = document.getElementById("taskCategory");
const taskDeadline = document.getElementById("taskDeadline");
const taskStatus = document.getElementById("taskStatus");
const addTaskButton =  document.getElementById("addTaskButton");
const taskFilter = document.getElementById("taskFilter");
const taskList = document.getElementById("taskList");

function addTask(){
    if(!taskName.value || !taskCategory.value || !taskDeadline.value){
        alert("Fill in all fields");
        return;
    }
        let task={
            name: taskName.value,
            category: taskCategory.value,
            deadline: taskDeadline.value,
            status: taskStatus.value
        };

        tasks.push(task);

        taskName.value = "";
        taskCategory.value = "";
        taskDeadline.value = "";

        checkOverdueTasks();
        saveTasks();
        displayTasks();
}

function displayTasks(){
    taskList.innerHTML = "";

    for (let task of tasks) {
        if(taskFilter.value === "All" || task.status === taskFilter.value){
            let li = document.createElement("li");

            let info = document.createElement("p");
            info.textContent = task.name + " | " + task.category + " | " + task.deadline + " | " + task.status;

            let dropdown = document.createElement("select");

            let option1 = document.createElement("option");
            option1.value = "In Progress";
            option1.textContent = "In Progress";

            let option2 = document.createElement("option");
            option2.value = "Completed";
            option2.textContent = "Completed";

            dropdown.appendChild(option1);
            dropdown.appendChild(option2);

            dropdown.value = task.status;

            dropdown.addEventListener("change", function() {
            task.status = dropdown.value;

                checkOverdueTasks();
                saveTasks();
                displayTasks();
            });

            li.appendChild(info);
            li.appendChild(dropdown);

            taskList.appendChild(li);
        }
    }
}

function checkOverdueTasks(){
    let today = new Date();
    today.setHours(0,0,0,0);

    for (let task of tasks){
        let deadline = new Date(task.deadline + "T00:00:00");

        if (deadline < today && task.status !== "Completed") {
            task.status = "Overdue";
        }
    }
}


function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskButton.addEventListener("click", addTask);
taskFilter.addEventListener("change", displayTasks);

checkOverdueTasks();
displayTasks();

