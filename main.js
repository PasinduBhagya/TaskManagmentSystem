import { loadUsersSelectors, loadStatusSelectors } from './javascript/common/LoadOptions.js';
import { Task } from './javascript/models/Tasks.js'

document.addEventListener('DOMContentLoaded', function(){

     
    Task.getAllTasks()

    document.getElementById('addTask').addEventListener('click', () => {
        Task.addNewTask()  
    })

    document.getElementById('filterStatus').addEventListener('change', (event1) => {
        let selectedAssigneeValue = document.getElementById('filterAssignee').value
        console.log("Status changed to - " + event1.target.value)
        Task.getTaskByFilters(event1.target.value, selectedAssigneeValue)
    })

    document.getElementById('filterAssignee').addEventListener('change', (event2) => {
        let selectedStatusValue = document.getElementById('filterStatus').value
        console.log("Assignee changed to - " + event2.target.value)
        Task.getTaskByFilters(selectedStatusValue, event2.target.value)
    })

    // Initial Loadings
    loadUsersSelectors()   
    loadStatusSelectors()
})

fetch('https://reqres.in/api/users').then(res => console.log(res))