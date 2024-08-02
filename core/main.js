import { Tasks } from './tasks.js'
import { readElements } from './readelements.js'
import { Settings, editableTable } from './setting.js'
import { Users, loadingUserSelection } from './users.js'
import { clearUserInputs } from './utility.js'

// Loading buttons
readElements()

window.addEventListener('load', () =>{
    // Redering for the first time  
    Tasks.get()
    Settings.get()
    Users.get()
    editableTable()
    
    clearUserInputs()

    const users = JSON.parse(sessionStorage.getItem('usersData'));
    loadingUserSelection(users)
})