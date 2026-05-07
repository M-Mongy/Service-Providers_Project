const User = require("./../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");


//sign up controller
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // token
    const token = generateToken(user);

    res.status(201).json({
      message: "User created successfully",
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    console.log(err);
  }
};




//login
const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // token
    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    console.log(err);
  }
};


module.exports = {
  signup,
  login,
};