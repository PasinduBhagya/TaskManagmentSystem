let tasks = [
    {   
        id: 1,
        task: "Task 1",
        assignee: "user1",
        status: "Completed"
    },
    {   
        id: 2,
        task: "Task 2",
        assignee: "user1",
        status: "On-Hold"
    },
    {   
        id: 3,
        task: "Task 3",
        assignee: "user3",
        status: "Completed"
    },
    {   
        id: 4,
        task: "Task 4",
        assignee: "user2",
        status: "On-Hold"
    },
    {   
        id: 5,
        task: "Task 5",
        assignee: "user1",
        status: "Completed"
    },
    {   
        id: 6,
        task: "Task 6",
        assignee: "user1",
        status: "Pending"
    },
    {   
        id: 7,
        task: "Task 7",
        assignee: "user2",
        status: "Pending"
    },
    {   
        id: 8,
        task: "Task 8",
        assignee: "user3",
        status: "Completed"
    },
    {   
        id: 9,
        task: "Task 7",
        assignee: "user2",
        status: "Pending"
    },
    {   
        id: 10,
        task: "Task 8",
        assignee: "user3",
        status: "Completed"
    },
    {   
        id: 11,
        task: "Task 1",
        assignee: "user1",
        status: "Completed"
    },
    {   
        id: 12,
        task: "Task 2",
        assignee: "user1",
        status: "On-Hold"
    },
    {   
        id: 13,
        task: "Task 3",
        assignee: "user3",
        status: "Completed"
    },
    {   
        id: 14,
        task: "Task 4",
        assignee: "user2",
        status: "On-Hold"
    },
    {   
        id: 15,
        task: "Task 5",
        assignee: "user1",
        status: "Completed"
    },
    {   
        id: 16,
        task: "Task 6",
        assignee: "user1",
        status: "Pending"
    },
    {   
        id: 17,
        task: "Task 7",
        assignee: "user2",
        status: "Pending"
    },
    {   
        id: 18,
        task: "Task 8",
        assignee: "user3",
        status: "Completed"
    },
    {   
        id: 19,
        task: "Task 7",
        assignee: "user2",
        status: "Pending"
    },
    {   
        id: 20,
        task: "Task 8",
        assignee: "user3",
        status: "Completed"
    },
    {   
        id: 21,
        task: "Task 1",
        assignee: "user1",
        status: "Completed"
    },
    {   
        id: 22,
        task: "Task 2",
        assignee: "user1",
        status: "On-Hold"
    },
    {   
        id: 23,
        task: "Task 3",
        assignee: "user3",
        status: "Completed"
    },
    {   
        id: 24,
        task: "Task 4",
        assignee: "user2",
        status: "On-Hold"
    },
    {   
        id: 25,
        task: "Task 5",
        assignee: "user1",
        status: "Completed"
    },
    {   
        id: 26,
        task: "Task 6",
        assignee: "user1",
        status: "Pending"
    },
    {   
        id: 27,
        task: "Task 7",
        assignee: "user2",
        status: "Pending"
    },
    {   
        id: 28,
        task: "Task 8",
        assignee: "user3",
        status: "Completed"
    },
    {   
        id: 29,
        task: "Task 7",
        assignee: "user2",
        status: "Pending"
    },
    {   
        id: 30,
        task: "Task 8",
        assignee: "user3",
        status: "Completed"
    },
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
        console.log(oldTaskObject)
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