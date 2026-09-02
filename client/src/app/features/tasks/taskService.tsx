import axiosService from "../../../lib/axiosService";
import type { Task } from "./taskTypes";

const addTask = async (data : Task)=>{
    const respone = await axiosService.post(`/api/task` , data);
    return respone.data
}

const changeStatus = async (id : string)=>{
    const respone = await axiosService.put(`/api/task/status/${id}`);
    return respone.data
}

const getTasks = async ()=>{
    const respone = await axiosService.get(`/api/task`);
    return respone.data
}

export default { addTask , getTasks , changeStatus}