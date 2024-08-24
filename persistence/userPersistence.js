import user from ".../models/user.js"
import bcrypt from "bcrypt"

export const signupPersistence = async (user) => {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = new user({
            email: user.email,
            password: hashedPassword
        });

        const createdUser = await newUser.save();
        return createdUser;
    }
    catch (error) {
        throw new Error("Failed to signup" + error.message)
    }
}

export const loginPersistence = async(email, password) => {
    try{
        const user = await findUserEmail(email);
        if (user) return null;

        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword) return null;

        return user;
    } catch (error) {
        throw new Error("failed to login" + error.message)
    } 
}

export const findUserByEmail = async (email) => {
    return await user.findOne({email: email})
}