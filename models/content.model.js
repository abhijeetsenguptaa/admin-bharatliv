const { DataTypes } = require('sequelize');
const connection = require("../configs/connection");
const CategoryModel = require('./category.model');
const SpeakersModel = require('./speakers.model');
const OrganizationModel = require('./organization.model');
const LanguageModel = require('./language.model');


const ContentModel = connection.define('contents', {
    categoryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CategoryModel,
            key: 'id',
        },
    },
    organizationID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: OrganizationModel,
            key: 'id',
        },
    },
    speakerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SpeakersModel,
            key: 'id',
        },
    },
    languageID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: LanguageModel,
            key: 'id',
        },
    },
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
    count: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}, {
    timestamps: true
})

ContentModel.belongsTo(CategoryModel, {
    foreignKey: 'categoryID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

CategoryModel.hasMany(ContentModel, {
    foreignKey: 'categoryID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

ContentModel.belongsTo(OrganizationModel, {
    foreignKey: 'organizationID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

OrganizationModel.hasMany(ContentModel, {
    foreignKey: 'organizationID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

ContentModel.belongsTo(SpeakersModel, {
    foreignKey: 'speakerID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

SpeakersModel.hasMany(ContentModel, {
    foreignKey: 'speakerID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

ContentModel.belongsTo(LanguageModel, {
    foreignKey: 'languageID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

LanguageModel.hasMany(ContentModel, {
    foreignKey: 'languageID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

module.exports = ContentModel;