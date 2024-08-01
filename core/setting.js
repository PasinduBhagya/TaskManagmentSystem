import { getAPIRequest } from './api.js'

export class Settings{
    constructor(id, settingsname, settingsvalue){
        this.id = id
        this.settingsname = settingsname
        this.settingsvalue = settingsvalue
    }
    static async get(){
        getAPIRequest("/api/settings").then(renderedSettings => {
            this.load(renderedSettings)
            sessionStorage.setItem('statusData', JSON.stringify(renderedSettings));
            return renderedSettings
        })
    }
    static async load(renderedSettings){
        
        let statusElements = ['task-add-status', 'task-filter-status']
        
        statusElements.forEach(statusElement => {
            let statusvalues = renderedSettings[0].parameters.split(',')
            
            let element = document.getElementById(statusElement)
    
            statusvalues.forEach(statusoption => {
                let statuselement = document.createElement('option');
    
                statuselement.value = statusoption;
                statuselement.textContent = statusoption;
        
                element.appendChild(statuselement)
            })
        })
    }
}
