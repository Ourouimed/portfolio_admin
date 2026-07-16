import axiosService from "../../../lib/axiosService"

const addProject = async (data : FormData) => {
    const respone = await axiosService.post(`/api/project` , data ,{
        headers: { "Content-Type": "multipart/form-data" },
    })
    return respone.data
}


const editProject = async (data : FormData , _id : string) => {
    const respone = await axiosService.put(`/api/project/${_id}` , data ,{
        headers: { "Content-Type": "multipart/form-data" },
    })
    return respone.data
}

const getAllProjects = async ()=>{
    const respone = await axiosService.get(`/api/project`);
    return respone.data
}


const deleteProject = async (id : string)=>{
    const respone = await axiosService.delete(`/api/project/${id}`);
    return respone.data
}





export default { addProject , getAllProjects , deleteProject , editProject}
