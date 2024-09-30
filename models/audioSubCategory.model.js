const { DataTypes } = require('sequelize');
const connection = require("../configs/connection");
const AudioCategoryModel = require('./audioCategory.model');

const AudioSubCategoryModel = connection.define('audioSubCategories', {
    audioCategoryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AudioCategoryModel,
            key: 'id',
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
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
}, {
    timestamps: true
})

AudioSubCategoryModel.belongsTo(AudioCategoryModel, {
    foreignKey: 'audioCategoryID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

AudioCategoryModel.hasMany(AudioSubCategoryModel, {
    foreignKey: 'audioCategoryID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})



module.exports = AudioSubCategoryModel;