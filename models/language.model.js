const { DataTypes } = require('sequelize');
const connection = require("../configs/connection");

const LanguageModel = connection.define('languages', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
}, {
    timestamps: true
})


module.exports = LanguageModel;