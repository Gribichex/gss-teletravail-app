const express = require("express");
const authMiddleware = require("../middleware/auth");
const router = express.Router();
const User = require("../model/user");

// Helper function to handle errors
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "An internal server error occurred" });
};

// Requests Targeting all Users from a specified department
router.get("/api/users", authMiddleware.requireJWT, async (req, res) => {
  try {
    const department = req.query.department;
    const userEmail = req.user.email;
    const foundUsers = await User.find({ department: department });
    res.json({ userEmail: userEmail, foundUsers: foundUsers });
  } catch (err) {
    handleError(res, err);
  }
});

router.post("/api/users", authMiddleware.requireJWT, async (req, res) => {
  try {
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.mail,
      department: req.body.department,
      hash: "",
      nonWorkingDays: [],
    });
    await newUser.save();
    res.status(201).json({ message: "Successfully created a new user" });
  } catch (err) {
    if (err.code === 11000) { // Duplicate key error
      res.status(409).json({ error: "User with this email already exists" });
    } else {
      handleError(res, err);
    }
  }
});

router.delete("/api/users", authMiddleware.requireJWT, async (req, res) => {
  try {
    const department = req.query.department;
    const result = await User.deleteMany({ department: department });
    if (result.deletedCount > 0) {
      res.json({ message: `Successfully deleted ${result.deletedCount} users` });
    } else {
      res.status(404).json({ message: "No users found to delete" });
    }
  } catch (err) {
    handleError(res, err);
  }
});

// Requests Targeting A Specific User
router.get("/api/users/loggeduser", authMiddleware.requireJWT, async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.user.email });
    if (foundUser) {
      res.json(foundUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    handleError(res, err);
  }
});

router.get("/api/users/:email", authMiddleware.requireJWT, async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.params.email });
    if (foundUser) {
      res.json(foundUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    handleError(res, err);
  }
});

router.get("/api/users/status/:email", async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.params.email });
    res.json({ userExist: !!foundUser });
  } catch (err) {
    handleError(res, err);
  }
});

router.put("/api/users/:email", authMiddleware.requireJWT, async (req, res) => {
  try {
    const result = await User.replaceOne(
      { email: req.params.email },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.params.email,
        department: req.body.department,
        nonWorkingDays: req.body.nonWorkingDays,
      },
      { overwrite: true }
    );
    if (result.modifiedCount > 0) {
      res.json({ message: "Successfully updated user information" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    handleError(res, err);
  }
});

router.patch("/api/users/:email", authMiddleware.requireJWT, async (req, res) => {
  try {
    const result = await User.updateOne({ email: req.params.email }, { $set: req.body });
    if (result.modifiedCount > 0) {
      res.json({ message: "Successfully updated user" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    handleError(res, err);
  }
});

router.delete("/api/users/:email", authMiddleware.requireJWT, async (req, res) => {
  try {
    const result = await User.deleteOne({ email: req.params.email });
    if (result.deletedCount > 0) {
      res.json({ message: "Successfully deleted the user" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    handleError(res, err);
  }
});

module.exports = router;