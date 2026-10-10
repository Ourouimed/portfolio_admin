import { useEffect, useState, type ChangeEvent } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Save, FileText, Upload, X, Loader2 } from "lucide-react";
import { useToast } from "../hooks/useToast";
import { useAppDispatch } from "../app/hooks";
import { getProfile, saveProfile } from "../services/profileService";

interface ProfileProps {
  _id?: string;
  email: string;
  instagram: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  location: string;
  resume: File | string | null;
}

interface FormErrors {
  email?: string;
  instagram?: string;
  github?: string;
  linkedin?: string;
  whatsapp?: string;
  location?: string;
  resume?: string;
}

const ProfilePage = () => {
  const [profileInfo, setProfileInfo] = useState<ProfileProps>({
    email: "",
    instagram: "",
    linkedin: "",
    whatsapp: "",
    github: "",
    location: "",
    resume: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);

        const res = await getProfile();

        setProfileInfo({
          email: res.profile?.email ?? "",
          instagram: res.profile?.instagram ?? "",
          github: res.profile?.github ?? "",
          linkedin: res.profile?.linkedin ?? "",
          whatsapp: res.profile?.whatsapp ?? "",
          location: res.profile?.location ?? "",
          resume: res.profile?.resume ?? null,
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [errors, setErrors] = useState<FormErrors>({});
  const toast = useToast();


  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setProfileInfo((prev) => ({ ...prev, [id]: value }));
    if (errors[id as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setErrors((prev) => ({
          ...prev,
          resume: "Please upload a valid PDF file.",
        }));
        return;
      }
      const url = URL.createObjectURL(file);
      setProfileInfo((prev) => ({ ...prev, resume: file }));
      setErrors((prev) => ({ ...prev, resume: undefined }));
    }
  };

  const removeResume = () => {
    setProfileInfo((prev) => ({ ...prev, resume: null }));
  };

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!profileInfo.email) tempErrors.email = "Email is required";
    if (!profileInfo.instagram) tempErrors.instagram = "instagram is required";
    if (!profileInfo.github) tempErrors.github = "github is required";
    if (!profileInfo.linkedin) tempErrors.linkedin = "linkedin is required";
    if (!profileInfo.location) tempErrors.location = "location is required";
    if (!profileInfo.whatsapp) tempErrors.whatsapp = "whatsapp is required";
    if (!profileInfo.resume) tempErrors.resume = "resume is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (validate()) {
      const formData = new FormData();

      formData.append("email", profileInfo.email);
      formData.append("instagram", profileInfo.instagram);
      formData.append("linkedin", profileInfo.linkedin);
      formData.append("github", profileInfo.github);
      formData.append("whatsapp", profileInfo.whatsapp);
      formData.append("location", profileInfo.location);

      if (profileInfo.resume instanceof File)
        formData.append("resume", profileInfo.resume);

      try {
        setIsLoading(true)
        const res = await saveProfile(formData);
        setProfileInfo({
          email: res.profile?.email ?? "",
          instagram: res.profile?.instagram ?? "",
          github: res.profile?.github ?? "",
          linkedin: res.profile?.linkedin ?? "",
          whatsapp: res.profile?.whatsapp ?? "",
          location: res.profile?.location ?? "",
          resume: res.profile?.resume ?? null,
        });
        toast.success("Profile saved successfully");
      } catch (err: any) {
        toast.error(err || "Failed to save profile")
      }
      finally {
        setIsLoading(false)
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-bold text-xl">Manage profile</h3>

        <Button size="sm" onClick={handleSaveProfile} className={isLoading ? "opacity-70" : "opacity-100"} disabled={isLoading}>
          Save profile
          {isLoading ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
        <div className="p-4 rounded-lg border border-gray-300 space-y-4">
          <div className="flex items-center gap-2">
            <div className="space-y-2">
              <label htmlFor="email" className="block font-semibold text-sm">
                Email      
              </label>
              <Input
                id="email"
                value={profileInfo.email}
                onChange={handleChange}
                placeholder="e.g user@example.com"
              />
              {errors.email && <p className="text-red-500 text-[10px]">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="instagram"
                className="block font-semibold text-sm"
              >
                Instagram
              </label>
              <Input
                id="instagram"
                value={profileInfo.instagram}
                onChange={handleChange}
                placeholder="ourouimed"
              />
              {errors.instagram && <p className="text-red-500 text-[10px]">{errors.instagram}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="space-y-2">
              <label htmlFor="github" className="block font-semibold text-sm">
                Github
              </label>
              <Input
                id="github"
                value={profileInfo.github}
                onChange={handleChange}
                placeholder="ourouimed"
              />
              {errors.github && <p className="text-red-500 text-[10px]">{errors.github}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="linkedin" className="block font-semibold text-sm">
                Linkedin
              </label>
              <Input
                id="linkedin"
                value={profileInfo.linkedin}
                onChange={handleChange}
                placeholder="ourouimed"
              />
              {errors.linkedin && <p className="text-red-500 text-[10px]">{errors.linkedin}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="space-y-2">
              <label htmlFor="whatsapp" className="block font-semibold text-sm">
                Whatsapp
              </label>
              <Input
                id="whatsapp"
                value={profileInfo.whatsapp}
                onChange={handleChange}
                placeholder="+212706500330"
              />
              {errors.whatsapp && <p className="text-red-500 text-[10px]">{errors.whatsapp}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="block font-semibold text-sm">
                Location
              </label>
              <Input
                id="location"
                value={profileInfo.location}
                onChange={handleChange}
                placeholder="e.g Rabat, Morocco"
              />
              {errors.location && <p className="text-red-500 text-[10px]">{errors.location}</p>}
            </div>
          </div>
        </div>

        {/* Resume / PDF Upload Section */}
        <div className="p-4 rounded-lg border border-gray-300 space-y-4 h-fit">
          <div className="space-y-2">
            <label className="block font-semibold text-sm">
              Resume / CV (PDF)
            </label>
            <p className="text-xs text-gray-500">
              Upload your latest resume or CV document in PDF format.
            </p>
          </div>

          {!profileInfo.resume ? (
            <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-gray-400 transition bg-gray-50/50">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-700">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">PDF (max 10MB)</p>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="p-2 bg-red-50 text-red-600 rounded-md">
                  <FileText size={20} />
                </div>

                <div className="truncate">
                  {profileInfo.resume instanceof File ? (
                    <>
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {profileInfo.resume.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(profileInfo.resume.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </>
                  ) : (
                    <>
                      <a
                        href={profileInfo.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600 hover:underline"
                      >
                        View current CV
                      </a>
                      <p className="text-xs text-gray-500">
                        Existing PDF document
                      </p>
                    </>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={removeResume}
                className="p-1 hover:bg-gray-200 cursor-pointer rounded-full text-gray-500 transition"
                aria-label="Remove file"
              >
                <X size={16} />
              </button>
            </div>
          )}
          {errors.resume && <p className="text-red-500 text-[10px]">{errors.resume}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
