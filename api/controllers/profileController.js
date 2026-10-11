import cloudinary from "../config/cloud.js";
import { profileFormater } from "../lib/formaters.js";
import { deleteFileByUrl, uploadFile } from "../lib/cloudinary-manage.js";
import Profile from "../models/Profile.js"


export const saveProfile = async (req, res) => {
  try {
    const {
      email,
      instagram,
      linkedin,
      github,
      whatsapp,
      location,
    } = req.body;

    if (
      !email?.trim() ||
      !instagram?.trim() ||
      !linkedin?.trim() ||
      !github?.trim() ||
      !whatsapp?.trim() ||
      !location?.trim()
    ) {
      return res.status(400).json({
        error: "Missing some required fields",
      });
    }

    const existedProfile = await Profile.findOne();

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
          error: "Resume must be a PDF file",
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
      profile = await Profile.findByIdAndUpdate(
        existedProfile._id,
        { $set: updateData },
        { new: true, runValidators: true }
      );
    } else {
      profile = await Profile.create(updateData);
    }

    return res.json({ profile });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};



export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne()
    console.log(profile)

    return res.json({
      profile : profileFormater(profile),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};