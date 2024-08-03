import { Tasks } from './tasks.js';
import { Users } from './users.js';
import { Settings } from './settings.js';
import { clearUserInputs } from './utility.js';


export function readElements(){
    // Getting Buttons
    const top_menu_tasks_button = document.getElementById('top_menu_tasks_button')
    const top_menu_settings_button = document.getElementById('top_menu_settings_button')
    
    const settings_button_user_management = document.getElementById('settings_button_user_management')
    const settings_button_application_configuration = document.getElementById('settings_button_application_configuration')
    
    const task_add_button = document.getElementById('task-add-button')

    const add_new_user = document.getElementById('add_new_user')
    const add_new_user_confirm_button = document.getElementById('add_new_user_confirm_button')
    const add_new_user_cancel_button = document.getElementById('add_new_user_cancel_button')
    
    const custom_class_user_information_element = document.getElementById('custom-class-all-user-information-element')
    const custom_class_group_information_element = document.getElementById('custom-class-group-information-element')
    const custom_class_settings_element = document.getElementById('custom-class-settings-element')
    const custom_class_all_user_information_element = document.getElementById('custom-class-all-user-information-element')
    const custom_class_application_managment_element = document.getElementById('custom-class-application-managment-element')
    const custom_class_layout_element = document.getElementById('custom-class-layout-element')
    const custom_class_tasks_information_element = document.getElementById('custom-class-tasks-information-element')
    const custom_class_all_tasks_table_element = document.getElementById('custom_class_all_tasks_table_element')

    const task_filters =  document.getElementById('task-filters')
    const task_filter_assingee = document.getElementById('task-filter-assingee')
    const task_filter_status = document.getElementById('task-filter-status')
    const task_filter_date = document.getElementById('task_filter_date')

    task_filter_date.value = new Date().toISOString().split('T')[0];

    const add_new_user_confirm_area = document.getElementById('add_new_user_confirm_area')
    const user_update_button_area = document.getElementById('user_update_button_area')

    const jira_web_url = document.getElementById('jira_web_url')
    const jira_api_url = document.getElementById('jira_api_url')
    const jira_api_key = document.getElementById('jira_api_key')
    const jira_projects = document.getElementById('jira_projects')
     
    const user_search = document.getElementById('user-search')

    const custom_class_new_user_information_element = document.getElementById('custom_class_new_user_information_element')


    const application_manger_save_changes_button = document.getElementById('application_manger_save_changes_button')

    function removeAllElements() {
        custom_class_user_information_element.style.display = 'none'
        custom_class_group_information_element.style.display = 'none'
        custom_class_all_user_information_element.style.display = 'none'
        custom_class_application_managment_element.style.display = 'none'
        custom_class_layout_element.style.display = 'none'
        custom_class_tasks_information_element.style.display = 'none'
        custom_class_all_tasks_table_element.style.display = 'none'
        custom_class_new_user_information_element.style.display = 'none'
    }
    
    top_menu_settings_button.addEventListener('click', () => {
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
        Users.get()
        removeAllElements()
        custom_class_settings_element.style.display = 'block'
        custom_class_all_user_information_element.style.display = 'block'       
        
    })
    settings_button_application_configuration.addEventListener('click', ()=> {
        removeAllElements()
        custom_class_application_managment_element.style.display = 'block' 
        jira_web_url.value = JSON.parse(sessionStorage.getItem('statusData'))[1].parameters
        jira_api_url.value = JSON.parse(sessionStorage.getItem('statusData'))[2].parameters
        // jira_api_key= JSON.parse(sessionStorage.getItem('statusData'))[3].parameters;
        jira_projects.value = JSON.parse(sessionStorage.getItem('statusData'))[4].parameters
    })

    task_add_button.onclick = () =>{
        const task_status = document.getElementById('task-add-status').value.trim()
        const task_name = document.getElementById('new-task').value.trim()
        const task_assignee = document.getElementById('task-add-assignee').value.trim()
        const task_project = document.getElementById('task-add-project').value.trim()
        const createjiraforme = document.getElementById('createjiraforme').checked
        Tasks.add(task_name, task_status, task_assignee, createjiraforme, task_project)
    }

    task_filters.addEventListener('change', ()=>{
        sessionStorage.setItem('userFilterData', Number(task_filter_assingee.value));
        sessionStorage.setItem('statusFilterData', task_filter_status.value);
        Tasks.getFiltered()
    })

    add_new_user.onclick = () =>{
        custom_class_all_user_information_element.style.display = 'None'
        custom_class_new_user_information_element.style.display = 'block'
        add_new_user_confirm_area.style.display = 'block';
        user_update_button_area.style.display = 'none';
    }

    add_new_user_cancel_button.onclick = (cancelButtonClickEvent) => {
        custom_class_all_user_information_element.style.display = 'block'
        custom_class_new_user_information_element.style.display = 'none'
        clearUserInputs()
        cancelButtonClickEvent.preventDefault();
    }
    
    add_new_user_confirm_button.onclick = (confirmButtonClickEvent) => {
        const firstname = document.getElementById('new_user_firstname').value
        const lastname = document.getElementById('new_user_lastname').value
        const email = document.getElementById('new_user_email').value
        const jiraapikey = document.getElementById('new_user_jiraapikey').value
        const jirauserid = document.getElementById('new_user_jirauserid').value
        const groups = document.getElementById('new_user_groups').value
        const userrole = document.getElementById('new_user_role').value
        confirmButtonClickEvent.preventDefault();
        
        Users.add(firstname, lastname, email, jiraapikey, jirauserid, groups, userrole)

        custom_class_all_user_information_element.style.display = 'block'
        custom_class_new_user_information_element.style.display = 'none'
    }

    user_search.addEventListener('input', (eventSearch)=>{
        Users.load(eventSearch.target.value)
    })

    application_manger_save_changes_button.onclick = () => {
        const jira_web_url = document.getElementById('jira_web_url').value
        const jira_api_url = document.getElementById('jira_api_url').value
        const jira_api_key = document.getElementById('jira_api_key').value
        const jira_projects = document.getElementById('jira_projects').value

        Settings.update(jira_web_url, jira_api_url, jira_api_key, jira_projects)
    }

    task_filter_date.addEventListener('change', () => {
        console.log(Date().toString().split('T')[0])
        if(task_filter_date.value == "" || task_filter_date.value == new Date().toISOString().split('T')[0])
            Tasks.get()
        else{
            Tasks.getByDate(task_filter_date.value)
        }
    })
}
