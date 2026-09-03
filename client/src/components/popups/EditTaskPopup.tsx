import { useState, type ChangeEvent } from "react";
import { Input } from "../ui/Input";
import { TextArea } from "../ui/Textarea";
import { Button } from "../ui/Button";
import { Loader2 } from "lucide-react";
import { useTask } from "../../hooks/useTask";
import { addTask, editTask } from "../../app/features/tasks/taskThunks";
import { useToast } from "../../hooks/useToast";
import { useAppDispatch } from "../../app/hooks";

interface TaskInfo {
  title: string;
  content: string;
  date: string;
}

interface FormErrors {
  title?: string;
  content?: string;
  date?: string;
}
export const EditTaskPopup = ({ closePopup , task}: any) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [taskInfo, setTaskInfo] = useState<TaskInfo>({
    title: task?.title || "",
    content: task?.content || "",
    date: new Date(task?.date).toISOString().slice(0, 16) || "",
  });



  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isLoading } = useTask();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setTaskInfo((prev) => ({ ...prev, [id]: value }));
    console.log(taskInfo)
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
        await dispatch(editTask({ data : taskInfo , _id : task._id})).unwrap();
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

      {/* Task date Field */}
      <div className="space-y-2">
        <label htmlFor="date" className="block font-semibold text-sm">
          Date
        </label>
        <Input
          type="datetime-local"
          id="date"
          onChange={handleChange}
          value={taskInfo.date}
          className={errors.date ? "border-red-500 focus:ring-red-500" : ""}
        />
        {errors.date && <p className="text-red-500 text-[10px]">{errors.date}</p>}
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

      <Button
        fullWidth
        disabled={isLoading}
        onClick={handleEditTask}
        className="bg-blue-500"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : "Edit Task"}
      </Button>
    </div>
  );
};
