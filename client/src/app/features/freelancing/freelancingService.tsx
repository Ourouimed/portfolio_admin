import axiosService from "../../../lib/axiosService";
import type { FreelanceProject } from "./freelancingTypes";

const addFreelanceProject = async (data : FreelanceProject)=>{
    const respone = await axiosService.post(`/api/freelancing` , data);
    return respone.data
}

const freelancingService = { addFreelanceProject }
export default freelancingService