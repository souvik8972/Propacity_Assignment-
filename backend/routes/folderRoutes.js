// routes/folderRoutes.js
const express = require("express");
const router = express.Router();
const folderController = require("../controllers/folderController");
const authenticate = require("../middleware/authenticate");

router.post("/", authenticate, folderController.createFolder);
router.get("/", authenticate, folderController.getFolders);
router.get("/:parentId", authenticate, folderController.getSubfolders); // Get subfolders
router.put("/:id", authenticate, folderController.updateFolder);
router.delete("/:id", authenticate, folderController.deleteFolder);

module.exports = router;
