const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables from .env file

// Construct the database connection string
const dbUrl = `postgres://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD)}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Initialize Sequelize with the connection string
const sequelize = new Sequelize(dbUrl, {
    dialect: "postgres", // Specify the database dialect
    logging: false, // Disable logging (optional)
});

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

module.exports = sequelize;
