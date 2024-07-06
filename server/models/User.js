const mongoose = require('mongoose');
const {Schema, model} = mongoose;

//defined the user model structure for the signup
const UserSchema = new Schema({
    firstName: {type: String, required: true, min: 4},
    lastName: {type: String, required: true, min: 4},
    email: { 
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: function(v) {
                // Regular expression for email validation
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {type: String, required: true},
    confirmpassword: {type: String, required: true},
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;