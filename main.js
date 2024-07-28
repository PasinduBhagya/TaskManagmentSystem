document.addEventListener('DOMContentLoaded', () =>{
    fetch('templates/tasks/tasks.html')
    .then(response => response.text())
    .then(content =>{
        document.getElementById('main-window').innerHTML = content;
        var script = document.createElement('script');
        script.src = 'templates/tasks/Tasks.js';
        script.type = 'module';
        document.body.appendChild(script);

        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'templates/tasks/tasks.css';
        document.head.appendChild(link);

    })
    .catch(error => {
        console.error("Error loading the task.html file", error)
    })
})
