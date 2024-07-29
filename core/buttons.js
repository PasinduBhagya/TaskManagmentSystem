import { Tasks } from '../modules/tasks/tasks.js';
import { renderFilteredTasks } from './loading.js';
import { clearUserInputs } from './background.js';

// Function to Load buttons
export function buttons(){
    
    // Settings Button on Top Menu
    document.getElementById('top-menu-settings').onclick = () => {
        document.getElementsByClassName('side-menu-tasks')[0].style.display = 'none' // Hidding the side menu
        document.getElementsByClassName('main-content-tasks')[0].style.display = 'none' // Hidding the side menu
        document.getElementsByClassName('side-menu-settings')[0].style.display = 'block' // Hidding the side menu
        document.getElementsByClassName('main-content-settings-user-management')[0].style.display = 'block'
        
    }
    
    // Tasks button on Top Menu
    document.getElementById('top-menu-tasks').onclick = () => {
        document.getElementsByClassName('side-menu-tasks')[0].style.display = ''  // Unhidding the side menu
        document.getElementsByClassName('main-content-tasks')[0].style.display = '' // Unhidding the side menu
        location.reload()
    }
    
    // Adding Tasks
    document.getElementById('new-task-add-button').onclick = () => {
        
        let newTask = document.getElementById('new-task').value.trim()
        let newTaskAssignee = document.getElementById('new-task-add-assignee').value
        let newTaskStatus = document.getElementById('new-task-add-status').value
        
        if (newTask !== "" && newTaskAssignee !== "select-assignee"){
            Tasks.add(newTask, newTaskAssignee, newTaskStatus)
            renderFilteredTasks()
            clearUserInputs()
        }  
    }
}
    