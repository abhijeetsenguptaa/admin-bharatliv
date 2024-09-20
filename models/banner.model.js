const { DataTypes } = require('sequelize');
const connection = require('../configs/connection');

const BannerModel = connection.define('banners', {
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = BannerModel;
