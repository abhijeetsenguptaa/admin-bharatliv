const { DataTypes } = require('sequelize');
const connection = require('../configs/connection');

const UsersModel = connection.define('users', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    emailOTP: {
        type: DataTypes.STRING,
        allowNull: true
    },
    isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phoneNumberOTP: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    isNumberVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Others'),
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM('super-admin', 'manager', 'customer'),
        allowNull: false,
        defaultValue: 'customer' // Default role set to 'customer'
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    userToken: {
        type: DataTypes.TEXT
    },
    paidMember: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    memberCategory: {
        type: DataTypes.ENUM('free-member', 'prime-member'),
        allowNull: false,
        defaultValue: 'free-member'
    },
    totalWatchTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    subscriptionDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    expiryDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    referenceSpeakerName: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    timestamps: true
});

module.exports = UsersModel;
