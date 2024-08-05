// models/File.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Folder = require("./Folder");

const File = sequelize.define("File", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING(512),
        allowNull: false,
    },
    
    size: {
        type: DataTypes.STRING, // Adjusted to INTEGER if you want to store file size in bytes
        allowNull: false,
    },
});

// Associations
File.belongsTo(User, { foreignKey: { allowNull: false } });
User.hasMany(File);

Folder.hasMany(File, {
  foreignKey: 'FolderId',
  onDelete: 'CASCADE',  // Enable cascading delete
});

File.belongsTo(Folder, {
  foreignKey: 'FolderId',
});

module.exports = File;
