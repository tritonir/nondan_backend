import mongoose from "mongoose";

const signupSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: null,
    },
    clubId: {
        type: String,
        required: true,
        default: 'student',
    }
},
    {
        timestamps: true,
    }

)


const users = mongoose.model('users', signupSchema);
export default users