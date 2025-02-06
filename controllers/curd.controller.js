const Model = require("../models/curd.model");
const bcryptjs = require("bcryptjs");
const Auth = require("../models/curd.model");

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

exports.testGet = async (req, res) => {
  try {
    res.status(200).json("test");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createCurd = async (req, res) => {
  try {
    const data = await Model.create(req.body);

    if (!data.description) {
      data.description = "";
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getCurds = async (req, res) => {
  try {
    const data = await Model.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteCurd = async (req, res) => {
  try {
    const data = await Model.findByIdAndDelete(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateCurd = async (req, res) => {
  try {
    const data = await Model.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
