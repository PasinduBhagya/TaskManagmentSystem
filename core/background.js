// Purpose - To reset user input to
export function clearUserInputs(){
    document.getElementById('new-task').value = '';
    document.getElementById('new-task-add-assignee').value = 'select-assignee';
    document.getElementById('new-task-add-status').value = 'New-Task';

    document.getElementById('main-content-settings-user-management-user-search').value = '';


    document.getElementById('new-user-first-name').value = '';
    document.getElementById('new-user-last-name').value = '';
    document.getElementById('new-user-username').value = '';
    document.getElementById('new-user-email').value = '';
    document.getElementById('new-user-jira-apikey').value = '';
}
