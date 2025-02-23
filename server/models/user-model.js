const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
})

module.exports = model('User', UserSchema);
