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
    }
}, {
    timestamps: true
});

module.exports = OrganizationModel;
