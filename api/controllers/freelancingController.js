import { freelanceProjectFormater } from "../lib/formaters.js";
import freelanceService from "../services/freelanceService.js";

export const addFreelanceProject = async (req, res) => {
    try {
        const { client, project_name, description, status, start_date, deadline } = req.body

        const freelanceProject = await freelanceService.create({ client, project_name, description, status, start_date, deadline })

        return res.json({ freelanceProject: freelanceProjectFormater(freelanceProject) });

    }

    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const getFreelanceProjects = async (req, res) => {
    try {
        const freelanceProjects = await freelanceService.getAll()

        const formatedFreelanceProjects = freelanceProjects.map((p) => freelanceProjectFormater(p));
        return res.json({
            freelanceProjects: formatedFreelanceProjects,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getFreelanceProjectById = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: "Id is required" })
        }

        const project = await freelanceService.getById(id)
        console.log(project)
        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            })
        }



        return res.json({
            project: freelanceProjectFormater(project),
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const deleteFreelanceProject = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ message: "Id is required" })
        }

        const project = await freelanceService.getById(id)

        if (!project) {
            return res.status(404).json({ message: "Project not found" })
        }


        await freelanceService.deleteById(id)
        return res.json({ message: "Task deleted successfully" })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export const updateFreelanceProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { client, project_name, status, start_date, deadline } = req.body


        if (!id) return res.status(400).json({
            message: "Freelance project Id is required"
        })

        const freelanceProject = await freelanceService.updateById(id, { client, project_name, status, start_date, deadline })

        return res.json({ freelanceProject: freelanceProjectFormater(freelanceProject) });

    }

    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}