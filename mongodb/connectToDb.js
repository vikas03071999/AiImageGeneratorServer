import mongoose from "mongoose";

const connectToDb = (url) => {
    mongoose.set('strictQuery',true);
    mongoose.connect(url)
    .then(()=> console.log("Connected to database"))
    .catch((err) => console.log(err));
}

export default connectToDb