const mongooose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

userSchema.methods.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.Password);
}

userSchema.methods.generateToken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET)
}

module.exports = mongooose.model('user', userSchema);