import axiosService from "../lib/axiosService";

export const getFreelanceProjectById = async (id : any)=>{
    try {
        const respone = await axiosService.get(`/api/freelancing/project/${id}`);
        return respone.data
    }
    catch (err){
        console.log(err)
    }
}