import { Tasks } from './tasks.js'
import { readElements } from './readelements.js'
import { Settings, editableTable } from './setting.js'
import { Users } from './users.js'
import { clearUserInputs } from './utility.js'

// Loading buttons
readElements()

window.addEventListener('DOMContentLoaded', () =>{

    // Redering for the first time  
    Tasks.get()
    Settings.get()
    Users.load()

    editableTable()
    
    clearUserInputs()

})