const axios = require('axios').default;

const userId = '10089';
const url = `https://z8sp8dl9if.execute-api.eu-west-2.amazonaws.com/dev/${userId}`;

const properties = {
    timeout: 30
}

async function createMainTask(requestBody){
  
    let response = await axios.post(`${url}/tasks`, requestBody);
    return response;
}

async function getAllTasks(){
  
    let response = await axios.get(`${url}/tasks`);
    return response;
}


async function getTask(taskId){
  
    let response = await axios.get(`${url}/tasks/${taskId}`)
    return response;
}

async function modifyTask(taskId, taskData){
  
    let response = await axios.put(`${url}/tasks/${taskId}`, taskData);
    return response;
}

async function deleteTask(taskId){
  
    let response = await axios.delete(`${url}/tasks/${taskId}`);
    return response;
}

async function addSubTask(taskId, taskData){
  
    let response = await axios.post(`${url}/tasks/${taskId}`, taskData);
    return response;
}



module.exports = {getAllTasks, getTask, createMainTask, addSubTask, modifyTask, deleteTask};