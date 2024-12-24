const { DataTypes } = require('sequelize');
const connection = require("../configs/connection");

const AudioCategoryModel = connection.define('audioCategories', {
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    device: {
        type: DataTypes.ENUM('mobile', 'tablet', 'tv'),  // Correct ENUM usage from DataTypes
        allowNull: false,  // Ensuring that type should not be null
        defaultValue: 'mobile'
    },
    totalAudios: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
}, {
    timestamps: true
})


module.exports = AudioCategoryModel;