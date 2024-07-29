import { Tasks } from '../modules/tasks/tasks.js'
import { buttons } from './buttons.js'
import { loadStatusValues, loadUsersValues, loadingRenderedTasks, renderFilteredTasks} from './loading.js'
import { clearUserInputs } from './background.js'

// Loading buttons
buttons()

window.addEventListener('DOMContentLoaded', () =>{
    let rederedTasks = Tasks.get()

    loadingRenderedTasks(rederedTasks)
    loadStatusValues()
    loadUsersValues()
    clearUserInputs()

    document.getElementById('task-filters').addEventListener('change', () =>{
        renderFilteredTasks()
    })
})