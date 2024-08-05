// models/Folder.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Folder = sequelize.define("Folder", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Folders', // Make sure this matches your table name
            key: 'id',
        },
    },
});

// Association with User model
Folder.belongsTo(User, { foreignKey: 'UserId', onDelete: 'CASCADE' });
User.hasMany(Folder, { foreignKey: 'UserId', onDelete: 'CASCADE' });

// Self-referential association
Folder.hasMany(Folder, { as: "subfolders", foreignKey: "parentId" });
Folder.belongsTo(Folder, { as: "parent", foreignKey: "parentId" });

// Hook to delete subfolders when a folder is deleted
Folder.addHook('beforeDestroy', async (folder, options) => {
    try {
        // Find all subfolders recursively
        const subfolders = await Folder.findAll({ where: { parentId: folder.id } });

        // Delete each subfolder recursively
        for (const subfolder of subfolders) {
            await subfolder.destroy({ transaction: options.transaction });
        }
    } catch (error) {
        throw new Error("Error deleting subfolders: " + error.message);
    }
});

module.exports = Folder;
