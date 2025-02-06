const bcryptjs = require("bcryptjs");
const Auth = require("../models/auth.model");

exports.registerUser = async (req, res) => {
  try {
    // Hash password before saving
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    // Create user with hashed password
    const data = await Auth.create(req.body);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const data = await Auth.findOne({ email: req.body.email });

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcryptjs.compare(
      req.body.password,
      data.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
