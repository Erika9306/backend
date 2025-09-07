
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {generateToken} = require('../../utils/jwt');
const Course = require('../models/Course');


    const login = async (req,res) => {
        try{
            const {email, password} = req.body;
            console.log("datos recibidos en login", {email, password});
           
            if(!email || !password){
                return res.status(404).json('Enter your email or password correctly');
            }
            const user = await User.findOne({email});
            console.log("User has been found", user);

            if(!user){
                return res.status(404).json('User not found', user);
            }
            
            // comprobamos la contraseña del usuario
            const isMatch = bcrypt.compareSync(String(password), String (user.password));
            if(!isMatch){
                return res.status(400).json('Wrong password');
            }
            const token = generateToken(user);
            return res.status(200).json({
                message:" Logged in!",
                token})

        }catch(err){
                       
            return res.status(400).json({message: "Something went wrong while login", error: err.message});
        }
        
    }


    const allowDeleteUser = async (req, res, next) => {
        try{
            const user = req.user;
            const {id} = req.params;
            const userDb = await User.findById(user._id);
            if(!userDb){
                return res.status(404).send({message:'User not Found'});
            }
            //para poder borrar cualquier usuario
            if(userDb.role == 'admin'){
                next();
            }

            //solo puede borrar lo suyo
            if(user._id !== id){
                return res.status(403).send({message: 'You are not allow to delete any account except yours'});
            }

            next();
        }catch(err){
            next(err);
        }
    }

    const allowToAdminCourse = async (req, res, next) => {
          try{
            const user = req.user;
            const course = req.params.id;            
            const courseDb = await Course.findById(course);
            if(!courseDb){
                return res.status(404).send({message:'Course not Found'});
            }
            //para poder borrar cualquier usuario
            if(user.role !== 'admin' ){
               return res.status(403).send({message:'Do not have enough permissions'});
            }
           
            next();
        }catch(err){
            next(err);
        }

    }

    
    module.exports = { login, allowDeleteUser, allowToAdminCourse}