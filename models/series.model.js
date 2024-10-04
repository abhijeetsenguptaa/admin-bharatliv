const { DataTypes } = require('sequelize');
const connection = require("../configs/connection");
const SpeakersModel = require('./speakers.model');
const OrganizationModel = require('./organization.model');
const LanguageModel = require('./language.model');

const SeriesModel = connection.define('series', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    speakerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SpeakersModel,
            key: 'id',
        }
    },
    organizationID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: OrganizationModel,
            key: 'id',
        }
    },
    languageID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: LanguageModel,
            key: 'id',
        }
    },
}, {
    timestamps: true
})

SeriesModel.belongsTo(SpeakersModel, {
    foreignKey: 'speakerID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

SpeakersModel.hasMany(SeriesModel, {
    foreignKey: 'speakerID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

SeriesModel.belongsTo(OrganizationModel, {
    foreignKey: 'organizationID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

OrganizationModel.hasMany(SeriesModel, {
    foreignKey: 'organizationID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

SeriesModel.belongsTo(LanguageModel, {
    foreignKey: 'languageID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

LanguageModel.hasMany(SeriesModel, {
    foreignKey: 'languageID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})


module.exports = SeriesModel;