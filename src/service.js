const client = require("./client");

function createMainTask(taskData){
   let response = client.createMainTask(taskData);
   return response;
}

// const axios = require('axios').default;
// // const config = require('config');

// async function createMainTask(userId, requestBody){
  
//     let response = await axios.post(`https://z8sp8dl9if.execute-api.eu-west-2.amazonaws.com/dev/${userId}/tasks`, requestBody);
//     return response;
// }
function addSubTask(taskId, taskData){
    let response = client.addSubTask(taskId, taskData);
    return response;
 }

 function getAllTasks(){
    let response = client.getAllTasks();
    return response;
 }

 function getTask(taskId){

     try{
        let response = client.getTask(taskId);
        return response;
     }catch(error) {
        console.log('in service catch')
        return error};
    
    return response;
 }

 function modifyTask(taskId, taskData){
    let response = client.modifyTask(taskId, taskData);
    return response;
 }

 function deleteTask(tastId){
    let response = client.deleteTask(tastId);
    return response;
 }

module.exports = {createMainTask, getAllTasks, getTask, modifyTask, deleteTask, addSubTask};