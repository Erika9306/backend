const mongoose = require('mongoose');

const connectDB = async () => {
    try{

        await mongoose.connect(process.env.DB_URL);
        console.log(' Connected to MongoDB!');

    }catch(err){
        console.log('Ups, something wrong to connect with MongoDB');
    }
}


module.exports = {connectDB};