import { Users } from './users.js'
import { Tasks } from './tasks.js'
import { getAPIRequest } from './api.js'

// Loading retured tasks to the Web UI
export function renderFilteredTasks(){
    let filteredStatus = document.getElementById('task-filter-status').value
    let filteredAssignee = document.getElementById('task-filter-assingee').value
    let filteredTasks = Tasks.getWithFilters(filteredStatus, filteredAssignee)
    
    loadingRenderedTasks(filteredTasks)
}