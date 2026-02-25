const express = require("express");
const router = express.Router();
const controller = require("../controllers/submissionController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.post("/", controller.createSubmission);
router.get("/", controller.getApprovedSubmissions);

router.get("/pending", protect, isAdmin, controller.getPendingSubmissions);
router.put("/approve/:id", protect, isAdmin, controller.approveSubmission);
router.put("/reject/:id", protect, isAdmin, controller.rejectSubmission);

module.exports = router;