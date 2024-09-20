const { DataTypes } = require('sequelize');
const connection = require('../configs/connection');
const OrganizationModel = require('./organization.model');

const SpeakersModel = connection.define('speakers', {
    organizationID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: OrganizationModel,
            key: 'id',
        },
    },
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

SpeakersModel.belongsTo(OrganizationModel, {
    foreignKey: 'organizationID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

OrganizationModel.hasMany(SpeakersModel, {
    foreignKey: 'organizationID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

module.exports = SpeakersModel;
