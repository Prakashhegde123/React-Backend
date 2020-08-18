const express = require("express");
const router = express.Router();
const signUp_Controller = require("../Controller/SignUpController");
const employee = require("../models/SignUpModels");

process.env.SECRET_KEY = "secret";

router.get("/", signUp_Controller.index);
router.post("/show", signUp_Controller.show);
router.post("/login", signUp_Controller.login);
router.post("/register", signUp_Controller.register);
router.post("/save", signUp_Controller.store);

router.put("/update-user", (req, res) => {
  const email = req.body.email;

  const updateUser = {
    email: req.body.email,
    password: req.body.password,
  };

  employee.findOneAndUpdate(
    { email },
    updateUser,
    { new: true },
    (err, user) => {
      if (err) {
        res.status(500).json({ msg: "server error", err });
      } else if (!user) {
        res.status(400).json({ msg: "user does not exist" });
      } else {
        res.status(200).json({ msg: "user updated", user });
      }
    }
  );
});

router.delete("/:email/delete", (req, res) => {
  const email = req.params.email;
  employee.findOneAndDelete({ email }, (err, user) => {
    if (err) {
      res.status(500).json({ msg: "server error", err });
    } else if (!user) {
      res.status(400).json({ msg: "user does not exist" });
    } else {
      res.status(200).json({ msg: "user deleted", user });
    }
  });
});

module.exports = router;
