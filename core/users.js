import { getAPIRequest } from './api.js'

let users = [
    {  
        userid: 1,
        firstname: "Pasindu",
        lastname: "Bhagya",
        username: "pasindub",
        email: "pasindub@example.com"
    },
    {  
        userid: 2,
        firstname: "Alice",
        lastname: "Johnson",
        username: "aliceJ",
        email: "alice.johnson@example.com"
    },
    {  
        userid: 3,
        firstname: "Bob",
        lastname: "Smith",
        username: "bobS",
        email: "bob.smith@example.com"
    },
    {  
        userid: 4,
        firstname: "Charlie",
        lastname: "Brown",
        username: "charlieB",
        email: "charlie.brown@example.com"
    },
    {  
        userid: 5,
        firstname: "Dana",
        lastname: "White",
        username: "danaW",
        email: "dana.white@example.com"
    },
    {  
        userid: 6,
        firstname: "Eve",
        lastname: "Taylor",
        username: "eveT",
        email: "eve.taylor@example.com"
    },
    {  
        userid: 7,
        firstname: "Frank",
        lastname: "Moore",
        username: "frankM",
        email: "frank.moore@example.com"
    },
    {  
        userid: 8,
        firstname: "Grace",
        lastname: "Lee",
        username: "graceL",
        email: "grace.lee@example.com"
    },
    {  
        userid: 9,
        firstname: "Henry",
        lastname: "Miller",
        username: "henryM",
        email: "henry.miller@example.com"
    },
    {  
        userid: 10,
        firstname: "Ivy",
        lastname: "Clark",
        username: "ivyC",
        email: "ivy.clark@example.com"
    },
    {  
        userid: 11,
        firstname: "Jack",
        lastname: "Adams",
        username: "jackA",
        email: "jack.adams@example.com"
    },
    {  
        userid: 12,
        firstname: "Karen",
        lastname: "Nelson",
        username: "karenN",
        email: "karen.nelson@example.com"
    },
    {  
        userid: 13,
        firstname: "Leo",
        lastname: "Hill",
        username: "leoH",
        email: "leo.hill@example.com"
    },
    {  
        userid: 14,
        firstname: "Mia",
        lastname: "Scott",
        username: "miaS",
        email: "mia.scott@example.com"
    },
    {  
        userid: 15,
        firstname: "Nina",
        lastname: "King",
        username: "ninaK",
        email: "nina.king@example.com"
    },
    {  
        userid: 16,
        firstname: "Owen",
        lastname: "Wright",
        username: "owenW",
        email: "owen.wright@example.com"
    },
    {  
        userid: 17,
        firstname: "Paula",
        lastname: "Martinez",
        username: "paulaM",
        email: "paula.martinez@example.com"
    },
    {  
        userid: 18,
        firstname: "Quinn",
        lastname: "Lopez",
        username: "quinnL",
        email: "quinn.lopez@example.com"
    },
    {  
        userid: 19,
        firstname: "Ruth",
        lastname: "Garcia",
        username: "ruthG",
        email: "ruth.garcia@example.com"
    },
    {  
        userid: 20,
        firstname: "Sam",
        lastname: "Rodriguez",
        username: "samR",
        email: "sam.rodriguez@example.com"
    }
];

export class Users {
    constructor (userid, firstname, lastname, username, email){
        this.userid = userid
        this.firstname = firstname
        this.lastname = lastname
        this.username = username
        this.email = email
    }

    static add(new_user_first_name, new_user_last_name, new_user_username, new_user_email, new_user_jira_apikey){
        
        const newUserID = users[users.length - 1].userid + 1 

        const newUserObject = {
            userid: newUserID,
            firstname: new_user_first_name,
            lastname: new_user_last_name,
            username: new_user_username,
            email: new_user_email,
            new_user_jira_apikey: new_user_jira_apikey
        }

        users.push(newUserObject) 
    }

    static async get(){
        getAPIRequest("/api/users").then(renderedusers => {
            
            // Store User info to session
            loadingRenderedUsers(renderedusers)
            return renderedusers
        })

    }

    static async load(){
        getAPIRequest("/api/users").then(renderedusers => {
            sessionStorage.setItem('usersData', JSON.stringify(renderedusers));
            loadingUserSelection(renderedusers)
            return renderedusers
        })
    }

    static getBySearch(searchvalue){
        const pattern = new RegExp(searchvalue.toLocaleLowerCase())

        return users.filter(user => pattern.test(user.firstname.toLocaleLowerCase()) || pattern.test(user.lastname.toLocaleLowerCase()) || pattern.test(user.username.toLocaleLowerCase()) || pattern.test(user.email.toLocaleLowerCase()))
    }

    static getUserByID(updateuserid){
        const userToUpdate = users.find(user => user.userid === updateuserid);
        return userToUpdate   
    }

    static update(userUpdatedObject, userOldObject){
        users[users.indexOf(userOldObject)] = userUpdatedObject
    }

    static remove(userid) {
        let userFound = false;
        users.forEach((user, index) => {
            if (!userFound && user.userid === userid) {
                users.splice(index, 1);
                userFound = true;
            }
        });
        if (!userFound) {
            console.log("No Match Found");
        }
    }
}

export function loadingRenderedUsers(users){
    
    let usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = '';

    users.forEach(user => {
        let row = document.createElement('tr');
        row.className = "users-table-tdata-tr"  
        
        row.innerHTML = `
            <td class="users-td-col1">${user.id}</td>
            <td class="users-td-col2">${user.firstname}</td>
            <td class="users-td-col3">${user.lastname}</td>
            <td class="users-td-col4">${user.username}</td>
            <td class="users-td-col5">${user.email}</td>
            <td class="users-td-col6">
                <button class="user-edit-button btn btn-primary" data-id="${user.userid}">Edit</button>
                <button class="user-delete-button btn btn-danger" data-id="${user.userid}">Delete</button>
            </td>
        `;
        usersTableBody.appendChild(row);
    });

    document.querySelectorAll('.user-delete-button').forEach(button => {
        button.addEventListener('click', (eventuserDelete) => {
            const userid = Number(eventuserDelete.target.getAttribute('data-id'));
            Users.remove(userid)
            const renderedusers = Users.getBySearch(document.getElementById('main-content-settings-user-management-user-search').value)
            loadingRenderedUsers(renderedusers)     
        });
    });

    document.querySelectorAll('.user-edit-button').forEach(button => {
        button.addEventListener('click', (eventuserEdit) => {
            const userid = Number(eventuserEdit.target.getAttribute('data-id'));
            
            const userToUpdate = Users.getUserByID(userid)
            

            const pop_blur_background = document.getElementsByClassName('blur-background')[0];

            const user_add_popup = document.getElementById('new-user-add-popup');
            
            document.getElementById('user-first-name').value = userToUpdate.firstname
            document.getElementById('user-last-name').value = userToUpdate.lastname
            document.getElementById('user-username').value = userToUpdate.username
            document.getElementById('user-email').value = userToUpdate.email
            

            user_add_popup.style.display = 'block'
            pop_blur_background.style.zIndex = 100;

            document.getElementById('new-user-add-button').onclick = () =>{
                const userUpdatedObject = {
                    userid: userid,
                    firstname: document.getElementById('new-user-first-name').value, 
                    lastname: document.getElementById('new-user-last-name').value, 
                    username: document.getElementById('new-user-username').value,
                    email: document.getElementById('new-user-email').value,
                }

                Users.update(userUpdatedObject, userToUpdate)

                user_add_popup.style.display = 'none'
                pop_blur_background.style.zIndex = -1;

                const renderedusers = Users.getBySearch(document.getElementById('main-content-settings-user-management-user-search').value)
                loadingRenderedUsers(renderedusers)    
            }
        });
    });
}

export async function loadingUserSelection(renderedusers){
    // let useElements = ['task-add-assignee', 'update-task-assignee', 'task-filter-assingee']
    let useElements = ['task-add-assignee', 'task-filter-assingee']

    useElements.forEach(userElement =>{
        if(!userElement){
            console.log(userElement + " is not")
        }

        let usersList = document.getElementById(userElement);
        renderedusers.forEach(user => {
            let userListOption = document.createElement('option');
            userListOption.value = user.id;
            userListOption.textContent = `${user.firstname} ${user.lastname}`;
    
            usersList.appendChild(userListOption)
        }) 
    })
}