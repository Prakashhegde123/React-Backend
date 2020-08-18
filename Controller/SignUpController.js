const { response } = require("express");

const employee = require("../models/SignUpModels");

//Showa the list
const index = (req, res, next) => {
  employee
    .find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured",
      });
    });
};

const show = (req, res, next) => {
  let employeeid = req.body.employeeid;
  employee
    .findById(employeeid)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured",
      });
    });
};

const store = (req, res) => {
  console.log(Object.keys(req), Object.keys(req.body));
  let Emp = new employee({
    name: req.body.name,
    email: req.body.mail,
    password: req.body.pass,
  });
  Emp.save()
    .then((response) => {
      res.json({
        message: "Employee added sucessfully",
        user: Emp,
      });
    })
    .catch((response) => {
      res.json({
        message: "An error occured",
      });
    });
};

const login = (req, res) => {
  employee
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        if (user.password === req.body.password) {
          return { user: user };
        }
        return { error: "password mismatch" };
      }
      return { error: "no user found" };
    })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.send(error);
    });
};

const register = (req, res) => {
  employee
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        return { error: "user already exists" };
      } else {
        employee
          .create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          })
          .then((users) => {
            res.json(users);
          })
          .catch((error) => {
            return { error };
          });
      }
    })
    .catch((error) => {
      res.send(error);
    });
};

module.exports = {
  index,
  show,
  login,
  store,
  register,
};
