
const { deleteFile } = require('../../utils/deleteFile');
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
            img: req.body.img,          
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
       if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
        if(user.image && user.image.url){
            await deleteFile(user.image.url);
        }
        await User.findByIdAndDelete(id);
        return res.status(200).json({message: "User has been deleted"});
        
    }catch(err){
         return next(err);
    }
}

const updateUser = async (req, res,next) => {
    try{
    const {id} = req.params;
    const user = req.body;    
    const userUpdated = await User.findByIdAndUpdate(id, user, {new:true});
    return res.status(200).json(userUpdated);
    }catch(error){
        return next(error);
    }
}

module.exports = {getUser, getUsers, postUser, deleteUser, updateUser};