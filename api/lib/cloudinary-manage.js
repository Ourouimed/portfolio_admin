
import cloudinary from "../config/cloud.js";

const uploadFile = async (file, folder_name) => {
  if (!file) return null;

  if (!file.buffer) {
    throw new Error("File buffer is missing");
  }

  // 1. Ensure the file buffer is a Node.js Buffer
  const buffer = Buffer.isBuffer(file.buffer)
    ? file.buffer
    : Buffer.from(file.buffer);

  // 2. Detect whether the uploaded file is a PDF
  const isPdf =
    file.mimetype === "application/pdf" ||
    file.originalname?.toLowerCase().endsWith(".pdf");

  // 3. Prepare a public ID with the correct extension
  const originalName = file.originalname || "upload";
  const filenameWithoutExtension = originalName.replace(/\.[^/.]+$/, "");

  const publicId = isPdf
    ? `${filenameWithoutExtension}.pdf`
    : filenameWithoutExtension;

  // 4. Upload the file to Cloudinary
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: folder_name,
        resource_type: isPdf ? "raw" : "image",
        public_id: publicId,
        overwrite: false,
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return reject(error);
        }

        if (!result?.secure_url) {
          return reject(
            new Error("Cloudinary did not return a secure URL")
          );
        }

        resolve(result.secure_url);
      }
    );

    stream.end(buffer);
  });
};



const deleteFileByUrl = async (url) => {
  if (!url) return null;

  const match = url.match(
    /\/(image|raw|video)\/upload\/(?:v\d+\/)?(.+)$/
  );

  if (!match) {
    throw new Error("Invalid Cloudinary URL");
  }

  const resourceType = match[1];
  const publicId = decodeURIComponent(match[2]);

  // const result = await cloudinary.uploader.destroy(publicId, {
  //   resource_type: resourceType,
  //   type: "upload",
  //   invalidate: true,
  // });

  const result = await cloudinary.uploader.destroy(
  "portfolio/projects/Group-1511-1.png",
  {
    resource_type: "image",
    type: "upload",
  }
);

console.log(result);

  console.log({ publicId, resourceType, result });

  return result;
};




export { uploadFile , deleteFileByUrl};