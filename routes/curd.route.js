const express = require("express");
const router = express.Router();

const {
  createCurd,
  getCurds,
  deleteCurd,
  updateCurd,
  testGet,
  registerUser,
  loginUser,
} = require("../controllers/curd.controller");

router.post("/createCurd", createCurd);
router.get("/getCurds", getCurds);
router.delete("/deleteCurd/:id", deleteCurd);
router.put("/updateCurd/:id", updateCurd);
router.get("/", testGet);

//auth
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
