const User = require('../api/models/User');
const { verifyToken } = require('../utils/jwt');


const isAuth = async (req,res,next) => {

    try{
    //devolvemos el último elemento con el metodo pop()
    const token = req.headers.authorization.split(' ').pop();

    const tokenVerified = await verifyToken(token);
    console.log(tokenVerified);   
     
    if(tokenVerified._id){
        next();
    }

    }catch(err){
        return res.status(401).json({message: "Access denied", error: err.message});
    }

}

module.exports = {isAuth};