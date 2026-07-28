import { useState, type ChangeEvent } from "react";
import type { JourneyProps } from "../../interfaces/journeyProps";
import { useAppDispatch } from "../../app/hooks";
import { useToast } from "../../hooks/useToast";
import { useJourney } from "../../hooks/useJourney";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { Loader2 } from "lucide-react";
import { addJourney } from "../../app/features/journey/journeyThunks";
import { TextArea } from "../ui/Textarea";

interface FormErrors {
  title?: string;
  org?: string;
  start_date?: string;
  end_date?: string;
  type?: string;
  location?: string;
  org_link?: string;
  description?: string;
}
export const AddJourneyPopup = ({ closePopup }: any) => {
  const [journeyInfo, setJourneyInfo] = useState<JourneyProps>({
    title: "",
    org: "",
    start_date: "",
    end_date: "",
    org_link: "",
    type: "work",
    location: "",
    description: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const dispatch = useAppDispatch();
  const toast = useToast();

  const { isLoading } = useJourney();

  const isValidUrl = (url: string): boolean => {
    try {
      const u = new URL(url);
      console.log(u);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!journeyInfo.title.trim())
      tempErrors.title = "Journey title is required";
    if (!journeyInfo.type.trim()) tempErrors.type = "Journey type is required";
    if (!journeyInfo.start_date.trim())
      tempErrors.start_date = "Journey start date is required";
    if (!journeyInfo.end_date.trim())
      tempErrors.end_date = "Journey end date is required";

    if (journeyInfo.org_link && !isValidUrl(journeyInfo.org_link))
      tempErrors.org_link = "Unvalid url";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setJourneyInfo((prev) => ({ ...prev, [id]: value }));
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleAddJourney = async () => {
    if (validate()) {
      try {
        await dispatch(addJourney(journeyInfo)).unwrap();
        toast.success("Journey added successfully");
        closePopup();
      } catch (err: any) {
        toast.error(err || "Failed to add project");
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="block font-semibold text-sm">
          Title <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          id="title"
          placeholder="e.g Full stack dev"
          onChange={handleChange}
          value={journeyInfo.title}
          className={errors.title ? "border-red-500 focus:ring-red-500" : ""}
        />
        {errors.title && (
          <p className="text-red-500 text-[10px]">{errors.title}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="org" className="block font-semibold text-sm">
          Organisition
        </label>
        <Input
          type="text"
          id="org"
          placeholder="e.g Meta"
          onChange={handleChange}
          value={journeyInfo.org}
          className={errors.org ? "border-red-500 focus:ring-red-500" : ""}
        />
        {errors.org && <p className="text-red-500 text-[10px]">{errors.org}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="org_link" className="block font-semibold text-sm">
          Organization link
        </label>
        <Input
          type="text"
          id="org_link"
          placeholder="https://meta.com"
          onChange={handleChange}
          value={journeyInfo.org_link}
          className={errors.org_link ? "border-red-500 focus:ring-red-500" : ""}
        />
        {errors.org_link && (
          <p className="text-red-500 text-[10px]">{errors.org_link}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="type" className="block font-semibold text-sm">
          type <span className="text-red-500">*</span>
        </label>
        <Select
          value={journeyInfo.type}
          options={["education", "work"]}
          onChange={(e) =>
            setJourneyInfo((p: any) => ({ ...p, type: e.target.value }))
          }
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="start_date" className="block font-semibold text-sm">
          Start Date <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          id="start_date"
          placeholder="e.g July 2023"
          onChange={handleChange}
          value={journeyInfo.start_date}
          className={
            errors.start_date ? "border-red-500 focus:ring-red-500" : ""
          }
        />
        {errors.start_date && (
          <p className="text-red-500 text-[10px]">{errors.start_date}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="end_date" className="block font-semibold text-sm">
          End Date <span className="text-red-500">*</span>
        </label>
        <Input
          type="text"
          id="end_date"
          placeholder="e.g Present"
          onChange={handleChange}
          value={journeyInfo.end_date}
          className={errors.end_date ? "border-red-500 focus:ring-red-500" : ""}
        />
        {errors.end_date && (
          <p className="text-red-500 text-[10px]">{errors.end_date}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="location" className="block font-semibold text-sm">
          Location
        </label>
        <Input
          type="text"
          id="location"
          placeholder="e.g Meta"
          onChange={handleChange}
          value={journeyInfo.location}
          className={errors.location ? "border-red-500 focus:ring-red-500" : ""}
        />
        {errors.location && (
          <p className="text-red-500 text-[10px]">{errors.location}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="block font-semibold text-sm">
          description
        </label>
        <TextArea
          id="description"
          placeholder="e.g Meta"
          onChange={handleChange}
          value={journeyInfo.description}
          className={
            errors.description ? "border-red-500 focus:ring-red-500" : ""
          }
        />
        {errors.description && (
          <p className="text-red-500 text-[10px]">{errors.description}</p>
        )}
      </div>

      <Button
        fullWidth
        disabled={isLoading}
        onClick={handleAddJourney}
        className="bg-blue-500"
      >
        {isLoading ? <Loader2 className="animate-spin" /> : "Add Journey"}
      </Button>
    </div>
  );
};
