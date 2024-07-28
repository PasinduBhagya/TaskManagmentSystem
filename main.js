document.addEventListener('DOMContentLoaded', () =>{
    fetch('modules/tasks/tasks.html')
    .then(response => response.text())
    .then(content =>{
        document.getElementById('main-window').innerHTML = content;
        var script = document.createElement('script');
        script.src = 'modules/tasks/Tasks.js';
        script.type = 'module';
        document.body.appendChild(script);

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'modules/tasks/tasks.css';
        document.head.appendChild(link);

    })
    .catch(error => {
        console.error("Error loading the task.html file", error)
    })
})
