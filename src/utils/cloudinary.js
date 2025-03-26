import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import fs from "fs";

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.log("Sorry I am unable to get File Path:");
      return null;
    }

    //Upload the File on Cloudinary....
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    //File has been Uploaded SuccessFully
    // console.log(
    //   "Yep! File has been Uploaded Successfully on Cloudinary....",
    //   response.url
    // );
    fs.unlinkSync(localFilePath)
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); //remove th elocally saved temporary file as the upload operation got fail....
    return null;
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});


export {uploadOnCloudinary}