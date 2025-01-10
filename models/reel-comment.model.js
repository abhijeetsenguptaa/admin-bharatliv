const { DataTypes } = require("sequelize");
const connection = require("../configs/connection");
const UsersModel = require("./users.model");
const ReelAdminModel = require("./reel-admin.model");

const ReelCommentModel = connection.define('reelComments', {
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

ReelCommentModel.belongsTo(UsersModel, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

UsersModel.hasMany(ReelCommentModel, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

ReelCommentModel.belongsTo(ReelAdminModel, {
    foreignKey: 'adminReelID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

ReelAdminModel.hasMany(ReelCommentModel, {
    foreignKey: 'adminReelID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

module.exports = ReelCommentModel;