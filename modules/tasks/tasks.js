let tasks = [
    {   
        id: 1,
        task: "Complete the design and layout of the homepage, including responsiveness and cross-browser compatibility",
        assignee: "pasindub",
        status: "Completed"
    },
    {   
        id: 2,
        task: "Develop the API endpoints for user authentication and authorization, and ensure thorough testing",
        assignee: "pasindub",
        status: "On-Hold"
    },
    {   
        id: 3,
        task: "Resolve the critical bug #101 affecting user login functionality and verify the fix with extensive testing",
        assignee: "bobS",
        status: "Completed"
    },
    {   
        id: 4,
        task: "Implement a robust authentication system including multi-factor authentication for enhanced security",
        assignee: "aliceJ",
        status: "On-Hold"
    },
    {   
        id: 5,
        task: "Write comprehensive unit tests for the newly developed features and ensure code coverage is above 90%",
        assignee: "pasindub",
        status: "Completed"
    },
    {   
        id: 6,
        task: "Set up a continuous integration and deployment (CI/CD) pipeline to automate build and deployment processes",
        assignee: "eveT",
        status: "Pending"
    },
    {   
        id: 7,
        task: "Review and approve pull requests from team members, ensuring code quality and adherence to coding standards",
        assignee: "aliceJ",
        status: "Pending"
    },
    {   
        id: 8,
        task: "Deploy the application to the production environment and monitor for any immediate issues or anomalies",
        assignee: "bobS",
        status: "Completed"
    },
    {   
        id: 9,
        task: "Create detailed documentation for API endpoints, including usage examples and error handling",
        assignee: "graceL",
        status: "Pending"
    },
    {   
        id: 10,
        task: "Update all project dependencies to their latest versions and ensure compatibility with existing codebase",
        assignee: "bobS",
        status: "Completed"
    },
    {   
        id: 11,
        task: "Fix the UI bugs reported in the latest user feedback and ensure consistency across all devices",
        assignee: "pasindub",
        status: "Completed"
    },
    {   
        id: 12,
        task: "Improve the performance of the application by optimizing key components and reducing load times",
        assignee: "frankM",
        status: "On-Hold"
    },
    {   
        id: 13,
        task: "Refactor the existing codebase to enhance readability, maintainability, and scalability",
        assignee: "bobS",
        status: "Completed"
    },
    {   
        id: 14,
        task: "Optimize database queries to improve performance and reduce the response time of the application",
        assignee: "aliceJ",
        status: "On-Hold"
    },
    {   
        id: 15,
        task: "Add user analytics to track engagement and gather insights for improving the user experience",
        assignee: "pasindub",
        status: "Completed"
    },
    {   
        id: 16,
        task: "Design API endpoints for the new feature, including detailed specifications and expected responses",
        assignee: "graceL",
        status: "Pending"
    },
    {   
        id: 17,
        task: "Test the newly implemented features to ensure they function correctly and integrate seamlessly with the existing system",
        assignee: "bobS",
        status: "Pending"
    },
    {   
        id: 18,
        task: "Set up a staging environment that mirrors the production environment for testing and QA purposes",
        assignee: "bobS",
        status: "Completed"
    },
    {   
        id: 19,
        task: "Create user guides and help documents to assist end-users in understanding and utilizing the application",
        assignee: "karenN",
        status: "Pending"
    },
    {   
        id: 20,
        task: "Monitor system performance and health metrics to identify and address any potential issues proactively",
        assignee: "graceL",
        status: "Completed"
    },
    {   
        id: 21,
        task: "Fix identified security issues in the application to ensure compliance with security standards and best practices",
        assignee: "pasindub",
        status: "Completed"
    },
    {   
        id: 22,
        task: "Update the user interface based on recent user feedback to improve usability and aesthetic appeal",
        assignee: "charlieB",
        status: "On-Hold"
    },
    {   
        id: 23,
        task: "Prepare and distribute release notes highlighting new features, bug fixes, and known issues in the latest release",
        assignee: "bobS",
        status: "Completed"
    },
    {   
        id: 24,
        task: "Integrate a payment gateway for handling transactions securely and ensuring smooth payment processing",
        assignee: "aliceJ",
        status: "On-Hold"
    },
    {   
        id: 25,
        task: "Develop the new feature X with detailed specifications and ensure it aligns with project requirements",
        assignee: "frankM",
        status: "Completed"
    },
    {   
        id: 26,
        task: "Fix deployment issues encountered during the last release and ensure a smooth deployment process",
        assignee: "graceL",
        status: "Pending"
    },
    {   
        id: 27,
        task: "Conduct a thorough code review to identify and address any potential issues before merging changes",
        assignee: "aliceJ",
        status: "Pending"
    },
    {   
        id: 28,
        task: "Optimize frontend performance to enhance loading times and responsiveness for users",
        assignee: "bobS",
        status: "Completed"
    },
    {   
        id: 29,
        task: "Enhance security measures to protect user data and prevent potential vulnerabilities",
        assignee: "bobS",
        status: "Pending"
    },
    {   
        id: 30,
        task: "Finalize and compile all project documentation, including technical specifications and user manuals",
        assignee: "graceL",
        status: "Completed"
    },
    {   
        id: 31,
        task: "Design and implement a new feature for user notifications with real-time updates",
        assignee: "bobS",
        status: "Pending"
    },
    {   
        id: 32,
        task: "Develop a comprehensive testing strategy to ensure all aspects of the application are thoroughly tested",
        assignee: "karenN",
        status: "Completed"
    },
    {   
        id: 33,
        task: "Address performance issues identified during user load testing and optimize the application accordingly",
        assignee: "frankM",
        status: "On-Hold"
    },
    {   
        id: 34,
        task: "Implement a new user feedback system to gather insights and improve application usability",
        assignee: "danaW",
        status: "Pending"
    },
    {   
        id: 35,
        task: "Develop and integrate a search functionality to improve user navigation and content discovery",
        assignee: "quinnL",
        status: "Completed"
    },
    {   
        id: 36,
        task: "Enhance the mobile app version with additional features and ensure synchronization with the web version",
        assignee: "miaS",
        status: "On-Hold"
    },
    {   
        id: 37,
        task: "Conduct a security audit to identify and mitigate potential vulnerabilities in the application",
        assignee: "ruthG",
        status: "Pending"
    },
    {   
        id: 38,
        task: "Update the application’s privacy policy and terms of service to comply with new regulations",
        assignee: "quinnL",
        status: "Completed"
    },
    {   
        id: 39,
        task: "Set up user role management features to support different access levels and permissions within the application",
        assignee: "charlieB",
        status: "Pending"
    },
    {   
        id: 40,
        task: "Refactor legacy code to improve maintainability and integrate with new features seamlessly",
        assignee: "ruthG",
        status: "On-Hold"
    }
];


export class Tasks {
    constructor(taskID, taskName, assignee, status){
        this.taskID = taskID;
        this.taskName = taskName;
        this.assignee = assignee;
        this.status = status;
    }

    static get() {
        return tasks
    }

    static add(newtaskName, newTaskAssignee, newStatus){
        let newTaskID = tasks[tasks.length - 1].id + 1 
        let newtask = {id: newTaskID, task: newtaskName, assignee: newTaskAssignee, status: newStatus }   

        tasks.push(newtask) 
    }

    static getTaskByID(taskid) {
        const taskToUpdate = tasks.find(task => task.id === taskid);
        return taskToUpdate
    }

    static getWithFilters(filteredStatus, filteredAssignee) {
        if (filteredAssignee === 'default' && filteredStatus === 'default'){
            return tasks
        }else if(filteredAssignee === 'default' && filteredStatus !== 'default'){
            return tasks.filter(task => task.status === filteredStatus)
        }else if(filteredAssignee !== 'default' && filteredStatus === 'default'){
            return tasks.filter(task => task.assignee === filteredAssignee)
        }else if(filteredAssignee !== 'default' && filteredStatus !== 'default'){
            return tasks.filter(task => task.assignee === filteredAssignee && task.status === filteredStatus)
        }
    }

    static update(updateTaskObject, oldTaskObject){
        tasks[tasks.indexOf(oldTaskObject)] = updateTaskObject
    }

    static remove(taskid) {
        let taskFound = false;
        tasks.forEach((task, index) => {
            if (!taskFound && task.id === taskid) {
                tasks.splice(index, 1);
                taskFound = true;
            }
        });
        if (!taskFound) {
            console.log("No Match Found");
        }
    }
}