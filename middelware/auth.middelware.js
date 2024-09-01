const jwt = require("jsonwebtoken");
const { UserModel } = require("../schema/user.schema");
const auth = async (req,res,next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if(!token) return res.status(401).json({message : "failed , user token missing"});
    const verifyToken = jwt.decode(token , process.env.SECRET_KEY );
    if(!verifyToken) return res.status(401).json({message : "failed , token mis-matched."});
    try{
            const findUser = await UserModel.findById({_id : verifyToken._id}).select("-password -__v");
            req.token = token;
            req.rootUser = findUser;
            req.rootId = findUser._id;
            next();
    }
    catch (err) {
        return res.status(500).json({ message: `someting went wrong`, error: err });
      }
};
module.exports = {auth}