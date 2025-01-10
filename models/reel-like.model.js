const { DataTypes } = require("sequelize");
const connection = require("../configs/connection");
const UsersModel = require("./users.model");
const ReelAdminModel = require("./reel-admin.model");

const LikeModel = connection.define('likes', {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UsersModel,
            key: 'id',
        },
    },
    adminReelID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ReelAdminModel,
            key: 'id',
        },
    },
})

LikeModel.belongsTo(UsersModel, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

UsersModel.hasMany(LikeModel, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

LikeModel.belongsTo(ReelAdminModel, {
    foreignKey: 'adminReelID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

ReelAdminModel.hasMany(LikeModel, {
    foreignKey: 'adminReelID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

module.exports = LikeModel;