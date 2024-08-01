import { clearUserInputs } from './utility.js';
let fetchData = [];

export async function getAPIRequest(path) {
    const endpointIP = "http://192.168.8.103:8080"
    try {
        const response = await fetch(endpointIP + path);
        const data = await response.json();
        fetchData = data;
        return fetchData;
    } catch (error) {
        console.error('Error fetching data from the server:', error);
        return [];
    }

}

export async function getItemAPIRequest(path) {
    const endpointIP = "http://192.168.8.103:8080"
    try {
        const response = await fetch(endpointIP + path);
        const data = await response.json();
        fetchData = data;
                
        return fetchData;
    } catch (error) {
        console.error('Error fetching data from the server:', error);
        return [];
    }

}

export function sendAPIRequest(task_name, task_status, task_assignee){
    
    const endpointIP = "http://192.168.8.103:8080/api/tasks"
    fetch(endpointIP, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            assigneeid: task_assignee,
            name: task_name,
            status: task_status,
            jiraid: null,
            createddate : "1970-01-14",
            completeddate : null,
            project: null
        })
    }).then(response => {
        console.log(response)
        clearUserInputs()
    })
}

export function sendAPIRequestDelete(taskid){
    
    const endpointIP = "http://192.168.8.103:8080/api/tasks/" + taskid
    fetch(endpointIP, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).then(response => {
        console.log(response)
        clearUserInputs()
    })
}

export function sendAPIRequestUpdate(taskid, updatedtaskname, updatedtaskassignee, updatedtaskstatus){
    
    const endpointIP = "http://192.168.8.103:8080/" + taskid
    fetch(endpointIP, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        "id": 1,
        "assigneeid": updatedtaskassignee,
        "name": updatedtaskname,
        "project": "Homepage Redesign",
        "status": updatedtaskstatus,
        "jiraid": "JIRA-101",
        "createddate": "2024-07-01",
        "completeddate": "2024-07-10"
        })
    }).then(response => {
        clearUserInputs()
    })
}


// export async function sendAPIRequest(path) {
    
//     try {
//         const response = await fetch(endpointIP + path);
//         const data = await response.json();
//         fetchData = data;
//         return fetchData;
//     } catch (error) {
//         console.error('Error fetching data from the server:', error);
//         return [];
//     }
// }
