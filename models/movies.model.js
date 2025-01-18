const { DataTypes } = require('sequelize');
const connection = require("../configs/connection");


const MoviesModel = connection.define('movies', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    thumbNail: {
        type: DataTypes.STRING,
        allowNull: true
    },
    video: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    rating: {
        type: DataTypes.DECIMAL,
        allowNull: true,
        defaultValue: 5.0
    },
}, {
    timestamps: true
})


module.exports = MoviesModel;