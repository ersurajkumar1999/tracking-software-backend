var fs = require('fs');
const {
    errorResponseMessage,
    successResponseMessage
} = require("../helper/responseMessage.js");
const { checkImageType } = require("../helper/ImageValidation.js");
const { IMAGE_KIT } = require("../config");
const { createImage } = require('../services/imageService.js');
const { uploadToCloudinary } = require('../helper/cloudinaryHelper.js');
const { createScreenshot } = require('../services/screenshotServices.js');

const imageUpload111111 = async (req, res) => {
    try {
        const files = req.files;
        if (!files || files.length === 0) {
            return errorResponseMessage(res, "Please select Images");
        }
        const imageFolderName = req.body?.type || 'upload'; // this is folder name
        const images = [];
        for (const file of files) {
            if (!checkImageType(file.mimetype)) {
                return errorResponseMessage(res, "Invalid file type. Only JPG and PNG are allowed.");
            }
        }
        for (const file of files) {
            const fileContent = fs.readFileSync(file.path); // Read file content
            await new Promise((resolve, reject) => {
                IMAGE_KIT.upload({
                    file: fileContent,
                    fileName: file.originalname,
                    folder: "public/" + imageFolderName
                }, (err, response) => {
                    if (err) {
                        reject(err);
                    } else {
                        const fileInfo = {
                            imageId: response.fileId,
                            filePath: response.filePath,
                            url: response.url,
                        };
                        images.push(fileInfo);
                        resolve();
                    }
                });
            });
        }
        return successResponseMessage(res, "Successfully uploaded files", images);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
};
const screenshotUploadold = async (req, res) => {
    // return successResponseMessage(res, 'Successfully uploaded files', req.user.id);
    try {
        const userId = req.user.id;
        const files = req.files;
        if (!files || files.length === 0) {
            return errorResponseMessage(res, 'Please select Images');
        }
        const imageFolderName = req.body?.type || 'images'; // this is folder name
        const images = [];

        for (const file of files) {
            if (!checkImageType(file.mimetype)) {
                return errorResponseMessage(res, 'Invalid file type. Only JPG and PNG are allowed.');
            }
        }

        for (const file of files) {
            await new Promise((resolve, reject) => {
                IMAGE_KIT.upload(
                    {
                        file: file.buffer, // Use file buffer directly
                        fileName: file.originalname,
                        folder: 'public/' + imageFolderName,
                    },
                    async (err, response) => {
                        if (err) {
                            reject(err);
                        } else {
                            const fileInfo = {
                                createdBY: userId,
                                imageId: response.fileId,
                                imageType: response.fileType,
                                imageSize: response.size,
                                imagePath: response.filePath,
                                imageUrl: response.url,
                                folderName: imageFolderName
                            };
                            const imageInfo = await createImage(fileInfo);
                            // const imageData = await getImageById(imageInfo._id);
                            images.push(imageInfo);
                            resolve();
                        }
                    }
                );
            });
        }

        return successResponseMessage(res, 'Successfully uploaded files', images);
    } catch (error) {
        return errorResponseMessage(res, 'Something went wrong: ' + error.message);
    }
};
const screenshotUpload = async (req, res) => {
    try {
        const { activity, memo } = req.body;
        const userId = req.user.id;
        const file = req.file;
        const folderName = req.body.folderName || 'screenshots'; // Dynamic folder name

        if (!file) {
            return res.status(400).json({ message: 'Please select an image' });
        }
        // const fileName = 
        const uploadResult = await uploadToCloudinary(file.buffer, file.originalname.split('.')[0], folderName);
        
        if (!uploadResult || !uploadResult.secure_url) {
            throw new Error('Failed to upload image to Cloudinary');
        }
        const screenshot = await createScreenshot({
            user: userId,
            image: uploadResult.secure_url, // Cloudinary URL,
            assetId: uploadResult.asset_id,
            size: uploadResult.bytes,
            activityLevel: activity || 0,
            memo: memo || "Working on Today Task!"
        })
        return res.status(200).json({ message: 'Successfully uploaded file', screenshot });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: 'Something went wrong: ' + error.message });
    }
};
const deleteScreenshot = async (req, res) => {
    try {
        // const imageId = req.params?.imageId;
        // if (!imageId) {
        //     return errorResponseMessage(res, "Image Id is required!", 401);
        // }
        // IMAGE_KIT.deleteFile(imageId, (err, response) => {
        //     if (err) {
        //         return errorResponseMessage(res, "Failed to delete image: " + err.message);
        //     } else {
        //         return successResponseMessage(res, "Image deleted successfully", response);
        //     }
        // });
        const imageId = req.params.imageId; // Assuming the imageId is passed as a parameter in the URL

        if (!imageId) {
            return errorResponseMessage(res, 'Image ID is required for deletion');
        }

        await new Promise((resolve, reject) => {
            IMAGE_KIT.deleteFile(imageId, (err, response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        return successResponseMessage(res, 'Successfully deleted image');
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
};
module.exports = { screenshotUpload, deleteScreenshot }