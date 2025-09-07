
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema (
    { 
        email: {type:String, required: true, unique: true,  maxLength: 30, trim: true},
        password: {type: String, required: true, minLength: [3, "Password must have at least 3 characters"], maxLength: 30, trim: true},
        role: {type:String, enum: ["admin","user"], default:"user"},
        img: {url: String, required: true},
        courses: [{type: mongoose.Types.ObjectId, ref: "Course"}]
},
{
    timestamps: true,
}
);

//encriptamos la contraseña del usuario

userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;