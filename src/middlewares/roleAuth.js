const User = require('../api/models/User');
const { verifyToken } = require('../utils/jwt');

const roleAuth = (role) => async (req,res,next) =>{
    try{ 
        const token = req.headers.authorization.split(' ').pop();
        const tokenVerified = await verifyToken(token);

        // id esta dentro del token, hacemos consulta a BBDD para obtener el rol
        const user = await User.findById(tokenVerified._id);


        //convertimos role en un array y probamos si tiene rol dentro
        if([].concat(role).includes(user.role)){
            next();
        }

    }catch(error){
        return res.status(400).json(error);

    }
}

module.exports = {roleAuth}