import { Tasks } from './tasks.js'
import { readElements } from './readelements.js'
import { Settings, editableTable } from './settings.js'
import { Users, loadingUserSelection } from './users.js'
import { clearUserInputs } from './utility.js'

// Loading buttons

window.addEventListener("DOMContentLoaded", () =>{
    // Redering for the first time  
    Tasks.get()
    Settings.get()
    Users.get()
    editableTable()
    
    clearUserInputs()
    
    const users = JSON.parse(sessionStorage.getItem('usersData'));
    // if (users === null){
    //     location.reload()
    // }
    loadingUserSelection(users)
})

readElements()