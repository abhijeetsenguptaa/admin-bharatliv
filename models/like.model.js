const { DataTypes } = require("sequelize");
const connection = require("../configs/connection");
const ContentModel = require("./content.model");
const UsersModel = require("./users.model");

const LikeModel = connection.define('likes', {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UsersModel,
            key: 'id',
        },
    },
    contentID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ContentModel,
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

LikeModel.belongsTo(ContentModel, {
    foreignKey: 'contentID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

ContentModel.hasMany(LikeModel, {
    foreignKey: 'contentID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

module.exports = LikeModel;