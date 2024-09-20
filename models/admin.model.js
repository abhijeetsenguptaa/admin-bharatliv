const { DataTypes } = require("sequelize");
const connection = require("../configs/connection");

const AdminModel = connection.define('admins', {
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mobile: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('manager', 'admin'),
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = AdminModel;
