import mongoose from "mongoose";

const ConnectToMongo=async()=>{
    // console.log(process.env.MONGO_DB_URL)
    try{
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log('Mongo_DB is connected!');
    }catch(error){
     console.log('something error:',error);
    }
}

export default ConnectToMongo;