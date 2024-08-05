// middleware/authenticate.js
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    const authHeader = req.headers["authorization"];


    if (!authHeader) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    // Check if the token starts with "Bearer " and extract the token part
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7, authHeader.length) : null;

    if (!token) {
        return res.status(401).json({ error: "Access denied. Invalid token format." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded payload to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ error: "Invalid token." });
    }
};

module.exports = authenticate;
