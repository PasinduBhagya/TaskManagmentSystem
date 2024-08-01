import { getAPIRequest } from './api.js'

export class Settings{
    constructor(id, settingsname, settingsvalue){
        this.id = id
        this.settingsname = settingsname
        this.settingsvalue = settingsvalue
    }
    static async get(){
        getAPIRequest("/api/settings").then(renderedSettings => {
            this.load(renderedSettings)
            sessionStorage.setItem('statusData', JSON.stringify(renderedSettings));
            return renderedSettings
        })
    }
    static async load(renderedSettings){
        
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
    }
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

    const selectElement = document.getElementById('task-filter-status');
    selectElement.addEventListener('change', function(){
        console.log("Change")
    })
}