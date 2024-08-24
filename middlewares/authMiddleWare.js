import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.header("authorization");
    if(!token){
        return res
            .status(401)
            .send({message: "Access denied. No token provided."})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error){
    console.error(error);
    return res.status(401).send({message:"invalid token."})
    }

}

