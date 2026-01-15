import { User } from "../models/user.model.js";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  const userSchema = z
    .object({
      firstName: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters"),
      lastName: z
        .string()
        .trim()
        .min(2, "Last name must be at least 2 characters"),
      email: z.string().trim().email("Invalid email").toLowerCase(),
      password: z.string().min(8, "Password must be at least 8 characters"),
    })
    .strict();
  try {
    // ✅ validate request body
    const validatedData = userSchema.safeParse(req.body);

    if (!validatedData.success) {
      return res.status(400).json({
        errors: validatedData.error.issues.map((e) => ({
          field: e.path[0],
          message: e.message,
        })),
      });
    }

    const { firstName, lastName, email, password } = validatedData.data;

    // ✅ check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errors: "User already exists" });
    }

    // ✅ hash only after validation
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Signup succeeded", newUser });
  } catch (error) {
    console.log("Error in signup", error);
    res.status(500).json({ errors: "Error in signup", error: error.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // ✅ if user not found
    if (!user) {
      return res.status(404).json({ errors: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    // ✅ if password wrong
    if (!isPasswordValid) {
      return res.status(401).json({ errors: "Invalid credentials" });
    }

    // ✅ SUCCESS RESPONSE (this was missing)
    return res.status(200).json({
      message: "Login success",
      user,
    });
  } catch (error) {
    return res.status(500).json({ errors: "Error in login", error: error.message });
  }
};
