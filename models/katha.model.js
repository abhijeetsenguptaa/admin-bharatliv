const connection = require("../configs/connection");
const SpeakersModel = require("./speakers.model");

const KathaModel = await connection.define("kathas", {
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
    speakerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: SpeakersModel,
            key: 'id',
        },
    }
});

KathaModel.belongsTo(SpeakersModel, {
    foreignKey: 'speakerID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

SpeakersModel.hasMany(KathaModel, {
    foreignKey: 'speakerID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

module.exports = KathaModel;