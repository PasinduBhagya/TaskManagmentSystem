import { apiGet, apiPost, apiDelete, apiUpdate } from './api.js'

export class Tasks {

    constructor(taskID, taskName, assignee, status) {
        this.taskID = taskID;
        this.taskName = taskName;
        this.assignee = assignee;
        this.status = status;
    }
    
    static add(task_name, task_status, task_assignee) {
        
        const apirequestbody = {
            assigneeid: task_assignee,
            name: task_name,
            status: task_status,
            jiraid: null,
            createddate: "1970-01-14",
            completeddate: null,
            project: null
        }

        apiPost('/api/tasks', apirequestbody)



        Tasks.getFiltered()
    }

    static get() {
        apiGet("/api/tasks").then(renderedTasks => {
            sessionStorage.setItem('taskData', JSON.stringify(renderedTasks));
            const tasks = JSON.parse(sessionStorage.getItem('taskData'));
            loadingRenderedTasks(tasks)
        })
    }

    static getFiltered(){

        const renderedTasks = JSON.parse(sessionStorage.getItem('taskData'));
        const userFilterID = Number(sessionStorage.getItem('userFilterData'))
        const statusFilter = sessionStorage.getItem('statusFilterData')

        if (userFilterID === 0 && statusFilter === 'default' || userFilterID === 0 && statusFilter === null){
            return Tasks.get()
        }else if(userFilterID === 0 && statusFilter !== 'default'){
            loadingRenderedTasks(renderedTasks.filter(task => task.task_status === statusFilter))
        }else if(userFilterID !== 0 && statusFilter === 'default'){
            loadingRenderedTasks(renderedTasks.filter(task => task.task_assingeeid === userFilterID))
        }else if(userFilterID !== 0 && statusFilter !== 'default'){
            loadingRenderedTasks(renderedTasks.filter(task => task.task_assingeeid === userFilterID && task.task_status === statusFilter))
        }
        console.log(userFilterID)
        console.log(statusFilter)
    }

    static update(taskid, updatedtaskname, updatedtaskassignee, updatedtaskstatus) {

        const apirequestbody = {
                "id": taskid,
                "assigneeid": updatedtaskassignee,
                "name": updatedtaskname,
                "project": "Homepage Redesign",
                "status": updatedtaskstatus,
                "jiraid": "JIRA-101",
                "createddate": "2024-07-01",
                "completeddate": "2024-07-10"
        }

        apiUpdate("/api/tasks/" + taskid, apirequestbody, updatedtaskname, updatedtaskassignee, updatedtaskstatus)
        apiGet("/api/tasks").then(renderedTasks => {
            sessionStorage.setItem('taskData', JSON.stringify(renderedTasks));
        })
    }

    static remove(taskid) {
        apiDelete('/api/tasks/' + taskid)
        Tasks.getFiltered()
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