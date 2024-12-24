const { DataTypes } = require('sequelize');
const connection = require('../configs/connection');

const OrganizationModel = connection.define('organizations', {
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
    },
    device: {
        type: DataTypes.ENUM('mobile', 'tablet', 'tv'),  // Correct ENUM usage from DataTypes
        allowNull: false,  // Ensuring that type should not be null
        defaultValue: 'mobile'
    }
}, {
    timestamps: true
});

module.exports = OrganizationModel;
