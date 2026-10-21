// ----------------- ROADMAP TARGET: POST /api/login ENDPOINT -----------------
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Verify that both parameter fields exist in the incoming network request
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing email or password fields" });
        }

        // 2. Query MongoDB using Mongoose to match the user account document
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password credentials" });
        }

        // 3. Cryptographic Verification using bcrypt.compare()
        // Validates the incoming raw text password against the encrypted hash saved in MongoDB
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid email or password credentials" });
        }

        return res.status(200).json({
            success: true,
            message: "Authentication successful! User validation passed via bcrypt core layer. ✅"
        });

    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
});