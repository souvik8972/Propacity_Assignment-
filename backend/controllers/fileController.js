const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const File = require("../models/File");
const Folder = require("../models/Folder");
require("dotenv").config();

const s3 =require('../services/aws.js')

// Upload a file
// exports.uploadFile = async (req, res) => {
//     try {
//         const media = req.file; // Assuming single file upload with multer
//         const { folderId } = req.body;
//         const { userId } = req.user;

//         if (!media) {
//             return res.status(400).json({ error: "No file uploaded." });
//         }

//         console.log(`File uploaded by user ${userId}:`, media);

//         try {
//             // Generate a unique filename for the uploaded media
//             const filename = `user${userId}/${Date.now()}_${media.originalname}`;

//             // Upload the media to AWS S3
//             const attachmentUrl = await uploadToS3(media.buffer, filename);
// console.log(attachmentUrl,"attachmentUrl");
//             // Save file details to the database
//             // const uploadedFile = await File.create({
//             //     name: media.originalname,
//             //     url: attachmentUrl,
//             //     size: media.size,
//             //     UserId: userId,
//             //     FolderId: folderId,
//             // });

//             // Send response with the uploaded file details
//             res.status(201).json({ message: "File uploaded successfully", attachmentUrl });
//         } catch (error) {
//             console.error("Error processing file:", error);
//             res.status(500).json({ error: "Error processing file." });
//         }
//     } catch (error) {
//         console.error("Error uploading files:", error);
//         res.status(500).json({ error: "Error uploading files." });
//     }
// };
exports.uploadFile = async (req, res) => {
    const file = req.file;
    const { folderId } = req.body;
    const { userId } = req.user;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `uploads/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype,
        // ACL: 'public-read', // Uncomment if you want public access
    };

    try {
        const data = await s3.upload(params).promise();

        // Save file information to the database
        const uploadedFile = await File.create({
            name: file.originalname,
            url: data.Location, // URL of the uploaded file
            size: file.size,
            UserId: userId,
            FolderId: folderId||0,
        });

        // Send response with file information
        res.status(200).json({
            message: 'File uploaded successfully',
            file: uploadedFile,
        });
    } catch (error) {
        res.status(500).send(`Error uploading file: ${error.message}`);
    }
};


// Get files in a folder
exports.getFilesInFolder = async (req, res) => {
    const { folderId } = req.params;
    const { userId } = req.user;

    try {
        const files = await File.findAll({ where: { FolderId: folderId, UserId: userId } });
        res.json(files);
    } catch (error) {
        console.error("Error retrieving files:", error);
        res.status(500).json({ error: "Error retrieving files." });
    }
};

exports.getFiles = async (req, res) => {
    const { userId } = req.user; // Extract the user ID from the request object
    try {
        // Fetch the latest 5 files from the database for the given user
        const files = await File.findAll({
            where: { UserId: userId }, // Use UserId field instead of userId
            limit: 5,
            order: [['createdAt', 'DESC']], // Order by creation date descending
        });

        // Send the files as a response
        res.status(200).json(files);
    } catch (error) {
        console.error("Error retrieving files:", error);
        res.status(500).json({ error: "Error retrieving files." });
    }
};

// Delete a file
exports.deleteFile = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;

    try {
        const file = await File.findOne({ where: { id, UserId: userId } });

        if (!file) {
            return res.status(404).json({ error: "File not found." });
        }

        // Delete the file from the database
        await file.destroy();
        res.json({ message: "File deleted successfully." });
    
        
    } catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).json({ error: "Error deleting file." });
    }
};

// Edit a file's metadata
exports.editFile = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;
    const { name } = req.body; // You can add more fields to update if needed

    try {
        const file = await File.findOne({ where: { id, UserId: userId } });

        if (!file) {
            return res.status(404).json({ error: "File not found." });
        }

        // Update the file's information
        file.name = name || file.name;
        // Update other fields as needed

        await file.save();
        res.json(file);
    } catch (error) {
        console.error("Error updating file information:", error);
        res.status(500).json({ error: "Error updating file information." });
    }
};
