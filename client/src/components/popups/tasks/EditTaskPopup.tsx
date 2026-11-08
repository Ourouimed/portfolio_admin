import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { Input } from "../../ui/Input";
import { TextArea } from "../../ui/Textarea";
import { Button } from "../../ui/Button";
import { Loader2 } from "lucide-react";
import { useTask } from "../../../hooks/useTask";
import { editTask } from "../../../app/features/tasks/taskThunks";
import { useToast } from "../../../hooks/useToast";
import { useAppDispatch } from "../../../app/hooks";
import { Select } from "../../ui/Select";
import type { Task } from "../../../app/features/tasks/taskTypes";
import { getFreelanceProjects } from "../../../app/features/freelancing/freelancingThunks";
import { useFreelancing } from "../../../hooks/useFreelancing";


interface FormErrors {
  title?: string;
  content?: string;
  date?: string;
  status?: string
  priority?: string
}
export const EditTaskPopup = ({ closePopup, task }: any) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [taskInfo, setTaskInfo] = useState<Task>({
    title: task?.title || "",
    content: task?.content || "",
    date: new Date(task?.date).toISOString().slice(0, 16) || "",
    status: task?.status || "Todo",
    priority: task?.priority || "Medium",
    project: task?.project || ""
  });



  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isLoading: taskIsLoading } = useTask();
  const { isLoading: freelanceIsLoading, freelanceProjects } = useFreelancing()


  useEffect(() => {
    dispatch(getFreelanceProjects())
  }, [])


  const formatedProjects = useMemo(() => {
    return ["None", ...freelanceProjects.map((p: any) => ({ key: p._id, value: p.project_name }))]
  }, freelanceProjects)


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setTaskInfo((prev) => ({ ...prev, [id]: value }));
  };

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};

    if (!taskInfo.title.trim()) tempErrors.title = "Task title is required";
    if (!taskInfo.content.trim())
      tempErrors.content = "Task content is required";

    if (taskInfo.date) {
      const selectedDate = new Date(taskInfo.date);
      const now = new Date();

      if (selectedDate <= now) {
        tempErrors.date = "Task date and time must be in the future";
      }
    } else {
      tempErrors.date = "Task date and time is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleEditTask = async () => {
    if (validate()) {
      try {
        await dispatch(editTask({ data: taskInfo, _id: task._id })).unwrap();
        toast.success("Task updated successfully");
        closePopup();
      } catch (err: any) {
        toast.error(err || "Failed to update task");
      }
    }
  };
  return (
    <div className="space-y-4">
      {/* Task Title Field */}
      <div className="space-y-2">
        <label htmlFor="title" className="block font-semibold text-sm">
          Title
        </label>
        <Input
          placeholder="e.g Do home work"
          type="text"
          id="title"
          onChange={handleChange}
          value={taskInfo.title}
          className={errors.title ? "border-red-500 focus:ring-red-500" : ""}
        />
        {errors.title && <p className="text-red-500 text-[10px]">{errors.title}</p>}
      </div>


      {/* Project field */}
      {freelanceIsLoading && freelanceProjects.length === 0 ? <p>Loading projects ....</p> :
        <div className="space-y-2">
          <label htmlFor="project" className="block font-semibold text-sm">
            Project
          </label>
          <Select value={taskInfo.project ?? ""}
            options={formatedProjects}
            onChange={(e) =>
              setTaskInfo((p: any) => ({ ...p, project: e.target.value }))
            }
          />
        </div>
      }

      {/* Task date Field */}
      <div className="space-y-2">
        <label htmlFor="date" className="block font-semibold text-sm">
          Date
        </label>
        <Input
          type="datetime-local"
          id="date"
          onChange={handleChange}
          value={taskInfo.date ?? ""}
          className={errors.date ? "border-red-500 focus:ring-red-500" : ""}
        />
        {errors.date && <p className="text-red-500 text-[10px]">{errors.date}</p>}
      </div>

      {/* Priority/Status Fields */}
      <div className="flex items-center gap-4">
        <div className="space-y-2 w-full">
          <label htmlFor="date" className="block font-semibold text-sm">
            Status
          </label>
          <Select id="status" options={["Todo", "Doing", "Done"]} value={taskInfo.status} onChange={
            (e: any) => {
              setTaskInfo((p: any) => ({ ...p, status: e.target.value }))
            }
          } />
          {errors.status && <p className="text-red-500 text-[10px]">{errors.status}</p>}
        </div>

        <div className="space-y-2 w-full">
          <label htmlFor="date" className="block font-semibold text-sm">
            Priority
          </label>
          <Select id="priority" className="w-full" options={["Low", "Medium", "High"]} value={taskInfo.priority} onChange={
            (e: any) => {
              setTaskInfo((p: any) => ({ ...p, priority: e.target.value }))
            }
          } />
          {errors.priority && <p className="text-red-500 text-[10px]">{errors.priority}</p>}
        </div>
      </div>


      {/* Content Field */}
      <div className="space-y-2">
        <label htmlFor="content" className="block font-semibold text-sm">
          Content
        </label>
        <TextArea
          placeholder="e.g continue school home work"
          id="content"
          onChange={handleChange}
          value={taskInfo.content}
          className={errors.content ? "border-red-500 focus:ring-red-500" : ""}
        />
        {errors.content && <p className="text-red-500 text-[10px]">{errors.content}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button
          variant="outline"
          onClick={closePopup}
        >
          Cancel
        </Button>
        <Button
          disabled={taskIsLoading}
          onClick={handleEditTask}
        >
          {taskIsLoading ? <Loader2 className="animate-spin" /> : "Save task"}
        </Button>
      </div>
    </div>
  );
};
