import { apiGet, apiUpdate } from './api.js'

export class Settings{
    constructor(id, settingsname, settingsvalue){
        this.id = id
        this.settingsname = settingsname
        this.settingsvalue = settingsvalue
    }
    static get(){
        apiGet("/api/settings").then(renderedSettings => {
            sessionStorage.setItem('statusData', JSON.stringify(renderedSettings));
            const settings = JSON.parse(sessionStorage.getItem('statusData'));
            loadSettings(settings)
        })
    }

    static update(jira_web_url, jira_api_url, jira_api_key, jira_projects){
        const apiBody = {
            jiraweburl: jira_web_url,
            jiraapiurl: jira_api_url,
            jiraapikey: jira_api_key,
            jiraprojects:jira_projects
        }
        apiUpdate('/api/settings', apiBody)
    }
    
}

function loadSettings(renderedSettings){
    let statusElements = ['task-add-status', 'task-filter-status']
    
    statusElements.forEach(statusElement => {
        let statusvalues = renderedSettings[0].parameters.split(',')
                
        let element = document.getElementById(statusElement)

        statusvalues.forEach(statusoption => {
            let statuselement = document.createElement('option');

            statuselement.value = statusoption;
            statuselement.textContent = statusoption;
    
            element.appendChild(statuselement)
        })
    })

    const projectvalues = renderedSettings[4].parameters.split(',')
    projectvalues.forEach( project => {
        const projectoption = document.createElement('option');
        projectoption.value = project;
        projectoption.textContent = project;
        document.getElementById("task-add-project").appendChild(projectoption)
    })
}


export function editableTable(){
    
    const table = document.getElementById('tasks-datatables');

    table.addEventListener('click', function(e) {
        const target = e.target;
    
        if (target.tagName === 'TD' && !target.isContentEditable && target.getAttribute('name') === 'taskname') {
            target.setAttribute('contenteditable', 'true');
            target.focus();
    
            // Highlight the column
            const colIndex = target.cellIndex;
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                row.cells[colIndex].classList.add('highlight-column');
            });
        }
    });
    
    table.addEventListener('blur', function(e) {
        const target = e.target;
    
        if (target.tagName === 'TD' && target.isContentEditable) {
            target.removeAttribute('contenteditable');
    
            // Remove highlight from the column
            const colIndex = target.cellIndex;
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                row.cells[colIndex].classList.remove('highlight-column');
            });
        }
    }, true);
}