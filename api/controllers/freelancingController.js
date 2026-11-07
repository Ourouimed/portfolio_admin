import { freelanceProjectFormater } from "../lib/formaters.js";
import FreelanceProject from "../models/FreelanceProject.js"

export const addFreelanceProject = async (req, res) => {
    try {
        const { client, project_name, description, status, start_date, deadline, docs = [] } = req.body
        const { name, email, phone } = client


        if (!client || !project_name || !name || !email || !phone || !status || !start_date || !deadline) {
            return res.status(400).json({
                error: "Missing some required fields",
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                error: "Invalid email format",
            });
        }


        // start date and deadline validation
        if (start_date) {
            const selectedDate = new Date(start_date);
            const now = new Date();

            if (selectedDate <= now) {
                return res.status(422).json({
                    error: "Freelance Project date must be in the future"
                });
            }
        } else {
            return res.status(400).json({
                error: "Freelance Project date is required"
            });
        }


        if (deadline) {
            const startDate = new Date(start_date);
            const selectedDate = new Date(deadline);
            const now = new Date();

            if (selectedDate <= now) {
                return res.status(422).json({
                    error: "Freelance Project deadline must be in the future"
                });

            }

            if (selectedDate <= startDate) {
                return res.status(422).json({
                    error: "Freelance Project deadline cannot before project starts"
                });
            }

        } else {
            return res.status(400).json({
                error: "Freelance Project deadline is required"
            });
        }


        const freelanceProject = await FreelanceProject.create({
            client: { name, email, phone },
            client, project_name, status, start_date, deadline,
            ...(description && { description }),
            // ...(docs && { docs }),
            docs: [
                {
                    url: "hi",
                    title: "jjjj"
                }
            ]

        })

        return res.json({ freelance_project: freelanceProjectFormater(freelanceProject) });

    }

    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const getFreelanceProjects = async (req, res) => {
    try {
        const freelanceProjects = await FreelanceProject.find().sort({ createdAt: -1 });

        const formatedFreelanceProjects = freelanceProjects.map((p) => freelanceProjectFormater(p));
        console.log(formatedFreelanceProjects)
        return res.json({
            freelanceProjects: formatedFreelanceProjects,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}