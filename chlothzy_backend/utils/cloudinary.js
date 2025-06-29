import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

export const connectCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log('Connected to Cloudinary successfully');
  } catch (error) {
    console.error('Error connecting to Cloudinary:', error);
  }
};

const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    fs.unlinkSync(localFilePath); // delete the temp local file after upload
    // file uploaded successfully
    return response.secure_url;
  } catch (error) {
    fs.unlinkSync(localFilePath); // delete the temp local file if upload fails
    console.error('Error uploading to Cloudinary:', error);
    return null;
  }
};

export { uploadToCloudinary };
