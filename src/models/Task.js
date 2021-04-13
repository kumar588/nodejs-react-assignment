module.exports = class Task{


    constructor(id, title, status, tasks, duedate){
        this.id = id;
        this.title = title;
        this.status = status;
        this.tasks = tasks;
        this.duedate = duedate;
    }

}