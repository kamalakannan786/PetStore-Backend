const User = require("../Models/UserModel");

const signup = async (req, res) => {
    try {
        const { firstname, lastname, email, password, phone } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: "Email already registered" });

        const newUser = new User({ firstname, lastname, email, password, phone });
        const savedUser = await newUser.save();
        res.status(201).json({ message: "User created successfully", data: savedUser });
    } catch (error) {
        res.status(400).json({ message: "Error creating user", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) return res.status(401).json({ message: "Invalid email or password" });
        res.status(200).json({ message: "Login successful", data: user });
    } catch (error) {
        res.status(400).json({ message: "Error logging in", error: error.message });
    }
};

module.exports = { signup, login };
