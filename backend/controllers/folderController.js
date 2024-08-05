// controllers/folderController.js
const Folder = require("../models/Folder");
const sequelize = require("../config/db"); // Correct import

// Create a folder or subfolder
exports.createFolder = async (req, res) => {
    const { name, parentId } = req.body;
    const { userId } = req.user;

    try {
        // Check if parentId is valid if provided
        if (parentId) {
            const parentFolder = await Folder.findOne({ where: { id: parentId, UserId: userId } });
            if (!parentFolder) {
                return res.status(404).json({ error: "Parent folder not found." });
            }
        }

        const folder = await Folder.create({ name, parentId, UserId: userId });
        res.status(201).json(folder);
    } catch (error) {
        res.status(500).json({ error: "Error creating folder." });
    }
};

// Get all folders and subfolders
exports.getFolders = async (req, res) => {
    const { userId } = req.user;

    try {
        // Fetch all folders for the user
        const folders = await Folder.findAll({
            where: { UserId: userId, parentId: null },
        });

        res.json(folders);
    } catch (error) {
        console.error('Error retrieving folders:', error);
        res.status(500).json({ error: "Error retrieving folders." });
    }
};

// Get folders with a specific parentId
exports.getSubfolders = async (req, res) => {
    const { parentId } = req.params;
    const { userId } = req.user;

    try {
        const folders = await Folder.findAll({
            where: { UserId: userId, parentId: parentId },
            include: [{ model: Folder, as: "subfolders" }],
        });
        res.json(folders);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving subfolders." });
    }
};

// Update a folder
exports.updateFolder = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { userId } = req.user;

    try {
        const folder = await Folder.findOne({ where: { id, UserId: userId } });

        if (!folder) {
            return res.status(404).json({ error: "Folder not found." });
        }

        folder.name = name;
        await folder.save();

        res.json(folder);
    } catch (error) {
        res.status(500).json({ error: "Error updating folder." });
    }
};

// Delete a folder and its subfolders
exports.deleteFolder = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.user;

    try {
        // Find the folder to be deleted, ensuring it belongs to the user
        const folder = await Folder.findOne({ where: { id, UserId: userId } });

        if (!folder) {
            return res.status(404).json({ error: "Folder not found." });
        }

        // Use a transaction to ensure that the deletion is atomic
        await sequelize.transaction(async (transaction) => {
            // Delete the folder, the beforeDestroy hook will take care of subfolders
            await folder.destroy({ transaction });
        });

        res.json({ message: "Folder and its subfolders deleted successfully." });
    } catch (error) {
        console.error('Error deleting folder:', error);
        res.status(500).json({ error: "Error deleting folder." });
    }
};
