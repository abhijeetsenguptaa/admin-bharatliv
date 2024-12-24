const { DataTypes } = require('sequelize');
const connection = require('../configs/connection');

const BannerModel = connection.define('banners', {
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,  // Making sure this field is not null
        defaultValue: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM('advertisement', 'header'),  // Correct ENUM usage from DataTypes
        allowNull: false,  // Ensuring that type should not be null
        defaultValue: 'header'
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = BannerModel;
