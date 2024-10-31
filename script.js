document.addEventListener("DOMContentLoaded",()=>{
    const todoInput =  document.getElementById("todo-input")
    const addTask = document.getElementById("add-task-btn")
    const todoList = document.getElementById("todo-list")


    let tasks = JSON.parse(localStorage.getItem('tasks') )|| [];

    tasks.forEach(task => {
        render(task);
    });

    addTask.addEventListener("click",()=>{
        const taskText = todoInput.value.trim()
        if(taskText === "") return;

        const newTask = {
            Id:Date.now(),
            text:taskText,
            complete:false,
        }
        tasks.push(newTask);
        savTasks();
        render(newTask);
        todoInput.value = '';
        console.log(tasks);
    })

    function render(task){
        const li = document.createElement("li");
        li.setAttribute("data-id",task.Id)
        if(task.complete === true){
            li.classList="delete"
        }
        li.innerHTML = `<span>${task.text}</span><button>Delete</button>`
        li.addEventListener("click",(e)=>{
            if(e.target.tagName == "BUTTON") return;
            task.complete = !task.complete
            li.classList.toggle('delete')
            savTasks();
        })
        li.querySelector("button").addEventListener("click",(e)=>{
            e.stopPropagation();
            tasks = tasks.filter((t)=>t.Id === task.Id)
            li.remove();
            savTasks();
        })

        todoList.appendChild(li);

    }

    function savTasks(){
        localStorage.setItem("tasks",JSON.stringify(tasks))
    }
})