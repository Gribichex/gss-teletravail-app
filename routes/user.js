const express = require("express");
const authMiddleware = require("../middleware/auth");
const router = express.Router();
const User = require("../model/user");

///////////////////////////////////Requests Targetting all Users from a specified department/////////////////////////////////////////////////////////
router.get("/api/users",authMiddleware.requireJWT, function (req, res) {
  let department = req.query.department;
  let userEmail  = req.user.email;

  User.find({ department: department }, function (err, foundUsers) {
    if (!err) {
      res.send({userEmail:userEmail, foundUsers:foundUsers});
    } else {
      res.send(err);
    }
  });
});

///!!!!!!!!!!!!!!!!!!!!A gerer pour l'authentification
router.post("/api/users", authMiddleware.requireJWT, function (req, res) {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.mail,
    department: req.body.department,
    hash: "",
    nonWorkingDays: [],
  });

  newUser.save(function (err) {
    if (!err) {
      res.send("Successfully created a new user.");
    } else {
      res.send(err);
    }
  });
});

///!!!!!!!!!!!!!!!!!!!!Dangeureux

router.delete("/api/users", authMiddleware.requireJWT, function (req, res) {
  let department = req.query.department;

  User.deleteMany({ department: department }, function (err) {
    if (!err) {
      res.send("Successfully deleted all users.");
    } else {
      res.send(err);
    }
  });
});

////////////////////////////////Requests Targetting A Specific User/////////////////////////////

router.get("/api/users/loggeduser",authMiddleware.requireJWT, function (req, res) {
  
  User.findOne({ email: req.user.email }, function (err, foundUser) {
    
    if (foundUser) {
      res.send(foundUser);
    } else {
      res.send([]);
      console.log("No user matching that e-mail was found.");
    }
  });
});


router.get("/api/users/:email",authMiddleware.requireJWT, function (req, res) {
  
  User.findOne({ email: req.params.email }, function (err, foundUser) {
    
    if (foundUser) {
      res.send(foundUser);
    } else {
      res.send([]);
      console.log("No user matching that e-mail was found.");
    }
  });
});

router.get("/api/users/status/:email", function (req, res) {
  
  User.findOne({ email: req.params.email }, function (err, foundUser) {
    
    if (foundUser) {
      res.send({ userExist: true });
    } else {
      res.send({ userExist: false });
      console.log("No user matching that e-mail was found.");
    }
  });
});




router.put("/api/users/:email", authMiddleware.requireJWT, function (req, res) {
  console.log(req.body);

  User.replaceOne(
    { mail: req.params.email },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.params.email,
      department: req.body.department,
      nonWorkingDays: req.body.nonWorkingDays,
    },
    { overwrite: true },

    function (err) {
      if (!err) {
        res.send(
          "Successfully replaced the informations of the selected user."
        );
      } else {
        console.log(err);
      }
    }
  );
});

router.patch(
  "/api/users/:email",
  authMiddleware.requireJWT,
  function (req, res) {
    User.update(
      { email: req.params.email },
      { $set: req.body },
      function (err) {
        if (!err) {
          res.send("Successfully updated user.");
        } else {
          res.send(err);
        }
      }
    );
  }
);

router.delete(
  "/api/users/:email",
  authMiddleware.requireJWT,
  function (req, res) {
    User.deleteOne({ mail: req.params.email }, function (err) {
      if (!err) {
        res.send("Successfully deleted the corresponding user.");
      } else {
        res.send(err);
      }
    });
  }
);

module.exports = router;
