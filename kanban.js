export default class Kanban{
    static  getTasks(columnId){
        const data = read().find(column => column.columnId == columnId);
        if(!data)   return [];
        return data.tasks;
    }

    static insertTask(columnId, content){
        const data = read();
        const column = data.find(column => column.columnId == columnId);
        const task = {
            taskId: Math.floor(Math.random() * 10000),
            content: content
        }
        column.tasks.push(task);
        write(data);

        return task;
    }

    static updateTask(taskId, updateInfo){
        const data = read();
        function findColumnTask(){
            for(const column of data){
                const task = column.tasks.find(t => t.taskId == taskId);
                if(task){
                    return [task, column];
                }
            }
        }

        const [task, currentCol] = findColumnTask();

        const targetColumn = data.find(column => column.columnId == updateInfo.columnId);

        task.content = updateInfo.content;
        currentCol.tasks.splice(currentCol.tasks.indexOf(task), 1);
        targetColumn.tasks.push(task);

        write(data);
    }

    static deleteTask(taskId){
        const data = read();
        for(const column of data){
            const task = column.tasks.find(t => t.taskId == taskId);
            if(task){
                column.tasks.splice(column.tasks.indexOf(task), 1);
                break;
            }
        }
        write(data);
    }

    static getAllTasks(){
        const data = read();
        updateCount();
        return [data[0].tasks, data[1].tasks, data[2].tasks];
    }
}

function read(){
    const data = localStorage.getItem("data");
    if(!data){
        return [
            {columnId: 0, tasks: []},
            {columnId: 1, tasks: []},
            {columnId: 2, tasks: []}
        ];
    }
    return JSON.parse(data);
}

function write(data){
    localStorage.setItem("data", JSON.stringify(data));
    updateCount();
}

function updateCount(){
    const data = read();

    const todo = document.querySelector(".to-do-task-count");
    todo.textContent = data[0].tasks.length;

    const progress = document.querySelector(".progress-task-count");
    progress.textContent = data[1].tasks.length;
    
    const completed = document.querySelector(".completed-task-count");
    completed.textContent = data[2].tasks.length;
}