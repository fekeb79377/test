const userService = require('../services/user-service');

module.exports.registerUser = async (req, res) => {
    try {
        const user = await userService.registerUser(req, res);
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}