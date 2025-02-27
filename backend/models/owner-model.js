const mongooose = require('mongoose');

const ownerSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
})

module.exports = mongooose.model('owner', ownerSchema);