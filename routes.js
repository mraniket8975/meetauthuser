const routes = require("express").Router();
const usermodel = require("./user");
const cors = require('cors')
const { v4: uuid4 } = require("uuid");
const express = require("express");
const e = require("express");
routes.use(express.json());
routes.use(cors())

// REGISTER ROUTE

routes.post("/register", async (req, resp) => {
  console.log(req.body)
  let find = await usermodel.findOne({ email: req.body.email });
  if (find) {
    resp.send({ error: "user alredy exist" });
  } else {
    req.body.OTP = Math.floor(Math.random() * 999999);
    req.body.uuid = uuid4();
    req.body.varified = false;
    let userID = `${uuid4()}${Date.now()}${uuid4()}`;
    req.body.userID = userID;
    console.log(req.body);
    let result = await usermodel(req.body);
    let output = await result.save();
    if (output) {
      output["password"] = "";
      resp.send(output);
    } else {
      resp.send({ error: "somting went wrong plese try  again" });
    }
  }
});

// LOGIN ROUTE

routes.post("/login", async (req, resp) => {
  let result = await usermodel.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (result) {
    let OTP = Math.floor(Math.random() * 999999);
    const doc = await usermodel.findOneAndUpdate(
      { email: result.email },
      {
        $set: { OTP: OTP },
      }
    );
    doc.password = "";
    resp.send(doc);
  } else {
    resp.send({ error: "user not found" });
  }
});

// OTP VARIFIACATION ROUTE

routes.post("/otpvarification", async (req, resp) => {
  let result = await usermodel.findOne({ userID: req.body.userID });
  if (result) {
    if (result.OTP == req.body.OTP) {
      resp.send({ message: "varification successfull" });
    } else {
      resp.send({ error: "plese provide a correct otp" });
    }
  } else {
    resp.send({ error: "something went wrong" });
  }
});

// CHANGE PASSWORD ROUTE

routes.post("/changepassword", async (req, resp) => {
  const doc = await usermodel.findOneAndUpdate(
    { userID: req.body.userId },
    {
      $set: { password: req.body.password },
    }
  );
  if (doc) {
    resp.send({ message: "password reset successfull" });
  } else {
    resp.send({ error: "somthing went wrong please try after some time" });
  }
});

// SENDING OTP

routes.post("/sendotp", async (req, resp) => {
  if (req.body) {
    let OTP = Math.floor(Math.random() * 999999);
    const doc = await usermodel.findOneAndUpdate(
      { userID: req.body.userID },
      {
        $set: { OTP: OTP },
      }
    );
    doc.OTP = OTP;
    resp.send({ OTP: doc["OTP"] });
  } else {
    resp.send({ error: "somthing went wrong" });
  }
});

module.exports = routes;
