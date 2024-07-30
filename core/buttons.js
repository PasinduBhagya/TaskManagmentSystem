import { Tasks } from '../modules/tasks/tasks.js';
import { Users } from '../modules/users/users.js';
import { renderFilteredTasks, loadingRenderedUsers } from './loadings.js';
import { clearUserInputs } from './background.js';


// Function to Load buttons
export function buttons(){

    const side_menu_tasks = document.getElementsByClassName('side-menu-tasks')[0];
    const main_content_tasks = document.getElementsByClassName('main-content-tasks')[0];
    
    const side_menu_settings =  document.getElementsByClassName('side-menu-settings')[0];
    const main_content_setting_common = document.getElementsByClassName('main-content-setting-common')[0];
    
    const main_content_settings_user_management = document.getElementsByClassName('main-content-settings-user-management')[0];
    const main_content_settings_group_management = document.getElementsByClassName('main-content-settings-group-management')[0];
    const main_content_settings_application_configuration = document.getElementsByClassName('main-content-settings-application-configuration')[0];

    // For the loadingRenderedUsers to load users
    let renderedusers = Users.get()

    // Settings Button on Top Menu
    document.getElementById('top-menu-settings').onclick = () => {
        side_menu_tasks.style.display = 'none'
        main_content_tasks.style.display = 'none'
        side_menu_settings.style.display = 'block'
        main_content_settings_user_management.style.display = 'block'
        main_content_setting_common.style.display = 'block'
        main_content_settings_group_management.style.display = 'none'
        main_content_settings_application_configuration.style.display = 'none'
    
        loadingRenderedUsers(renderedusers)
    }
    
    // Tasks button on Top Menu
    document.getElementById('top-menu-tasks').onclick = () => {   
        side_menu_settings.style.display = 'none'
        side_menu_tasks.style.display = 'block'
        main_content_tasks.style.display = 'block'
        main_content_settings_user_management.style.display = 'none'
        main_content_setting_common.style.display = 'none'
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
    
    // Buttons inside settings
    document.getElementById('side-menu-settings-user-managment').onclick = () => {
        main_content_settings_user_management.style.display = 'block'
        main_content_settings_group_management.style.display = 'none'
        main_content_settings_application_configuration.style.display = 'none'
        loadingRenderedUsers(renderedusers)
        clearUserInputs()
    }
    document.getElementById('side-menu-settings-group-management').onclick = () => {
        main_content_settings_user_management.style.display = 'none'
        main_content_settings_group_management.style.display = 'block'
        main_content_settings_application_configuration.style.display = 'none'
        clearUserInputs()
    }
    document.getElementById('side-menu-settings-application-configuration').onclick = () => {
        main_content_settings_user_management.style.display = 'none'
        main_content_settings_group_management.style.display = 'none'
        main_content_settings_application_configuration.style.display = 'block'
        clearUserInputs()
    }
    
    document.getElementById('main-content-settings-user-management-user-search').addEventListener('input', (usersearchevent) => {
        const renderedusers = Users.getBySearch(usersearchevent.target.value)
        loadingRenderedUsers(renderedusers)
    })
    
}   