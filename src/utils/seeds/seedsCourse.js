const mongoose = require('mongoose');
const Course = require("../../api/models/Course");
const courseData = require('../../data/couseSeeds');


const thowSeed = async()=>{
  try{
    await mongoose.connect("mongodb+srv://ErikaDataBase:yJI1eQoUTlRxVyKT5qygMOevHgcpU-lNz7wrsyP6KWo@mycluster.zdwx53j.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster"
          );
          //borramos si hay cursos previos
        await Course.collection.drop();
        console.log('Courses have been deleted');


        //insertamos cursos del seed
        await Course.insertMany(courseData);
        console.log('Seed courses have been inserted');

        await mongoose.disconnect();
        console.log('Disconnected from DB');
        
  }catch(err){
    console.log('Could not proccess the seed insertion');
    
  }


  }

  thowSeed();