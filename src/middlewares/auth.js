const User = require('../api/models/User');
const { verifyToken } = require('../utils/jwt');


const isAuth = async (req,res,next) => {

    try{
    //devolvemos el último elemento con el metodo pop()
    const token = req.headers.authorization.split(' ').pop();
    if(!token){
        return res.status(401).send({message: 'Token not provided'});
    }   

    const decode =  verifyToken(token);     
    const {_id, role} = decode;
    req.user = {_id, role};
        next();
    
    }catch(err){
        return res.status(401).json({message: "Access denied", error: err.message});
    }

}

module.exports = {isAuth};