import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "../db.js";
import dotenv from "dotenv";
dotenv.config();

export const register = (req, res) => {
  try {
    // console.log(req.body);
    
    if (!req.body.Username || !req.body.Password || !req.body.Confirm_Password)
      return res.status(400).json("Please fill all fields.");

    if (req.body.Password.length < 6 || req.body.Confirm_Password.length < 6)
      return res
        .status(400)
        .json("Password should contain more than 6 caracters.");

    if (req.body.Password !== req.body.Confirm_Password)
      return res.status(400).json("Passwords don't match.");
    //Check if user exists
    const q = "SELECT * FROM users WHERE  Username = ?";

    db.query(q, [req.body.Username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exists!");

      //Hash the password and create a user

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.Password, salt);

      const q = "INSERT INTO Users(`Username`,`Password`) VALUES (?)";
      const values = [req.body.Username, hash];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json("Database error :<br/>" + err);
        return res.status(200).json("User has been created.");
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = (req, res) => {
  try {

    if (!req.body.Username || !req.body.Password)
      return res.status(400).json("Please fill all fields.");

    if (req.body.Password.length < 6)
      return res
        .status(400)
        .json("Password should contain more than 6 caracters.");

    const q = "SELECT * FROM users WHERE Username = ? ";

    db.query(q, [req.body.Username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");

      //Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.Password,
        data[0].Password
      );

      if (!isPasswordCorrect)
        return res.status(400).json("Wrong username or password!");

        const accessToken = jwt.sign(
          {
              id: data[0].User_ID,
              isAdmin: data[0].Is_Admin,
          },
          process.env.JwT_SECRET,
              {expiresIn:"7d"}
          );
      const { Password, ...other } = data[0];

      res
        .cookie("access_token", accessToken, {
          httpOnly: true,
        })
        .status(200)
        .json(other);
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};
