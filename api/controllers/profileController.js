import cloudinary from "../config/cloud.js";
import { profileFormater } from "../lib/formaters.js";
import { deleteFileByUrl, uploadFile } from "../lib/cloudinary-manage.js";
import Profile from "../models/Profile.js"
import profileService from "../services/profileService.js";


export const saveProfile = async (req, res) => {
  try {
    const {email,instagram,linkedin,github,whatsapp,location,} = req.body;

    if (
      !email?.trim() ||
      !instagram?.trim() ||
      !linkedin?.trim() ||
      !github?.trim() ||
      !whatsapp?.trim() ||
      !location?.trim()
    ) {
      return res.status(400).json({
        message : "Missing some required fields",
      });
    }

    const existedProfile = await profileService.getOne();

    const updateData = {
      email: email.trim(),
      instagram: instagram.trim(),
      linkedin: linkedin.trim(),
      github: github.trim(),
      whatsapp: whatsapp.trim(),
      location: location.trim(),
    };

    // Upload a new resume if provided
    if (req.file) {
      if (req.file.mimetype !== "application/pdf") {
        return res.status(400).json({
          message : "Resume must be a PDF file",
        });
      }

      if(existedProfile?.resume) {
        await deleteFileByUrl(existedProfile?.resume)
      }
      updateData.resume = await uploadFile(
        req.file,
        "portfolio/resume"
      );
    } 

    let profile;

    if (existedProfile) {
      profile = await profileService.updateById(existedProfile._id , updateData)
    } else {
      profile = await profileService.create(updateData);
    }

    return res.json({ profile });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};



export const getProfile = async (req, res) => {
  try {
    const profile = await profileService.getOne()

    return res.json({
      profile : profileFormater(profile),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};