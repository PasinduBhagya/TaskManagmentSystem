import { Tasks } from './tasks.js'
import { readElements } from './readelements.js'
import { clearUserInputs } from './utility.js'
import { getAPIRequest } from './api.js'

import { Settings } from './setting.js'
import { Users } from './users.js'

// Loading buttons
readElements()

window.addEventListener('DOMContentLoaded', () =>{

    // Redering for the first time  
    Tasks.get()
    Settings.get()
    Users.load()
    
    // loadStatusValues()
    // loadUsersValues()
    // clearUserInputs()


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
})