import axios from 'axios';
const url ='http://localhost:8888'
  export function search_task_api(search_str=""){
    let body_obj = {search:""};
    body_obj["search"]=search_str;
    return new Promise(
      (resolve,reject)=>{
        axios.post(url+"/task",body_obj)
        .then(response => {
          // Handle a successful response
          console.log('Response:', response.data);
          resolve(response.data)
        })
        .catch(error => {
          // Handle errors
          console.error('Error:', error);
          reject(error)
        });
      })
  }
  export function apiCallAddTask(title_str=""){
    let body_obj = {title:""};
    body_obj["title"]=title_str;
    return new Promise(
      (resolve,reject)=>{
        axios.post(url+"/addTask",body_obj)
        .then(response => {
          // Handle a successful response
          console.log('Response:', response.data);
          resolve(response.data)
        })
        .catch(error => {
          // Handle errors
          console.error('Error:', error);
          reject(error)
        });
      })
  }
  export function stepUpDown(id,new_step){
    let body_obj ={};
    body_obj["id"]=parseInt(id);
    body_obj["updatedStep"]=new_step;
    console.log("-------body_obj----"+JSON.stringify(body_obj))
    return new Promise(
      (resolve,reject)=>{
        axios.put(url+"/updateTask",body_obj)
        .then(response => {
          console.log('Response:', response.data);
          resolve(response.data)
        })
        .catch(error => {
          console.error('Error:', error);
          reject(error)
        });
      })
  }
  export function deleteTaskApi(id){
    let body_obj ={};
    body_obj["id"]=parseInt(id);
    return new Promise(
      (resolve,reject)=>{
        axios.patch(url+"/deleteTask",body_obj)
        .then(response => {
          console.log('Response:', response.data);
          resolve(response.data)
        })
        .catch(error => {
          console.error('Error:', error);
          reject(error)
        });
      })
  }