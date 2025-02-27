const express = require("express");
const router = express.Router();
const usermodel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register new users if they don't exist
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }
  try {
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await usermodel.create({ 
        name,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET);
    res.status(201).json({ user: createdUser, token });
  } catch (error) {
    res.status(400).json({message: "test "+error.message });
  }
});

// login users
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }
    try {
        const user = usermodel.findOne({email});
        if (!user) {
            return res.status(400).json({ message: "invalid username or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ message: "invalid username or password" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = router;
