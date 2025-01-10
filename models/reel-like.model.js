const { DataTypes } = require("sequelize");
const connection = require("../configs/connection");
const UsersModel = require("./users.model");
const ReelAdminModel = require("./reel-admin.model");

const ReelAdminLikeModel = connection.define('reelAdminLikes', {
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

ReelAdminLikeModel.belongsTo(UsersModel, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

UsersModel.hasMany(ReelAdminLikeModel, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

ReelAdminLikeModel.belongsTo(ReelAdminModel, {
    foreignKey: 'adminReelID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

ReelAdminModel.hasMany(ReelAdminLikeModel, {
    foreignKey: 'adminReelID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

module.exports = ReelAdminLikeModel;