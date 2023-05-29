import Kanban from "./kanban.js";

const todo = document.querySelector(".to-do-activities");
const progress = document.querySelector(".progress-activities");
const completed = document.querySelector(".completed-activities");

const taskbox = [todo, progress, completed];
const sectionNames = ["todo", "progress", "completed"];

function updateCards(){
    Kanban.getAllTasks().forEach( (tasks, index) => {
        taskbox[index].innerHTML = "";
        tasks.forEach(task => {
            taskbox[index].innerHTML += `<div class="card ${sectionNames[index]}" draggable="true" dataset="${task.taskId}">
                                            <div class="card-section1">
                                                <input type="text" name="card" id="card-task-name" class="card-task-name" value="${task.content}" disabled>
                                            </div>
                                            <div class="card-section2">
                                                <div class="section21">
                                                    <span class="task-id">${task.taskId}</span>
                                                </div>
                                                <div class="section22">
                                                    <span class="edit completed">
                                                        <i class="bi bi-pencil-fill"></i>
                                                        <i class="bi bi-check2 hide"></i>
                                                    </span>
                                                    <span class="delete completed">
                                                        <i class="bi bi-trash"></i>
                                                    </span>
                                                </div>
                                            </div>`;
        });
    });
}

updateCards();

const addForm = document.querySelectorAll(".addn");
addOnSubmitEvents();

function addOnSubmitEvents(){
    for(let index = 0; index <= 2; index++){
        addForm[index].addEventListener("submit", event => {
            event.preventDefault();
            const content = event.target[0].value.trim();
            console.log(content);
            if(content.length){
                Kanban.insertTask(index, content);
                updateCards();
            }
        });
    }
}

