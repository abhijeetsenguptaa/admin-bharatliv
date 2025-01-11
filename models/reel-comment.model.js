const { DataTypes } = require("sequelize");
const connection = require("../configs/connection");
const UsersModel = require("./users.model");
const ReelAdminModel = require("./reel-admin.model");

const ReelAdminCommentModel = connection.define('reelAdminComments', {
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
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
})

ReelAdminCommentModel.belongsTo(UsersModel, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

UsersModel.hasMany(ReelAdminCommentModel, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

ReelAdminCommentModel.belongsTo(ReelAdminModel, {
    foreignKey: 'adminReelID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

ReelAdminModel.hasMany(ReelAdminCommentModel, {
    foreignKey: 'adminReelID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

module.exports = ReelAdminCommentModel;