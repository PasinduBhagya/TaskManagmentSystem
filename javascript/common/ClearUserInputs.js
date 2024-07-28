export function clearUserInputs(){

    document.getElementById('taskname').value = '';
    document.getElementById('usersList').value = 'select-assignee';
    document.getElementById('assingeeStatus').value = 'New-Task';
    document.getElementById('filterStatus').value = 'default';
    document.getElementById('filterAssignee').value = 'default';
    document.getElementById('addTask').textContent = 'Add'
}