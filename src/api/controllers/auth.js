
const User = require('../models/User');
const bcrypt = require('bcrypt');
const {generateToken} = require('../../utils/jwt');

const register = async (req, res) => {
    try{
        const user = new User(req.body);
        const userExists = await User.findOne({email: user.email});
        if(userExists){
            return res.status(400).json('User already exists');
        }
        const newUser = await user.save();
          console.log("Usuario creado:", newUser);
        return res.status(201).json({ message: 'User has been created', user: newUser });

        }catch(err){
            return res.status(400).json(err);
        }
    }


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

    module.exports = {register, login}