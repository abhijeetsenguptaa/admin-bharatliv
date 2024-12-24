const { DataTypes } = require('sequelize');
const connection = require("../configs/connection");
const SeriesModel = require('./series.model');


const SeriesVideoModel = connection.define('seriesVideos', {
    seriesID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SeriesModel,
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

SeriesVideoModel.belongsTo(SeriesModel, {
    foreignKey: 'seriesID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

SeriesModel.hasMany(SeriesVideoModel, {
    foreignKey: 'seriesID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})


module.exports = SeriesVideoModel;