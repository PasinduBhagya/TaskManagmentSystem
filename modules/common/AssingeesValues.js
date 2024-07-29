let users = [
    {  
        userid: 1,
        username: "user1"
    },
    {  
        userid: 2,
        username: "user2"
    },
    {  
        userid: 3,
        username: "user3"
    },
    {  
        userid: 4,
        username: "user4"
    },
    {  
        userid: 5,
        username: "user5"
    }
]

export class Users {
    constructor (userid, username){
        this.userid = userid
        this.username = username
    }

    static get(){
        return users
    }
}