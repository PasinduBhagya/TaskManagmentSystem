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

    function removeAllElements() {
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
        Tasks.add(task_name, task_status, task_assignee)
    }
}
