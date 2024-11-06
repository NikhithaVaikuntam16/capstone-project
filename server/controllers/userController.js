import bcrypt from "bcrypt";
import { getUserByEmail, createUser } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and Password are required" });
  }
  try {
    const user = await getUserByEmail(email);
    if (user) {
      res.status(400).json({ error: "This Email already exists. Please try logging in." });
    } else {
      const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
      await createUser(email, hash);
      res.status(201).json({ message: "User registered succesfully" });
    }
  } catch (err) {
    res.status(500).json({error: "Something went wrong"});
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and Password are required" });
  }
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(400).json({ message: "Invalid credentials. Please enter the correct email or password"});
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const payload = {id : user.id};
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({ message: "Logged in successfully", token });
      } else {
        res.status(400).json({ message: "Invalid credentials. Please enter the correct email or password"});
      }
    }
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
