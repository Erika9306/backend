const User = require('../models/User');

const getUser = async (req, res,next)=>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        return res(200).json(user);
        
    }catch(err){
        return next(err);
    }
}
const getUsers =async (req, res, next) =>{
    try{
        const users = await User.find();
        return res.status(200).json(users);

    }catch{error}{
       return next(error);
    }
}

const postUser = async (req, res,next) => {
    try{

        const newUser = new User({
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            courses: req.body.courses
        });
         
        const createdUser = await newUser.save();
        return res.status(201).json(createdUser);

    }catch(err){
       return next(err);
    }

}

const deleteUser = async (req, res,next) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        
        if(user._id != user || user.role != 'admin'){
            return res.status(403).json({messsage: "You are not allowed to realize this action"});
        }
        await User.findByIdAndDelete(id);
        return res(200).json({message: "User has been deleted"});
        
    }catch(err){
         return next(err);
    }
}

const updateUser = async (req, res,next) => {
    try{
    const {id} = req.body;
    const userModify = new User(req.body);
    userModify._id = id;
    const userUpdated = await User.findByIdAndUpdate(id, userModify, {new:true});
    return res.status(200).json(userUpdated);
    }catch(error){
        return next(error);
    }
}

module.exports = {getUser, getUsers, postUser, deleteUser, updateUser};