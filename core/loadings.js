import { StatusValues } from '../modules/common/StatusValues.js'
import { Users } from '../modules/users/users.js'
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
            userListOption.textContent = `${user.firstname} ${user.lastname}`;
    
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

// Loading Rendered Users to the User settings

export function loadingRenderedUsers(users){
    
    let usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = '';

    users.forEach(user => {
        let row = document.createElement('tr');
        row.className = "users-table-tdata-tr"  
        
        row.innerHTML = `
            <td class="users-td-col1">${user.userid}</td>
            <td class="users-td-col2">${user.firstname}</td>
            <td class="users-td-col3">${user.lastname}</td>
            <td class="users-td-col4">${user.username}</td>
            <td class="users-td-col5">${user.email}</td>
            <td class="users-td-col6">
                <button class="user-edit-button" data-id="${user.userid}">Edit</button>
                <button class="user-delete-button" data-id="${user.userid}">Delete</button>
            </td>
        `;
        usersTableBody.appendChild(row);
    });

    document.querySelectorAll('.user-delete-button').forEach(button => {
        button.addEventListener('click', (eventuserDelete) => {
            const userid = Number(eventuserDelete.target.getAttribute('data-id'));
            Users.remove(userid)
            const renderedusers = Users.getBySearch(document.getElementById('main-content-settings-user-management-user-search').value)
            loadingRenderedUsers(renderedusers)     
        });
    });

    // document.querySelectorAll('.user-edit-button').forEach(button => {
    //     button.addEventListener('click', (eventuserEdit) => {
    //         const userid = Number(eventuserEdit.target.getAttribute('data-id'));
    //         console.log(userid + " will be deleted")
    //         const renderedusers = Users.getBySearch(document.getElementById('main-content-settings-user-management-user-search').value)
    //         loadingRenderedUsers(renderedusers)     
    //     });
    // });
}


// Loading retured tasks to the Web UI - Only need for the initial Loading
export function loadingRenderedTasks(tasks) {

    let taskTableBody = document.getElementById('taskTableBody');
    taskTableBody.innerHTML = '';

    tasks.forEach(task => {
        let row = document.createElement('tr');  
        row.className = "tasks-table-tdata-tr"
        
        row.innerHTML = `
            <td class="tasks-td-col1">${task.id}</td>
            <td class="tasks-td-col2">${task.task}</td>
            <td class="tasks-td-col3">${task.assignee}</td>
            <td class="tasks-td-col4" id="status">${task.status}</td>
            <td class="tasks-td-col5">
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