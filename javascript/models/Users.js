let users = [
    {  
        userid: 1,
        username: "robbstark",
        firstname: "Robb",
        lastname: "Stark",
        email: "rb@winterfell.co.uk",
        apikey: "northremembers"
    }
]

class User {
    constructor(userid, username, firstname, lastname, email, apikey){
        this.userid = userid
        this.username = username
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.apikey = apikey
    }

    getAllUsers(){
        return users
    }
}


