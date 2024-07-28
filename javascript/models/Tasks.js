import { clearUserInputs } from '../common/ClearUserInputs.js';

let tasks = [
    {   
        id: 1,
        task: "Task 1",
        assignee: "user1",
        status: "Completed"
    },
    {   
        id: 2,
        task: "Task 2",
        assignee: "user1",
        status: "On-Hold"
    },
    {   
        id: 3,
        task: "Task 3",
        assignee: "user3",
        status: "Completed"
    },
    {   
        id: 4,
        task: "Task 4",
        assignee: "user2",
        status: "On-Hold"
    },
    {   
        id: 5,
        task: "Task 5",
        assignee: "user1",
        status: "Completed"
    },
    {   
        id: 6,
        task: "Task 6",
        assignee: "user1",
        status: "Pending"
    },
    {   
        id: 7,
        task: "Task 7",
        assignee: "user2",
        status: "Pending"
    },
    {   
        id: 8,
        task: "Task 8",
        assignee: "user3",
        status: "Completed"
    },
    {   
        id: 9,
        task: "Task 7",
        assignee: "user2",
        status: "Pending"
    },
    {   
        id: 10,
        task: "Task 8",
        assignee: "user3",
        status: "Completed"
    },
    {   
        id: 11,
        task: "Task 1",
        assignee: "user1",
        status: "Completed"
    },
    {   
        id: 12,
        task: "Task 2",
        assignee: "user1",
        status: "On-Hold"
    },
    {   
        id: 13,
        task: "Task 3",
        assignee: "user3",
        status: "Completed"
    },
    {   
        id: 14,
        task: "Task 4",
        assignee: "user2",
        status: "On-Hold"
    },
    {   
        id: 15,
        task: "Task 5",
        assignee: "user1",
        status: "Completed"
    },
    {   
        id: 16,
        task: "Task 6",
        assignee: "user1",
        status: "Pending"
    },
    {   
        id: 17,
        task: "Task 7",
        assignee: "user2",
        status: "Pending"
    },
    {   
        id: 18,
        task: "Task 8",
        assignee: "user3",
        status: "Completed"
    },
    {   
        id: 19,
        task: "Task 7",
        assignee: "user2",
        status: "Pending"
    },
    {   
        id: 20,
        task: "Task 8",
        assignee: "user3",
        status: "Completed"
    },
    {   
        id: 21,
        task: "Task 1",
        assignee: "user1",
        status: "Completed"
    },
    {   
        id: 22,
        task: "Task 2",
        assignee: "user1",
        status: "On-Hold"
    },
    {   
        id: 23,
        task: "Task 3",
        assignee: "user3",
        status: "Completed"
    },
    {   
        id: 24,
        task: "Task 4",
        assignee: "user2",
        status: "On-Hold"
    },
    {   
        id: 25,
        task: "Task 5",
        assignee: "user1",
        status: "Completed"
    },
    {   
        id: 26,
        task: "Task 6",
        assignee: "user1",
        status: "Pending"
    },
    {   
        id: 27,
        task: "Task 7",
        assignee: "user2",
        status: "Pending"
    },
    {   
        id: 28,
        task: "Task 8",
        assignee: "user3",
        status: "Completed"
    },
    {   
        id: 29,
        task: "Task 7",
        assignee: "user2",
        status: "Pending"
    },
    {   
        id: 30,
        task: "Task 8",
        assignee: "user3",
        status: "Completed"
    },
];

export class Task {
    constructor(taskID, taskName, assignee, status){
        this.taskID = taskID;
        this.taskName = taskName;
        this.assignee = assignee;
        this.status = status;
    }

    static addNewTask(){
        let newTaskID = tasks[tasks.length - 1].id + 1
        let newTaskName = document.getElementById('taskname').value.trim()
        let newTaskAssignee = document.getElementById('usersList').value
        let newTaskStatus = document.getElementById('assingeeStatus').value

        if (newTaskName !== "" && newTaskAssignee !== "select-assignee"){
            let task = {id: newTaskID, task: newTaskName, assignee: newTaskAssignee, status: newTaskStatus }
            
            tasks.push(task)
            
            Task.getAllTasks()
            clearUserInputs()
        }
    }

    static getAllTasks() {
        clearUserInputs()
        loadAllTasks(tasks);
    }

    static getTaskByID(taskID) {
        const task = tasks.find(task => task.id === taskID);
        
        return task
    }

    static getTaskByFilters(status, assignee) {
        if (status !== "default" && assignee !== "default"){
            const filteredTasks = tasks.filter(task => task.assignee === assignee && task.status === status);
            loadAllTasks(filteredTasks);
        }
        else if (status === "default" && assignee !== "default"){
            const filteredTasks = tasks.filter(task => task.assignee === assignee);
            loadAllTasks(filteredTasks);
        }
        else if (status !== "default" && assignee === "default"){
            const filteredTasks = tasks.filter(task =>task.status === status);
            loadAllTasks(filteredTasks);
        }
    }

    static updateTask(taskID){
        let taskToUpdate = Task.getTaskByID(parseInt(taskID))
        let taskIndex = tasks.indexOf(taskToUpdate)

        let updateButton = document.getElementById('updateTask')
        let updateBox = document.getElementById('updateBox')

        // Adding the current task value
        let taskInputField = document.getElementById('updateTaskName')
        taskInputField.value = tasks[taskIndex].task

        // Adding the current status
        let usersUpdateList = document.getElementById('usersUpdateList')
        usersUpdateList.value = tasks[taskIndex].assignee

        // Adding the current Assingee
        let statusUpdateList = document.getElementById('statusUpdateList')
        statusUpdateList.value = tasks[taskIndex].status

        updateBox.style.display = 'block';

        let updateContentBox = document.getElementsByClassName('updateBoxClose')[0];
        updateContentBox.onclick = function() {
            updateBox.style.display = 'none';
          }
        
          const updateTaskHandler = () => {
            tasks[taskIndex].task = taskInputField.value;
            tasks[taskIndex].assignee = usersUpdateList.value;
            tasks[taskIndex].status = statusUpdateList.value;
    
            Task.getAllTasks();
            updateBox.style.display = 'none';
    
            taskInputField.value = '';
            usersUpdateList.value = '';
            statusUpdateList.value = '';
    
            updateButton.removeEventListener('click', updateTaskHandler);
        };
    
        updateButton.removeEventListener('click', updateTaskHandler);
        updateButton.addEventListener('click', updateTaskHandler);
        
        window.onclick = function(event) {
            if (event.target == updateBox) {
                updateBox.style.display = 'none';
            }
        }
    }

    static deleteTaskByID(taskID){
        tasks.forEach(task => {if(task.id === taskID){
            let indexToDelete = tasks.indexOf(task)
            if(indexToDelete !== -1){
                tasks.splice(indexToDelete, 1)
            }
        }}) 
    }  
}

function loadAllTasks(tasks) {

    let taskTableBody = document.getElementById('taskTableBody');
    taskTableBody.innerHTML = '';

    tasks.forEach(task => {
        let row = document.createElement('tr');  
        
        row.innerHTML = `
            <td>${task.id}</td>
            <td>${task.task}</td>
            <td>${task.assignee}</td>
            <td id="status">${task.status}</td>
            <td class="actions">
                <button class="edit-button" data-id="${task.id}">Edit</button>
                <button class="delete-button" data-id="${task.id}">Delete</button>
            </td>
        `;
    taskTableBody.appendChild(row);
    });
    
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const taskID = event.target.getAttribute('data-id');
            Task.deleteTaskByID(parseInt(taskID));
            Task.getAllTasks()
            
        });
    });

    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const taskID = event.target.getAttribute('data-id');

            Task.updateTask(taskID)                  
        });
    });
}