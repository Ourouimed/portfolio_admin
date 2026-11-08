import axiosService from "../../../lib/axiosService";
import type { FreelanceProject } from "./freelancingTypes";

const addFreelanceProject = async (data : FreelanceProject)=>{
    const respone = await axiosService.post(`/api/freelancing` , data);
    return respone.data
}

const getFreelanceProjects = async ()=>{
    const respone = await axiosService.get(`/api/freelancing`);
    return respone.data
}


const deleteFreelanceProject = async (id : string)=>{
    const respone = await axiosService.delete(`/api/freelancing/project/${id}`);
    return respone.data
}

const editFreelanceProject = async (data : FreelanceProject , _id : string) => {
    const respone = await axiosService.put(`/api/freelancing/project/${_id}` , data)
    return respone.data
}



const freelancingService = { addFreelanceProject , getFreelanceProjects , deleteFreelanceProject , editFreelanceProject}
export default freelancingService