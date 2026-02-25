const Submission = require("../models/Submission");

exports.createSubmission = async (req, res) => {
  try {
    const submission = new Submission(req.body);
    await submission.save();
    res.status(201).json({
      message: "Submission sent successfully. Awaiting admin approval.",
      submission,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getApprovedSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ status: "approved" });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPendingSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ status: "pending" });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.approveSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );
    res.json({ message: "Submission approved", submission });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.rejectSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );
    res.json({ message: "Submission rejected", submission });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};