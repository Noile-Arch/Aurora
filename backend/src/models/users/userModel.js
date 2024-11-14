const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: [8, 'Password must be at least 8 characters long'],
    }
})

const User = mongoose.model("Users", userSchema);

module.exports = User;