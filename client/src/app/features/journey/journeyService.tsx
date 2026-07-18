import axiosService from "../../../lib/axiosService";
import type { Journey } from "./journeyTypes";

const getJourney = async ()=>{
    const respone = await axiosService.get(`/api/journey`);
    return respone.data
}


const addJourney = async (data : Journey)=>{
    const respone = await axiosService.post(`/api/journey` , data);
    return respone.data
}


const deleteJourney = async (id : string)=>{
    const respone = await axiosService.delete(`/api/journey/${id}`);
    return respone.data
}


const editJourney = async (data : Journey , _id : string) => {
    const respone = await axiosService.put(`/api/journey/${_id}` , data)
    return respone.data
}
const journeyService = { getJourney  , addJourney , deleteJourney , editJourney}

export default journeyService