const { UserModel } = require("../schema/user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userGet = async (req,res)=>{
    try{
       
      
        return res.status(200).json({message : "success" , data : req.rootUser});
    }
    catch (err) {
        return res.status(500).json({ message: `someting went wrong`, error: err });
      }
};

const userLog = async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password) return  res.status(400).json({message : "failed , email and password is required*"});

    try{
        const findUser = await UserModel.findOne({email : email});
        if(!findUser) return res.status(404).json({message : "failed , user not found"});
        const verrifyPassword = await bcrypt.compare(password , findUser.password);
        if(!verrifyPassword) return  res.status(401).json({message : "failed , user credintials did't matched."});
        const token = jwt.sign({_id : findUser._id } , process.env.SECRET_KEY , {expiresIn : "30000s"})
        return res.status(200).json({message : "success" , token , data : { id : findUser._id,  email : findUser.email}});
    }
    catch (err) {
        return res.status(500).json({ message: `someting went wrong`, error: err });
    }

};

const userPost = async (req,res)=>{
    let {name,email,password} = req.body;
    let errors = [];
    Object.entries(req.body).map(([key,item])=>{ if(!item)  errors.push(`${key} is required*`) });
    if(errors.length>0)  return res.status(400).json({message : errors})
    try{
        const findUser = await UserModel.findOne({email : email});
        if(findUser) return res.status(404).json({message : "failed , email already exist"});
        password = await bcrypt.hash(password , 10);
        const newData = new UserModel({name,email,password});
        const saveData = await newData.save();
        const token = jwt.sign({_id : saveData._id } , process.env.SECRET_KEY , {expiresIn : "30000s"})
        return res.status(200).json({message : "success" , data : saveData,token});
    }
    catch (err) {
        return res.status(500).json({ message: `someting went wrong`, error: err });
      } 
};

const userPut = async (req,res)=>{
    const {name,email,password} = req.body;
    const {id} = req.params;
    Object.entries(req.body).map(([key,item])=>{ if(!item)  return res.status(400).json({message : `failed , ${key} is required*`})});
    try{
        const findUser = await UserModel.findOne({id : id});
        if(!findUser) return res.status(404).json({message : "failed , user doesn't exist"});

        if(password){
            password = bcrypt.hash(password , 10);
        };

        findUser.name = name;
        findUser.email = email;
        findUser.password = password;
        await findUser.save();
        return res.status(200).json({message : "success" , data : findUser});
    }
    catch (err) {
        return res.status(500).json({ message: `someting went wrong`, error: err });
      }
};

module.exports = { userGet, userPost, userPut, userLog };
