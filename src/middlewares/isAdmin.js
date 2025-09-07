const User = require('../api/models/User');


const isAdmin = (role) => async (req,res,next) =>{
    try{
    const user = req.user;
    if(!user){
        return res.status(401).send({message:'User not found'});
    }
    //si id está dentro del token, hacemos una consulta a BBDD para obtener el rol
    const userExists = await User.findById(user._id);
    if(!userExists){
        return res.status(404).send({message:'User not found'});
    }

    if(userExists.role !== role){
        return res.status(403).send({message: 'Unauthorized'});
    }
    next();
    
}catch(error){
    next(error);
}   
}

module.exports = {isAdmin}