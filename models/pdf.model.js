const { DataTypes } = require('sequelize');
const connection = require('../configs/connection');

const PdfModel = connection.define('pdfs', {
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    file: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true
});

module.exports = PdfModel;
