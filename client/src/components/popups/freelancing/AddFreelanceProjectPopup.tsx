import { useState, type ChangeEvent } from "react"
import type { FreelanceProjectProps } from "../../../interfaces/freelancingProps"
import { Input } from "../../ui/Input"
import { TextArea } from "../../ui/Textarea"
import { Select } from "../../ui/Select"
import { Button } from "../../ui/Button"
import { useAppDispatch } from "../../../app/hooks"
import { useToast } from "../../../hooks/useToast"
import { useFreelancing } from "../../../hooks/useFreelancing"
import { addFreelanceProject } from "../../../app/features/freelancing/freelancingThunks"
import { Loader2 } from "lucide-react"

export const AddFreelanceProjectPopup = ({ closePopup }: any) => {
    interface FormErrors {
        client?: {
            name?: string
            email?: string
            phone?: string
        }
        project_name?: string
        description?: string
        status?: string
        start_date?: string
        deadline?: string
    }

    const [freelanceProject, setFreelanceProject] = useState<FreelanceProjectProps>({
        client: {
            name: "",
            email: "",
            phone: "",
        },
        project_name: "",
        description: "",
        status: "Planning",
        start_date: "",
        deadline: "",
        docs: [],
    });

    const projectStatus = ["Planning", "In progress", "Review", "Done", "Delivered"]
    const [errors, setErrors] = useState<FormErrors>({});


    const dispatch = useAppDispatch();
    const toast = useToast();

    const { isLoading } = useFreelancing();

    const validate = (): boolean => {
        const tempErrors: FormErrors = {};
        // Validate client fields 
        if (!freelanceProject.client.name.trim())
            (tempErrors.client ??= {}).name = "Freelance client name is required";

        if (!freelanceProject.client.phone.trim())
            (tempErrors.client ??= {}).phone = "Freelance client phone is required";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(freelanceProject.client.email.trim()))
            (tempErrors.client ??= {}).email = "Please enter a valid email address";


        // validate project fields 
        if (!freelanceProject.project_name.trim())
            tempErrors.project_name = "Freelance Project name is required";


        if (!projectStatus.includes(freelanceProject.status.trim()))
            tempErrors.status = "Unsupported Freelance Project status";


        if (freelanceProject.start_date) {
            const selectedDate = new Date(freelanceProject.start_date);
            const now = new Date();

            if (selectedDate <= now) {
                tempErrors.start_date = "Freelance Project date must be in the future";
            }
        } else {
            tempErrors.start_date = "Freelance Project date is required";
        }


        if (freelanceProject.deadline) {
            const startDate = new Date(freelanceProject.start_date);
            const selectedDate = new Date(freelanceProject.deadline);
            const now = new Date();

            if (selectedDate <= now) {
                tempErrors.deadline = "Freelance Project deadline must be in the future";
            }

            if (selectedDate <= startDate) {
                tempErrors.deadline = "Freelance Project deadline cannot before project starts";
            }

        } else {
            tempErrors.deadline = "Freelance Project deadline is required";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target
        setFreelanceProject((prev) => ({ ...prev, [id]: value }));
    }

    const handleClientChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target
        setFreelanceProject((prev) => ({
            ...prev, client: {
                ...prev.client,
                [id]: value
            }
        }));
    }

    const handleAddFreelanceProject = async () => {
        if (validate()) {
            try {
                await dispatch(addFreelanceProject(freelanceProject)).unwrap();
                toast.success("Freelance project added successfully");
                closePopup();
            } catch (err: any) {
                toast.error(err || "Failed to add project");
            }
        }
    }

    return (
        <div className="space-y-4">
            {/* Client Data Section */}
            <div className="space-y-3 p-4 rounded-xl border border-gray-300">
                <h4 className="text-xl font-bold">Client data</h4>
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        {/* Client name */}
                        <div className="space-y-2 w-full">
                            <label htmlFor="name" className="block font-semibold text-sm">
                                Name
                            </label>
                            <Input
                                type="text"
                                id="name"
                                placeholder="e.g John Doe"
                                onChange={handleClientChange}
                                value={freelanceProject.client.name}
                                className={errors.client?.name ? "border-red-500 focus:ring-red-500" : ""}
                            />
                            {errors.client?.name && (
                                <p className="text-red-500 text-[10px]">{errors.client?.name}</p>
                            )}
                        </div>

                        {/* Client Phone */}
                        <div className="space-y-2 w-full">
                            <label htmlFor="phone" className="block font-semibold text-sm">
                                Phone
                            </label>
                            <Input
                                type="text"
                                id="phone"
                                placeholder="e.g +2126******"
                                onChange={handleClientChange}
                                value={freelanceProject.client.phone}
                                className={errors.client?.phone ? "border-red-500 focus:ring-red-500" : ""}
                            />
                            {errors.client?.phone && (
                                <p className="text-red-500 text-[10px]">{errors.client?.phone}</p>
                            )}
                        </div>
                    </div>

                    {/* Client Email */}
                    <div className="space-y-2 w-full">
                        <label htmlFor="email" className="block font-semibold text-sm">
                            Email
                        </label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="e.g john@example.com"
                            onChange={handleClientChange}
                            value={freelanceProject.client.email}
                            className={errors.client?.email ? "border-red-500 focus:ring-red-500" : ""}
                        />
                        {errors.client?.email && (
                            <p className="text-red-500 text-[10px]">{errors.client?.email}</p>
                        )}

                    </div>
                </div>
            </div>

            {/* Project Details Section */}
            <div className="space-y-3 p-4 rounded-xl border border-gray-300">
                <h4 className="text-xl font-bold">Project details</h4>

                {/* Project Name */}
                <div className="space-y-2">
                    <label htmlFor="project_name" className="block font-semibold text-sm">
                        Project Name
                    </label>
                    <Input
                        type="text"
                        id="project_name"
                        placeholder="e.g E-commerce Redesign"
                        onChange={handleChange}
                        value={freelanceProject.project_name}
                        className={errors.project_name ? "border-red-500 focus:ring-red-500" : ""}
                    />
                    {errors.project_name && (
                        <p className="text-red-500 text-[10px]">{errors.project_name}</p>
                    )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label htmlFor="description" className="block font-semibold text-sm">
                        Description
                    </label>
                    <TextArea
                        id="description"
                        rows={3}
                        placeholder="Brief overview of the project scope..."
                        onChange={handleChange}
                        value={freelanceProject.description}
                    />
                </div>

                {/* Status Dropdown */}
                <div className="space-y-2">
                    <label htmlFor="status" className="block font-semibold text-sm">
                        Status
                    </label>


                    <Select
                        value={freelanceProject.status}
                        options={projectStatus}
                        onChange={(e) =>
                            setFreelanceProject((p: any) => ({ ...p, status: e.target.value }))
                        }
                        className={errors.status ? "border-red-500 focus:ring-red-500" : ""}
                    />
                    {errors.status && (
                        <p className="text-red-500 text-[10px]">{errors.status}</p>
                    )}
                </div>

                {/* Dates (Start Date & Deadline) */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                        <label htmlFor="start_date" className="block font-semibold text-sm">
                            Start Date
                        </label>
                        <Input
                            type="date"
                            id="start_date"
                            onChange={handleChange}
                            value={freelanceProject.start_date}
                            className={errors.start_date ? "border-red-500 focus:ring-red-500" : ""}
                        />
                        {errors.start_date && (
                            <p className="text-red-500 text-[10px]">{errors.start_date}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="deadline" className="block font-semibold text-sm">
                            Deadline
                        </label>
                        <Input
                            type="date"
                            id="deadline"
                            onChange={handleChange}
                            value={freelanceProject.deadline}
                            className={errors.deadline ? "border-red-500 focus:ring-red-500" : ""}
                        />
                        {errors.deadline && (
                            <p className="text-red-500 text-[10px]">{errors.deadline}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 pt-2">
                <Button
                    variant="outline"
                    onClick={closePopup}
                >
                    Cancel
                </Button>
                <Button
                    disabled={isLoading}
                    onClick={handleAddFreelanceProject}
                >
                    {isLoading ? <Loader2 className="animate-spin" /> : "Save Project"}
                </Button>
            </div>
        </div>
    )
}