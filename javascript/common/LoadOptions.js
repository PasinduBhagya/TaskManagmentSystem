let users = [
    {  
        user_ID: 1,
        username: "user1"
    },
    {  
        user_ID: 2,
        username: "user2"
    },
    {  
        user_ID: 3,
        username: "user3"
    },
    {  
        user_ID: 4,
        username: "user4"
    },
    {  
        user_ID: 5,
        username: "user5"
    }
]

let statusValues = [
    {
        status_ID: 1,
        statusValue: "Completed"
    },
    {
        status_ID: 2,
        statusValue: "Pending"
    },
    {
        status_ID: 3,
        statusValue: "On-Hold"
    }
]


export function loadUsersSelectors(){
    let useElements = ['usersList', 'filterAssignee', 'usersUpdateList']
    useElements.forEach(userElement =>{
        let usersList = document.getElementById(userElement);
        users.forEach(user => {
            let userListOption = document.createElement('option');
            userListOption.value = user.username;
            userListOption.textContent = user.username;
    
            usersList.appendChild(userListOption)
        }) 
    })
}

export function loadStatusSelectors(){
    
    let statusElements = ['assingeeStatus', 'filterStatus', 'statusUpdateList']

    statusElements.forEach(statusElement => {

        let statusList = document.getElementById(statusElement)

        statusValues.forEach(singleStatus => {
            let statusListOption = document.createElement('option');

            statusListOption.value = singleStatus.statusValue;
            statusListOption.textContent = singleStatus.statusValue;
    
            statusList.appendChild(statusListOption)
        })
    }) 
}