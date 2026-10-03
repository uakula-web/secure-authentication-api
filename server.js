const express = require('express');
const mongoose = require('mongoose');
const User = require('./User'); // Import our secure database blueprint model

const app = express();
const PORT = 5000;

// Middleware to parse incoming JSON payloads automatically
app.use(express.json());

// 1. Establish your Local MongoDB connection pipeline 
// Ensure your local MongoDB Windows Service or Compass app is running!
const localDBURI = 'mongodb://127.0.0.1:27017/secureAuthDB';

mongoose.connect(localDBURI)
    .then(() => console.log('✅ SUCCESS: Safely connected to Local MongoDB!'))
    .catch(err => console.error('❌ DATABASE CONNECTION ERROR:', err));

// 2. The Registration Endpoint: POST /api/register
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation Check: Verify all form data inputs are present
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Please enter all required fields" });
        }

        // Check if user already exists inside the database collection
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User profile already registered" });
        }

        // Create the new user object slot. 
        // Our pre-save hook in User.js will automatically encrypt the password string!
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({
            message: "🎉 User account successfully registered and password encrypted!",
            user: { id: newUser._id, username: newUser.username, email: newUser.email }
        });

    } catch (error) {
        console.error("❌ Registration Pipeline Error:", error);
        res.status(500).json({ error: "Internal server processing failure" });
    }
});

// Root check endpoint path
app.get('/', (req, res) => {
    res.send("🛡️ Secure User Authentication API Engine is running online.");
});

// 3. Turn the server engine live
app.listen(PORT, () => {
    console.log(`===================================================`);
    console.log(`📡 Secure Server listening on: http://localhost:${PORT}`);
    console.log(`===================================================`);
});