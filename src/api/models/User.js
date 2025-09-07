
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema (
    { 
        email: {type:String, required: true, unique: true,  maxLength: 30, trim: true},
        password: {type: String, required: true, minLength: [3, "Password must have at least 3 characters"], maxLength: 30, trim: true},
        role: {type:String, enum: ["admin","user"], default:"user"},
        img: {type: String, required: true},
        courses: [{type: mongoose.Types.ObjectId, ref: "Course"}]
},
{
    timestamps: true,
}
);

//encriptamos la contraseña del usuario

userSchema.pre('save', async function(next){
    //comprobamos que no se está modificando la contraseña
    if(!this.isModified('password')) return next();
    
//hasheamos la contraseña y ponemos el número de rondas para encriptarla
    this.password = await bcrypt.hash(this.password, 10);
    next();
   
});

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;