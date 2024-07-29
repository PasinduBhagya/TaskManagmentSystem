let status = [
    {
        statusid: 1,
        statusValue: "Completed"
    },
    {
        statusid: 2,
        statusValue: "Pending"
    },
    {
        statusid: 3,
        statusValue: "On-Hold"
    }
]

export class StatusValues {
    constructor(statusid, statusValue){
        this.statusid = statusid
        this.statusValue = statusValue

    }
    static get(){
        return status
    }
}