import { projectFormater } from "../lib/formaters.js"
import { uploadImage } from "../lib/upload-image.js"
import Project from "../models/Project.js"

export const addProject = async (req , res)=>{
    try {
        const { name , description , tech , source , preview} = req.body
        const projImg = req.file 

        if (!name || !description || tech.length === 0) return res.status(400).json({
            error : "Missing some required fields"
        })

        if (!projImg) return res.status(400).json({
            error : "Project image is required"
        })
        
        let img_url = await uploadImage(projImg , "portfolio/projects")

        const project = await Project.create({
            name , description , tech , image : img_url , ...(source && { source }) , ...(preview && { preview })
        })


        
        return res.json({project : projectFormater(project)})
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error' });
    }
}


export const getAllProjects = async (req , res)=>{
    try {
        const projects = await Project.find().sort({ createdAt : -1});

        const formatedProjects = projects.map(p => projectFormater(p))
        return res.json({
            projects : formatedProjects
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error' });
    }
}



export const deleteProject = async (req , res)=>{
    try {
        const { id } = req.params 

        const project = await Project.findById(id);
        if(!project){
            return res.status(404).json({error : "Project not found"})
        }
        

        await Project.findByIdAndDelete(id);
        return res.json({message : "Project deleted successfully"})
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error' });
    }
}




export const editProject = async (req , res)=>{
    try {
        const { id } = req.params 

        const { name , description , tech , source , preview} = req.body
        const projImg = req.file  

        let img_url;
        if (projImg) {
            img_url = await uploadImage(projImg , "portfolio/projects")
        }
        
        

        const project = await Project.findByIdAndUpdate(id , {
            $set : {
                ...(name && { name }) ,
                ...(description && { description }),
                source,
                preview,
                ...(tech.length > 0 && { tech }) ,
                ...(projImg && { image : img_url })
            }
        } , { new : true})

        
        return res.json({project : projectFormater(project) })


    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error' });
    }
}
