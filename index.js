require('dotenv').config();
const express = require("express");
const app = express();
const {connectDB} = require('./src/config/db');
const {connectCloudinary}= require('./src/config/cloudinary');

const userRouter = require('./src/api/routes/user');
const courseRouter = require('./src/api/routes/course');
const PORT =3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

connectDB();
connectCloudinary();

app.use('/api/v1/user', userRouter );
app.use('/api/v1/course', courseRouter);





app.use((req, res, next) => {
    const err = new Error('Route not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({message: err.message || "Unexpected error"});
}); 


app.listen(PORT, () => {
    console.log(`Listening at: http://localhost:${PORT}`);
})
