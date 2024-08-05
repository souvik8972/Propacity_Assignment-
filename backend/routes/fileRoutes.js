// routes/fileRoutes.js
const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");
const authenticate = require("../middleware/authenticate");

// const multerMiddleware = require("../middleware/multer")

const multer=require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });





router.post("/upload", authenticate,upload.single("file"), fileController.uploadFile);
router.get("/folder/:folderId", authenticate, fileController.getFilesInFolder);
router.get("/", authenticate, fileController.getFiles);
router.delete("/:id", authenticate, fileController.deleteFile);
router.put("/:id", authenticate, fileController.editFile);

module.exports = router;
