const mongoose =require('mongoose');
const url = `mongodb://0.0.0.0:27017/userdb`

const connection = async ()=>{
try{
    await mongoose.connect(url)
    console.log('Database connection is Successfully')
}
catch(err){
    console.log('Error while connecting to the database',err);

}
}
module.exports = connection;
    
