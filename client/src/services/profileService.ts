import axiosService from "../lib/axiosService";

export const saveProfile = async (data : FormData)=>{
    try {
        const respone = await axiosService.put(`/api/profile` , data , {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return respone.data
    }
    catch (err){
        console.log(err)
    }
}


export const getProfile = async ()=>{
    try {
        const respone = await axiosService.get('api/profile');
        return respone.data
    }
    catch (err){
        console.log(err)
    }
}