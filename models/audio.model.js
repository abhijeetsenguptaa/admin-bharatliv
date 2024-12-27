const { DataTypes } = require("sequelize");
const connection = require("../configs/connection");
const AudioCategoryModel = require("./audioCategory.model");
const AudioSubCategoryModel = require("./audioSubCategory.model");

const AudioModel = connection.define('audios', {
    audioCategoryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AudioCategoryModel,
            key: 'id',
        },
    },
    audioSubCategoryID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AudioSubCategoryModel,
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
    audio: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
}, {
    timestamps: true
})

AudioModel.belongsTo(AudioCategoryModel, {
    foreignKey: 'audioCategoryID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

AudioCategoryModel.hasMany(AudioModel, {
    foreignKey: 'audioCategoryID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

AudioModel.belongsTo(AudioSubCategoryModel, {
    foreignKey: 'audioSubCategoryID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

AudioSubCategoryModel.hasMany(AudioModel, {
    foreignKey: 'audioSubCategoryID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

module.exports = AudioModel;