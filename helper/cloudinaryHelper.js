const { cloudinary } = require("../utilities/config");

const uploadToCloudinary = (fileBuffer, fileName, folderName) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                resource_type: 'screenshots',
                folder: folderName,
                public_id: fileName,
                format: 'png' // or jpg, etc.
            },
            (error, result) => {
                console.log("error", error);
                console.log("result", result);
                if (error) return reject(error);
                resolve(result);
            }
        ).end(fileBuffer);
    });
};

module.exports = { uploadToCloudinary };