const { DataTypes } = require('sequelize');
const connection = require('../configs/connection');
const UsersModel = require('./users.model');

const PriceModel = connection.define('prices', {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UsersModel,
            key: 'id',
        },
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    originalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    discountPercent: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    discountedPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    specialPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('none', 'basic', 'standard', 'premium'),
        allowNull: false,
        defaultValue: 'none'
    },
    duration: {
        type: DataTypes.ENUM('none', '3', '6', '12'),
        allowNull: false,
        defaultValue: 'none'
    }
}, {
    timestamps: true
});

module.exports = PriceModel;
