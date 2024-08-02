// Purpose - To reset user input to
export function clearUserInputs(){
    document.getElementById('new-task').value = '';
    document.getElementById('task-add-assignee').value = 'default';
    document.getElementById('task-add-status').value = 'default';

    sessionStorage.removeItem('statusFilterData');
    sessionStorage.removeItem('userFilterData');

    document.getElementById('addnewuserform').reset();
}
