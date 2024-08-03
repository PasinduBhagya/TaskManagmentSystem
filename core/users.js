import { apiPost, apiGet, apiUpdate, apiDelete } from './api.js'

export class Users {
    constructor(userid, firstname, lastname, username, email) {
        this.userid = userid
        this.firstname = firstname
        this.lastname = lastname
        this.username = username
        this.email = email
    }

    static add(firstname, lastname, email, jiraapikey, jirauserid, groups, userrole) {
        const apirequestbody = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: "abc123",
            assignedrole: userrole,
            addedgroups: groups,
            apikey: jiraapikey,
            jirauserid: jirauserid
        }
        apiPost("/api/users", apirequestbody)
        Users.get()
    }

    static load(searchuser){
        const users = JSON.parse(sessionStorage.getItem('usersData'));
        const pattern = new RegExp(searchuser.toLocaleLowerCase())
        const filteredUsers = users.filter(user => pattern.test(user.firstname.toLocaleLowerCase()) || pattern.test(user.lastname.toLocaleLowerCase()) ||  pattern.test(user.email.toLocaleLowerCase()))
        loadingRenderedUsers(filteredUsers)
    }

    static get() {
        apiGet("/api/users").then(renderedusers => {
            sessionStorage.setItem('usersData', JSON.stringify(renderedusers));
            const users = JSON.parse(sessionStorage.getItem('usersData'));
            loadingRenderedUsers(users)
        })
    }

    static update(userid, firstname, lastname, email, apikey, jirauserid, addedgroups, assignedrole) {

        const apirequestbody = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: "abc123",
            assignedrole: assignedrole,
            addedgroups: addedgroups,
            apikey: apikey,
            jirauserid: jirauserid
        }

        apiUpdate("/api/users/" + userid, apirequestbody)
    }

    static remove(userid) {
        apiDelete("/api/users/" + userid)
        Users.get()
    }
}

export function loadingRenderedUsers(users) {
    let usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = '';

    users.forEach(user => {
        let row = document.createElement('tr');
        row.className = "users-table-tdata-tr"
        row.innerHTML = `
            <td class="users-td-col1">${user.id}</td>
            <td class="users-td-col2">${user.firstname}</td>
            <td class="users-td-col3">${user.lastname}</td>
            <td class="users-td-col5">${user.email}</td>
            <td class="users-td-col6 col-user-actions">
                <button class="user-edit-button btn btn-primary btn-sm" data-id="${user.id}"><i class="icon-pencil"></i></button>
                <button class="user-delete-button btn btn-danger btn-sm" data-id="${user.id}"><i class="icon-trash"></i></button>
            </td>
        `;
        usersTableBody.appendChild(row);
    });

    document.querySelectorAll('.user-delete-button').forEach(button => {
        button.addEventListener('click', (eventuserDelete) => {
            const userid = eventuserDelete.target.getAttribute('data-id');
            Users.remove(userid)
        });
    });

    document.querySelectorAll('.user-edit-button').forEach(button => {
        button.addEventListener('click', (eventuserEdit) => {
            const userid = Number(eventuserEdit.target.getAttribute('data-id'));
            async function getUserData(userid) {
                try {
                    const usertoupdate = await apiGet('/api/users/' + userid);
                    console.log(usertoupdate.addedgroups);

                    document.getElementById('new_user_firstname').value = usertoupdate.firstname;
                    document.getElementById('new_user_lastname').value = usertoupdate.lastname;
                    document.getElementById('new_user_email').value = usertoupdate.email;
                    document.getElementById('new_user_jiraapikey').value = usertoupdate.apikey;
                    document.getElementById('new_user_jirauserid').value = usertoupdate.jirauserid;
                    document.getElementById('new_user_groups').value = usertoupdate.addedgroups;
                    document.getElementById('new_user_role').value = usertoupdate.assignedrole;

                    document.getElementById('custom-class-all-user-information-element').style.display = 'none';
                    document.getElementById('custom_class_new_user_information_element').style.display = 'block';

                    document.getElementById('add_new_user_confirm_area').style.display = 'none';
                    document.getElementById('user_update_button_area').style.display = 'block';

                    const userUpdateButton = document.getElementById('user_update_button');

                    const newUserUpdateButton = userUpdateButton.cloneNode(true);
                    userUpdateButton.parentNode.replaceChild(newUserUpdateButton, userUpdateButton);

                    newUserUpdateButton.addEventListener('click', async (updateButtonEvent) => {
                        updateButtonEvent.preventDefault();

                        try {
                            Users.update(
                                userid,
                                document.getElementById('new_user_firstname').value,
                                document.getElementById('new_user_lastname').value,
                                document.getElementById('new_user_email').value,
                                document.getElementById('new_user_jiraapikey').value,
                                document.getElementById('new_user_jirauserid').value,
                                document.getElementById('new_user_groups').value,
                                document.getElementById('new_user_role').value
                            );

                            document.getElementById('custom-class-all-user-information-element').style.display = 'block';
                            document.getElementById('custom_class_new_user_information_element').style.display = 'none';
                        } catch (error) {
                            console.error('Failed to update user:', error);
                        }
                    });
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            }
            getUserData(userid);
        });
    });
}

export function loadingUserSelection(renderedusers) {
    let useElements = ['task-add-assignee', 'task-filter-assingee']

    useElements.forEach(userElement => {
        if (!userElement) {
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