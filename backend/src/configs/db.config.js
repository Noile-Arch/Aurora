const mongoose = require("mongoose")
const uri = process.env.MONGODB_URI;

const connectDb = async()=>{
    try {
        await mongoose.connect(uri)
    } catch (error) {
        console.error.bind(console, colors.red(`MongoDB connection error: ${error}`));
        process.exit(1)
    }
};

connectDb();

module.exports = mongoose.connection;