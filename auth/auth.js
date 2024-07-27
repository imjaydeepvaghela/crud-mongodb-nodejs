const User = require("../models/userModel");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const jwtSecret = "mySecretJwtTokenString";

// 447a404cee8bbfcd58d5855a539c5881705f99966025ffd9835ced96eaf3fb8091f84f

exports.register = async (req, res, next) => {
  const { username, password } = req.body;

  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    bcrypt.hash(password, 10).then(async (hash) => {
      await User.create({
        username,
        password: hash,
      })
        .then((user) => {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, username, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          res.status(201).json({
            message: "User successfully created",
            user: user._id,
          });
        })
        .catch((error) =>
          res.status(400).json({
            message: "User not successful created",
            error: error.message,
          })
        );
    });
  } catch (error) {
    res.status(401).json({
      message: "User not created",
      error: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body
  // Check if username and password is provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    })
  }
  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      })
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, username, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          res.status(201).json({
            message: "User successfully Logged in",
            user: user._id,
          });
        }
        else {
          res.status(400).json({ message: "Login not succesful" })
        }  
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
}

exports.update = async (req, res, next) => {
  const { role, id } = req.body;
  if (role && id) {
    const validRoles = ["admin", "basic"];
    if (validRoles.includes(role.toLowerCase())) {
      try {
        const user = await User.findById(id);
        if (user.role.toLowerCase() !== role.toLowerCase()) {
          user.role = role.toLowerCase();
          await user.save();
          res.status(201).json({ message: "Update successful", user });
        } else {
          res.status(400).json({ message: `User is already a ${role}` });
        }
      } catch (error) {
        res.status(400).json({ message: "An error occurred", error: error.message });
      }
    } else {
      res.status(400).json({ message: "Invalid role. Role must be either 'admin' or 'basic'" });
    }
  } else {
    res.status(400).json({ message: "Role and ID must be provided" });
  }
}

exports.deleteUser = async (req, res, next) => {
  const { id } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.deleteOne({ _id: id });
    res.status(201).json({ message: "User successfully deleted", user });
  } catch (error) {
    res.status(400).json({ message: "An error occurred", error: error.message });
  }
};
