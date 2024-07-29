// Purpose - To reset user input to
export function clearUserInputs(){
    document.getElementById('new-task').value = '';
    document.getElementById('new-task-add-assignee').value = 'select-assignee';
    document.getElementById('new-task-add-status').value = 'New-Task';
}
