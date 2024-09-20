const { DataTypes } = require("sequelize");
const connection = require("../configs/connection");
const ContentModel = require("./content.model");
const UsersModel = require("./users.model");

const CommentModel = connection.define('comments', {
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
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
})

CommentModel.belongsTo(UsersModel, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

UsersModel.hasMany(CommentModel, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

CommentModel.belongsTo(ContentModel, {
    foreignKey: 'contentID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

ContentModel.hasMany(CommentModel, {
    foreignKey: 'contentID',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

module.exports = CommentModel;