const cloudinary = require("cloudinary").v2;

const deleteFile = (url) => {
   try{
        const array = url.split('/');
    const name = array.at(-1).split(".")[0];
    let public_id = `${array.at(-2)}/${name}`;

    cloudinary.uploader.destroy(public_id, () =>{
        console.log("Deleted Successfully!");
       
    })
}catch(err){
    console.error('Error deleting image', err);
}
}

module.exports = {deleteFile}