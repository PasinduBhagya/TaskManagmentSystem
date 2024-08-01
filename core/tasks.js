import { getAPIRequest, sendAPIRequest, sendAPIRequestDelete, sendAPIRequestUpdate } from './api.js'

export class Tasks {

    constructor(taskID, taskName, assignee, status) {
        this.taskID = taskID;
        this.taskName = taskName;
        this.assignee = assignee;
        this.status = status;
    }

    static get() {
        getAPIRequest("/api/tasks").then(renderedTasks => {
            sessionStorage.setItem('taskData', JSON.stringify(renderedTasks));
            loadingRenderedTasks()
        })
    }

    static add(task_name, task_status, task_assignee) {
        sendAPIRequest(task_name, task_status, task_assignee)
    }

    static update(taskid, updatedtaskname, updatedtaskassignee, updatedtaskstatus) {
        sendAPIRequestUpdate(taskid, updatedtaskname, updatedtaskassignee, updatedtaskstatus)
        getAPIRequest("/api/tasks").then(renderedTasks => {
            sessionStorage.setItem('taskData', JSON.stringify(renderedTasks));
        })
    }

    static remove(taskid) {
        sendAPIRequestDelete(taskid)
    }
}

export async function loadingRenderedTasks() {

    const renderedTasks = JSON.parse(sessionStorage.getItem('taskData'));
    const renderedStatus = JSON.parse(sessionStorage.getItem('statusData'));
    const statusvalues = renderedStatus[0].parameters.split(',');
    const usersvalues = JSON.parse(sessionStorage.getItem('usersData'));

    let taskTableBody = document.getElementById('taskTableBody');
    taskTableBody.innerHTML = '';

    renderedTasks.forEach(task => {

        let statusDropdown = `<select class="form-select form-control-md" id="taskstatus-${task.task_id}">`;
        statusvalues.forEach(value => {
            if (task.task_status === value){
                statusDropdown += `<option value="${value}" selected>${value}</option>`
            }else{
                statusDropdown += `<option value="${value}">${value}</option>`
            }
        });
        statusDropdown += '</select>';

        
        let usersDropdown = `<select class="form-select form-control-md" id="taskassignee-${task.task_id}">`;
        usersvalues.forEach(user => {
            if (task.task_assingeeid === user.id){
                usersDropdown += `<option value="${user.id}" selected>${user.firstname} ${user.lastname}</option>`
            }else{
                usersDropdown += `<option value="${user.id}">${user.firstname} ${user.lastname}</option>` 
            }
        });
        usersDropdown += '</select>';


        let row = document.createElement('tr');
        row.className = "tasks-table-tdata-tr";
        row.innerHTML = `
        <td class="table-success" scope="row">${task.task_id}</td>
        <td name="taskname" id="taskname-${task.task_id}" class="table-warning">${task.task_name}</td>
        <td>
            ${usersDropdown}
        </td>
        <td id="status">
            ${statusDropdown}
        </td>
        <td>
            <button class="task-sumit-button" data-id="${task.task_id}">Submit</button>
            <button class="task-delete-button" data-id="${task.task_id}">Delete</button>
        </td>
    `;
        taskTableBody.appendChild(row);
    });


    document.querySelectorAll('.task-sumit-button').forEach(button => {
        button.addEventListener('click', (eventEdit) => {
            const taskid = Number(eventEdit.target.getAttribute('data-id'));

            const updatedtaskname = (document.getElementById('taskname-' + taskid).innerText).trim()
            const updatedtaskassignee = document.getElementById('taskassignee-' + taskid).value.trim()
            const updatedtaskstatus = document.getElementById('taskstatus-' + taskid).value.trim()

            Tasks.update(taskid, updatedtaskname, updatedtaskassignee, updatedtaskstatus)
        });
    });

    document.querySelectorAll('.task-delete-button').forEach(button => {
        button.addEventListener('click', (eventDelete) => {

            const taskid = Number(eventDelete.target.getAttribute('data-id'));
            const renderedTasks = JSON.parse(sessionStorage.getItem('taskData'));
            let taskFound = false;

            renderedTasks.forEach((task, index) => {
                if (!taskFound && task.task_id === taskid) {
                    renderedTasks.splice(index, 1);
                    taskFound = true;
                    sessionStorage.setItem('taskData', JSON.stringify(renderedTasks));
                    loadingRenderedTasks()
                }
            });
            if (!taskFound) {
                console.log("No Match Found");
            }
            Tasks.remove(taskid)
        });
    });
}