let users = [
    {  
        userid: 1,
        username: "robbstark",
        firstname: "Robb",
        lastname: "Stark",
        email: "rb@winterfell.co.uk",
        apikey: "northremembers"
    },
    {  
        userid: 1,
        username: "sansastark",
        firstname: "Sansa",
        lastname: "Stark",
        email: "ss@winterfell.co.uk",
        apikey: "northremembers"
    },
    {  
        userid: 1,
        username: "jonsnow",
        firstname: "Jon",
        lastname: "Snow",
        email: "js@castleblack.co.uk",
        apikey: "idonnotwantit"
    },
    {  
        userid: 1,
        username: "cersilanister",
        firstname: "Cersi",
        lastname: "Lanister",
        email: "cl@kingslanding.co.uk",
        apikey: "ichoseviollence"
    }
]

class User {
    constructor(userid, username, firstname, lastname, email, apikey, groups){
        this.userid = userid
        this.username = username
        this.firstname = firstname
        this.lastname = lastname
        this.email = email
        this.apikey = apikey
        this.groups = groups
    }

    static getAllUsers(){
        return users
    }
}

console.log(User.getAllUsers())