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
    constructor (userid, username){
        this.userid = userid
        this.username = username
    }

    static add(){

    }

    static get(){
        return users
    }

    static getBySearch(searchvalue){
        const pattern = new RegExp(searchvalue.toLocaleLowerCase())

        return users.filter(user => pattern.test(user.firstname.toLocaleLowerCase()) || pattern.test(user.lastname.toLocaleLowerCase()) || pattern.test(user.username.toLocaleLowerCase()) || pattern.test(user.email.toLocaleLowerCase()))
    }

    static getUserByID(){
        
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