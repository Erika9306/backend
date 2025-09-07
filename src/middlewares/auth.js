const User = require('../api/models/User');
const { verifyToken } = require('../utils/jwt');


const isAuth = async (req,res,next) => {

    try{
    //devolvemos el último elemento con el metodo pop() 
    const token = req.headers.authorization.split(' ').pop();
    if(!token){
        return res.status(401).send({message: 'Token not provided'});
    }   

    const data =  verifyToken(token); 
    const user = await User.findById(data._id);
    if(!user){
        return res.status(403).send({message: "Unauthorized pass"});
    }
    //borramos contraseña para no mandarla al fonrted ni usarla en ningun controlador
    delete user.password;
    req.user = user;
    next();
    
    }catch(err){
        return res.status(401).json({message: "Access denied", error: err.message});
    }

}

module.exports = {isAuth};