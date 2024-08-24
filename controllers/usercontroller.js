import {
    signupPersistence,
    findUserByEmail,
    loginPersistence,
  } from "../persistence/userPersistence.js";
  import jwt from "jsonwebtoken";
  
  export const signup = async (req, res) => {
    try {
      const existingUser = await findUserByEmail(req.body.email);
      if (existingUser)
        return res
          .status(409)
          .send({ message: "User with the given email already exists" });
    
      const user = await signupPersistence(req.body);
      res.status(201).send({ email: user.email });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await loginPersistence(email, password);
      if (!user)
        return res.status(401).send({ message: "Invalid Email or Password" });

      const token = generateAuthToken(user);
      res.status(200).send({ token });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  
  const generateAuthToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  };
  