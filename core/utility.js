// Purpose - To reset user input to
export function clearUserInputs(){
    document.getElementById('new-task').value = '';
    document.getElementById('task-add-assignee').value = 'default';
    document.getElementById('task-add-status').value = 'default';
    document.getElementById('task-add-project').value = 'default';

    sessionStorage.removeItem('statusFilterData');
    sessionStorage.removeItem('userFilterData');

    document.getElementById('addnewuserform').reset();

    document.getElementById('user-search').value = '';
    document.getElementById('error_message_task_add').style.display = 'none';

    document.getElementById('task_filter_date').value = ""
}
