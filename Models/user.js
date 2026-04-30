"use strict";
const validator = require('validator'),
    bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Firstname is required!'],
        trim: true
    },
    lastname: {
        type: String,
        required: [true, 'Lastname is required!'],
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        unique: true,
        trim: true,
        validator: [validator.isEmail, "Email is not valid!"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
        trim: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        trim: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password is missing!"],
        min: [8, "Password must not be less than 8 characters"],
        select: false
    },
    confirmPassword: {
        type: String,
        trim: true,
        required: [true, "Please confirm your password!"],
        validate: {
            validator: function (value) {
                return this.password === value;
            },
            message: "Passwords do not match!"
        }
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date()
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    passwordChangedAt: Date
});

// Hash Password
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined; // I'm not saving this in my DB
});

// Validate User Password
userSchema.methods.validateUserPassword = async function(password, hash) {
    return await bcrypt.compare(password, hash);
}

// Model
const User = mongoose.model('User', userSchema);

module.exports = User;