const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 1. Define the User Profile blueprint structure
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// 2. Dynamic Pre-Save Middleware: Automatically scramble the password before saving
UserSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified or is brand new
    if (!this.isModified('password')) return next();
    
    // Generate a secure encryption salt and hash the password string
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);