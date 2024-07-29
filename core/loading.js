import { StatusValues } from '../modules/common/StatusValues.js'
import { Users } from '../modules/common/AssingeesValues.js'
import { Tasks } from '../modules/tasks/tasks.js'

export function loadStatusValues(){
    let statusValues = StatusValues.get()
    let statusElements = ['new-task-add-status', 'task-update-status', 'task-filter-status']

    statusElements.forEach(statusElement => {

        let statusList = document.getElementById(statusElement)

        statusValues.forEach(singleStatus => {
            let statusListOption = document.createElement('option');

            statusListOption.value = singleStatus.statusValue;
            statusListOption.textContent = singleStatus.statusValue;
    
            statusList.appendChild(statusListOption)
        })
    }) 
}

export function loadUsersValues(){
    let useElements = ['new-task-add-assignee', 'update-task-assignee', 'task-filter-assingee']
    let usersValues = Users.get()
    useElements.forEach(userElement =>{
        if(!userElement){
            console.log(userElement + " is not")
        }
        let usersList = document.getElementById(userElement);
        usersValues.forEach(user => {
            let userListOption = document.createElement('option');
            userListOption.value = user.username;
            userListOption.textContent = user.username;
    
            usersList.appendChild(userListOption)
        }) 
    })
}

// Loading retured tasks to the Web UI
export function renderFilteredTasks(){
    let filteredStatus = document.getElementById('task-filter-status').value
    let filteredAssignee = document.getElementById('task-filter-assingee').value
    let filteredTasks = Tasks.getWithFilters(filteredStatus, filteredAssignee)
    
    loadingRenderedTasks(filteredTasks)
}

// Loading retured tasks to the Web UI - Only need for the initial Loading
export function loadingRenderedTasks(tasks) {

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
                <button class="task-edit-button" data-id="${task.id}">Edit</button>
                <button class="task-delete-button" data-id="${task.id}">Delete</button>
            </td>
        `;
    taskTableBody.appendChild(row);
    });
    
    document.querySelectorAll('.task-edit-button').forEach(button => {
        button.addEventListener('click', (eventEdit) => {
            const taskid = Number(eventEdit.target.getAttribute('data-id'));
            
            const updatePopup = document.getElementById('update-task-popup');

            const closeButton = document.querySelector('.task-update-popup-close-button');
            const updateButton = document.getElementById('task-update-button');
            
            let taskToUpdate = Tasks.getTaskByID(taskid)
            
            updatePopup.style.display = 'block';
            
            document.getElementById('update-task-name').value = taskToUpdate.task
            document.getElementById('update-task-assignee').value = taskToUpdate.assignee
            document.getElementById('task-update-status').value = taskToUpdate.status

            closeButton.onclick = () => {
                updatePopup.style.display = 'none';
            }
            
            updateButton.onclick = () => {
                let updatedTaskObject = {   
                    id: taskid,
                    task: document.getElementById('update-task-name').value,
                    assignee: document.getElementById('update-task-assignee').value,
                    status: document.getElementById('task-update-status').value,
                }
                Tasks.update(updatedTaskObject, taskToUpdate)
                updatePopup.style.display = 'none';
                renderFilteredTasks() 
            }                
        });
    });

    document.querySelectorAll('.task-delete-button').forEach(button => {
        button.addEventListener('click', (eventDelete) => {
            const taskid = Number(eventDelete.target.getAttribute('data-id'));
            Tasks.remove(taskid)
            renderFilteredTasks()        
        });
    });

}