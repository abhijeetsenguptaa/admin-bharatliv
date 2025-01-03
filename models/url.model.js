const { DataTypes } = require('sequelize');
const connection = require("../configs/connection");

const UrlModel = connection.define('url', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    url : {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
})


module.exports = UrlModel;