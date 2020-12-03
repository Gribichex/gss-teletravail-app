const express = require("express");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

// Register
router.post(
  "/auth/register",
  // middleware that handles the registration process
  authMiddleware.register,
  // json handler
  authMiddleware.signJWTForUser
);

// Sign in
router.post(
  "/auth/login",
  // middleware that handles the sign in process
  authMiddleware.signIn,
  // json handler
  authMiddleware.signJWTForUser
);

// Check authentification

router.get("/auth/check", authMiddleware.requireJWT, (req, res) => {
  res.status(200).send({ auth: true });
});

// Logout

router.get(
  "/auth/logout",
  function (req, res) {
    res
    .clearCookie('token')
    .status(200)
    .json({
        message: 'You have logged out'
    })

  }
  
);

module.exports = router;
