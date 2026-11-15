import { projectFormater } from "../lib/formaters.js"
import { deleteFileByUrl, uploadFile } from "../lib/cloudinary-manage.js"
import projectService from "../services/projectService.js"

export const addProject = async (req, res) => {
    try {
        const { name, description, tech, source, preview } = req.body

        if (!req.file) return res.status(400).json({
            message: "Project image is required"
        })

        let img_url = await uploadFile(req.file, "portfolio/projects")

        const project = await projectService.create({ name, description, tech, image: img_url, source, preview })

        return res.json({ project: projectFormater(project) })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export const getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getAll()

        const formatedProjects = projects.map(p => projectFormater(p))

        return res.json({
            projects: formatedProjects
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' });
    }
}



export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) return res.status(400).json({
            message: "Project Id is required"
        })

        const project = await projectService.getById(id)
        if (!project) {
            return res.status(404).json({ message: "Project not found" })
        }

        if (project?.image) {
            await deleteFileByUrl(project.image)

        }
        await projectService.deleteById(id)
        return res.json({ message: "Project deleted successfully" })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' });
    }
}




export const updateProject = async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, tech, source, preview } = req.body

        if (!id) return res.status(400).json({
            message: "Project Id is required"
        })


        let img_url;
        if (req.file) {
            img_url = await uploadFile(req.file, "portfolio/projects")
        }

        const project = await projectService.updateById(id, { name, description, tech, image: img_url, source, preview })

        return res.json({ project: projectFormater(project) })


    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' });
    }
}
