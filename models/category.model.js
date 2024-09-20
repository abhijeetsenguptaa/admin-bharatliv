const { DataTypes } = require('sequelize');
const connection = require("../configs/connection");

const CategoryModel = connection.define('categories', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalVideos: {
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


module.exports = CategoryModel;