import bcrypt from "bcrypt";
import { getUserByEmail, createUser } from '../models/userModel.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and Password are required" });
  }
  try {
    const user = await getUserByEmail(email);
    if (user) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
      await createUser(email, hash);
      res.status(201).json({ message: "User registered succesfully" });
    }
  } catch (err) {
    res.status(500).json({error: "Something went wrong"});
  }
}
