import { apiGet, apiPost, apiDelete, apiUpdate } from './api.js'
import { clearUserInputs } from './utility.js';

export class Tasks {

    constructor(taskID, taskName, assignee, status) {
        this.taskID = taskID;
        this.taskName = taskName;
        this.assignee = assignee;
        this.status = status;
    }

    static add(task_name, task_status, task_assignee, createjiraforme, task_project) {

        const apirequestbody = {
            assigneeid: task_assignee,
            name: task_name,
            status: task_status,
            project: task_project,
            createjiraforme: createjiraforme
        }

        apiPost('/api/tasks', apirequestbody)
        clearUserInputs()
        setTimeout(() => {
            Tasks.get()
        }, 5500);
    }

    static get() {
        apiGet("/api/tasks").then(renderedTasks => {
            sessionStorage.setItem('taskData', JSON.stringify(renderedTasks));
            const tasks = JSON.parse(sessionStorage.getItem('taskData'));
            loadingRenderedTasks(tasks)
        })
    }

    static getByDate(selecteddate) {
        apiGet("/api/tasks/bydate/" + selecteddate).then(renderedTasks => {
            sessionStorage.setItem('filteredDateTaskData', JSON.stringify(renderedTasks));
            loadingRenderedTasks(renderedTasks)
        })
    }

    static getFiltered(selectedDate) {
           
        const userFilterID = Number(sessionStorage.getItem('userFilterData'));
        const statusFilter = sessionStorage.getItem('statusFilterData');

        let renderedTasks = []

        if (selectedDate != ""){
            renderedTasks = JSON.parse(sessionStorage.getItem('filteredDateTaskData'));
        }else{
            renderedTasks = JSON.parse(sessionStorage.getItem('taskData'));
        } 
        let filteredTasks = renderedTasks;
        
        if (userFilterID !== 0) {
            filteredTasks = filteredTasks.filter(task => task.task_assigneeid === userFilterID);
        }
        if (statusFilter !== 'default') {
            filteredTasks = filteredTasks.filter(task => task.task_status === statusFilter);
        }
        if (userFilterID === 0 && statusFilter === 'default') {
            filteredTasks = renderedTasks;
        }
        loadingRenderedTasks(filteredTasks)
    }

    static update(taskid, updatedtaskname, updatedtaskassignee, updatedtaskstatus) {

        const apirequestbody = {
            "id": taskid,
            "assigneeid": updatedtaskassignee,
            "name": updatedtaskname,
            "project": "Homepage Redesign",
            "status": updatedtaskstatus,
            "jiraid": "JIRA-101",
        }
        apiUpdate("/api/tasks/" + taskid, apirequestbody)
        setTimeout(() => {
            Tasks.get()
        }, 500);

    }

    static remove(taskid) {
        apiDelete('/api/tasks/' + taskid)
        setTimeout(() => {
            Tasks.get()
        }, 500);
    }
}

export async function loadingRenderedTasks(renderedTasks) {

    const renderedStatus = JSON.parse(sessionStorage.getItem('statusData'));

    const statusvalues = renderedStatus[0].parameters.split(',');
    const usersvalues = JSON.parse(sessionStorage.getItem('usersData'));

    let taskTableBody = document.getElementById('taskTableBody');
    taskTableBody.innerHTML = '';

    renderedTasks.forEach(task => {

        let statusDropdown = `<select class="form-select form-control-md" id="taskstatus-${task.task_id}">`;
        statusvalues.forEach(value => {
            if (task.task_status === value) {
                statusDropdown += `<option value="${value}" selected>${value}</option>`
            } else {
                statusDropdown += `<option value="${value}">${value}</option>`
            }
        });
        statusDropdown += '</select>';

        
        let usersDropdown = `<select class="form-select form-control-md" id="taskassignee-${task.task_id}">`;
        usersvalues.forEach(user => {
            if (task.task_assigneeid === user.id) {
                usersDropdown += `<option value="${user.id}" selected>${user.firstname} ${user.lastname}</option>`
            } else {
                usersDropdown += `<option value="${user.id}">${user.firstname} ${user.lastname}</option>`
            }
        });
        usersDropdown += '</select>';

        const jiraweburl = JSON.parse(sessionStorage.getItem('statusData'))[1]['parameters'];

        let row = document.createElement('tr');
        row.className = "tasks-table-tdata-tr";
        row.innerHTML = `
        <td class="table-success" scope="row">
            <div class="btn-group dropdown">
                    <b>
                        ${task.task_id}
                    </b>
                <ul class="dropdown-menu p-3" role="menu">
                    <li>
                        <p><b>Go to - </b><a href="${jiraweburl}${task.task_jiraid}" target="_blank">${task.task_jiraid}</a></p>
                        <div class="dropdown-divider"></div>
                        <p><b>Project - </b>${task.task_project}</p>
                        <p><b>Created Date - </b>${task.task_createddate}</p>
                        <p><b>Completed Date - </b>${task.task_completeddate}</p>
                    </li>
                </ul>
            </div>
        </td>
        <td name="taskname" id="taskname-${task.task_id}" class="table-warning">${task.task_name}</td>
        <td>
            ${usersDropdown}
        </td>
        <td id="status">
            ${statusDropdown}
        </td>
        <td style="text-align: center">
            <button class="task-submit-button btn btn-secondary btn-sm" data-id="${task.task_id}">Save</button>
            <button class="task-delete-button btn btn-danger btn-sm" data-id="${task.task_id}">Delete</button>
        </td>
            `;
        taskTableBody.appendChild(row);
    });


    document.querySelectorAll('.task-submit-button').forEach(button => {
        button.addEventListener('click', (eventEdit) => {
            const taskid = Number(eventEdit.target.getAttribute('data-id'));

            const updatedtaskname = (document.getElementById('taskname-' + taskid).innerText).trim()
            const updatedtaskassignee = document.getElementById('taskassignee-' + taskid).value.trim()
            const updatedtaskstatus = document.getElementById('taskstatus-' + taskid).value.trim()

            Tasks.update(taskid, updatedtaskname, updatedtaskassignee, updatedtaskstatus)
            Tasks.get()
        });
    });

    document.querySelectorAll('.task-delete-button').forEach(button => {
        button.addEventListener('click', (eventDelete) => {

            const taskid = Number(eventDelete.target.getAttribute('data-id'));
            let renderedTasks = JSON.parse(sessionStorage.getItem('taskData'));
            let taskFound = false;

            renderedTasks.forEach((task, index) => {
                if (!taskFound && task.task_id === taskid) {
                    renderedTasks.splice(index, 1);
                    taskFound = true;
                    sessionStorage.setItem('taskData', JSON.stringify(renderedTasks));
                    renderedTasks = JSON.parse(sessionStorage.getItem('taskData'));
                }
            });
            if (!taskFound) {
                console.log("No Match Found");
            }

            Tasks.remove(taskid)
        });
    });
}