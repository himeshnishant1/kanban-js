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

        const editList = taskbox[index].querySelectorAll(".bi-pencil-fill");
            editList.forEach((edit, i) => {
                edit.addEventListener("click", event => {
                    taskbox[index].children[i].children[0].children[0].disabled = false;
                    event.target.parentElement.children[1].classList.remove("hide");
                    event.target.classList.add("hide");
                });
            });

            const saveEditedList = taskbox[index].querySelectorAll(".bi-check2");
            saveEditedList.forEach((save, i) => {
                save.addEventListener("click", event => {
                    const editInput = taskbox[index].children[i].children[0].children[0];
                    editInput.disabled = true;
                    
                    const editedvalue = editInput.value.trim();
                    
                    const taskId = taskbox[index].children[i].children[1].children[0].children[0].innerHTML;
                    
                    if(editedvalue.length)  Kanban.updateTask(taskId, {columnId:index, content:editedvalue});
                    else    editInput.value = Kanban.getTasks(index).find(task => task.taskId == taskId).content;
                    
                    event.target.parentElement.children[0].classList.remove("hide");
                    event.target.classList.add("hide");
                });
            });

            const deleteList = taskbox[index].querySelectorAll(".bi-trash");
            deleteList.forEach((dlt, i) => {
                dlt.addEventListener("click", event => {
                    Kanban.deleteTask(taskbox[index].children[i].children[1].children[0].children[0].innerHTML);
                    taskbox[index].children[i].remove();
                });
            });

            taskbox[index].addEventListener("dragstart", event => {
                if(event.target.classList.contains("card")){
                    event.target.classList.add("dragging");
                }
            });

            taskbox[index].addEventListener("dragover", event => {
                const card = document.querySelector(".dragging");
                taskbox[index].appendChild(card);
            });

            taskbox[index].addEventListener("dragend", event => {
                if(event.target.classList.contains("card")){
                    event.target.classList.remove("dragging");
                    const editedvalue = event.target.children[0].children[0].value;
        
                    const taskId = event.target.children[1].children[0].children[0].innerHTML;

                    Kanban.updateTask(taskId, {columnId: index, content: editedvalue});
                }
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
            //console.log(content);
            if(content.length){
                Kanban.insertTask(index, content);
                updateCards();
            }
            event.target[0].value = "";
        });
    }
}

