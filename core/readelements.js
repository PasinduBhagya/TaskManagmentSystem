import { Tasks, loadingRenderedTasks } from './tasks.js';
import { Users } from './users.js';
import { clearUserInputs } from './utility.js';


export function readElements(){
    // Getting Buttons
    const top_menu_tasks_button = document.getElementById('top_menu_tasks_button')
    const top_menu_settings_button = document.getElementById('top_menu_settings_button')
    
    
    const settings_button_user_management = document.getElementById('settings_button_user_management')
    const settings_button_group_management = document.getElementById('settings_button_group_management')
    const settings_button_application_configuration = document.getElementById('settings_button_application_configuration')
    const settings_button_layout = document.getElementById('settings_button_layout')
    
    const task_add_button = document.getElementById('task-add-button')

    
    // Getting Elements
    
    const custom_class_user_information_element = document.getElementById('custom-class-all-user-information-element')
    const custom_class_group_information_element = document.getElementById('custom-class-group-information-element')
    const custom_class_settings_element = document.getElementById('custom-class-settings-element')
    const custom_class_all_user_information_element = document.getElementById('custom-class-all-user-information-element')
    const custom_class_all_groups_information_element = document.getElementById('custom-class-all-groups-information-element')
    const custom_class_application_managment_element = document.getElementById('custom-class-application-managment-element')
    const custom_class_layout_element = document.getElementById('custom-class-layout-element')
    const custom_class_tasks_information_element = document.getElementById('custom-class-tasks-information-element')
    const custom_class_all_tasks_table_element = document.getElementById('custom_class_all_tasks_table_element')
    const custom_class_update_element_backgorund = document.getElementById('custom_class_update_element_backgorund')
    // const custom_class_update_element = document.getElementById('custom_class_update_element')
    const custom_class_update_form = document.getElementById('custom_class_update_form')
    

    function removeAllElements() {
        // custom_class_task_update_element.style.display = 'none'
        custom_class_user_information_element.style.display = 'none'
        custom_class_group_information_element.style.display = 'none'
        custom_class_all_user_information_element.style.display = 'none'
        custom_class_all_groups_information_element.style.display = 'none'
        custom_class_application_managment_element.style.display = 'none'
        custom_class_layout_element.style.display = 'none'
        custom_class_tasks_information_element.style.display = 'none'
        custom_class_all_tasks_table_element.style.display = 'none'
    }
    
    top_menu_settings_button.addEventListener('click', () => {
        Users.get()
        removeAllElements()
        custom_class_settings_element.style.display = 'block'
        custom_class_all_user_information_element.style.display = 'block'
    })

    top_menu_tasks_button.addEventListener('click', () => {
        removeAllElements()
        Tasks.get()
        custom_class_all_tasks_table_element.style.display = 'block'
        custom_class_tasks_information_element.style.display = 'block'
        custom_class_settings_element.style.display = 'none'
    })

    settings_button_user_management.addEventListener('click', ()=> {
        removeAllElements()
        custom_class_settings_element.style.display = 'block'
        custom_class_all_user_information_element.style.display = 'block'       
        
    })
    settings_button_group_management.addEventListener('click', ()=> {
        removeAllElements()
        custom_class_all_groups_information_element.style.display = 'block'  

    })
    settings_button_application_configuration.addEventListener('click', ()=> {
        removeAllElements()
        custom_class_application_managment_element.style.display = 'block' 

    })
    settings_button_layout.addEventListener('click', ()=> {
        removeAllElements()
        custom_class_layout_element.style.display = 'block' 
    })

    task_add_button.onclick = () =>{
        const task_status = document.getElementById('task-add-status').value.trim()
        const task_name = document.getElementById('new-task').value.trim()
        const task_assignee = document.getElementById('task-add-assignee').value.trim()
        console.log(task_assignee)
        Tasks.add(task_name, task_status, task_assignee)
    }

    // custom_class_update_element_backgorund.onclick = () => {
    //     custom_class_update_element_backgorund.style.display = "None"
    //     custom_class_update_element_backgorund.style.zIndex = -1
    //     custom_class_update_form.style.display = 'None'   
    // }



    // document.getElementById('task-filters').addEventListener('change', () =>{
    //     const tasks = Tasks.getWithFilters(document.getElementById('task-filter-assingee'), document.getElementById('task-filter-status'))
    //     console.log(tasks)
    //     loadingRenderedTasks(tasks)
    // })

}


// // Function to Load buttons
// export function buttons(){

//     // const side_menu_tasks = document.getElementsByClassName('side-menu-tasks')[0];
//     const main_content_tasks = document.getElementsByClassName('main-content-tasks')[0];
    
//     const side_menu_settings =  document.getElementsByClassName('side-menu-settings')[0];
//     const main_content_setting_common = document.getElementsByClassName('main-content-setting-common')[0];
    
//     const main_content_settings_user_management = document.getElementsByClassName('main-content-settings-user-management')[0];
//     const main_content_settings_group_management = document.getElementsByClassName('main-content-settings-group-management')[0];
//     const main_content_settings_application_configuration = document.getElementsByClassName('main-content-settings-application-configuration')[0];
//     const pop_blur_background = document.getElementsByClassName('blur-background')[0];

//     const new_user_add_popup = document.getElementById('new-user-add-popup');

//     // For the loadingRenderedUsers to load users
//     let renderedusers = Users.get()

//     // Settings Button on Top Menu
//     document.getElementById('top-menu-settings').onclick = () => {
//         // side_menu_tasks.style.display = 'none'
//         main_content_tasks.style.display = 'none'
//         side_menu_settings.style.display = 'block'
//         main_content_settings_user_management.style.display = 'block'
//         main_content_setting_common.style.display = 'block'
//         main_content_settings_group_management.style.display = 'none'
//         main_content_settings_application_configuration.style.display = 'none'
    
//         loadingRenderedUsers(renderedusers)
//     }
    
//     // Tasks button on Top Menu
//     document.getElementById('top-menu-tasks').onclick = () => {   
//         side_menu_settings.style.display = 'none'
//         // side_menu_tasks.style.display = 'block'
//         main_content_tasks.style.display = 'block'
//         main_content_settings_user_management.style.display = 'none'
//         main_content_setting_common.style.display = 'none'
//         location.reload()    
//     }
    
//     // Adding Tasks
//     document.getElementById('new-task-add-button').onclick = () => {
        
//         let newTask = document.getElementById('new-task').value.trim()
//         let newTaskAssignee = document.getElementById('new-task-add-assignee').value
//         let newTaskStatus = document.getElementById('new-task-add-status').value
        
//         if (newTask !== "" && newTaskAssignee !== "select-assignee"){
//             Tasks.add(newTask, newTaskAssignee, newTaskStatus)
//             renderFilteredTasks()
//             clearUserInputs()
//         }  
//     }

//     // Buttons inside settings
//     document.getElementById('side-menu-settings-user-managment').onclick = () => {
//         main_content_settings_user_management.style.display = 'block'
//         main_content_settings_group_management.style.display = 'none'
//         main_content_settings_application_configuration.style.display = 'none'
//         loadingRenderedUsers(renderedusers)
//         clearUserInputs()
//     }
//     document.getElementById('side-menu-settings-group-management').onclick = () => {
//         main_content_settings_user_management.style.display = 'none'
//         main_content_settings_group_management.style.display = 'block'
//         main_content_settings_application_configuration.style.display = 'none'
//         clearUserInputs()
//     }
//     document.getElementById('side-menu-settings-application-configuration').onclick = () => {
//         main_content_settings_user_management.style.display = 'none'
//         main_content_settings_group_management.style.display = 'none'
//         main_content_settings_application_configuration.style.display = 'block'
//         clearUserInputs()
//     }
    
//     document.getElementById('main-content-settings-user-management-user-search').addEventListener('input', (usersearchevent) => {
//         const renderedusers = Users.getBySearch(usersearchevent.target.value)
//         loadingRenderedUsers(renderedusers)
//     })

//     // Add User Pop up button
//     document.getElementById('new-user-add-pop-button').onclick = () => {
//         new_user_add_popup.style.display = 'block'
//         pop_blur_background.style.zIndex = 100;
//     }

//     // Add user Add button
//     document.getElementById('new-user-add-button').onclick = () => {
//         new_user_add_popup.style.display = 'none'
//         pop_blur_background.style.zIndex = -1;

//         const new_user_first_name = document.getElementById('new-user-first-name').value
//         const new_user_last_name = document.getElementById('new-user-last-name').value
//         const new_user_username = document.getElementById('new-user-username').value
//         const new_user_email = document.getElementById('new-user-email').value
//         const new_user_jira_apikey = document.getElementById('new-user-jira-apikey').value

//         Users.add(new_user_first_name, new_user_last_name, new_user_username, new_user_email, new_user_jira_apikey)
//         clearUserInputs()
//         loadingRenderedUsers(renderedusers)

//     }    
//     // Add user close button
//     document.getElementsByClassName('new-user-add-close-button')[0].onclick = () => {
//         new_user_add_popup.style.display = 'none'
//         pop_blur_background.style.zIndex = -1;
//         clearUserInputs()
//     }    
// }   