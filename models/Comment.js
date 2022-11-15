const { Model, DataTypes } = require("sequelize");
const { now } = require("sequelize/types/utils");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: now,
            allowNull: false,
        },
        last_updated: {
            type: DataTypes.DATE,
            defaultValue: now,
            allowNull: false,
        },
        contents: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "post",
                key: "id",
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
    },
    {
        hooks: {
            //TODO test and confirm. The usage of the "now" default value of now outside of the context of default values is not explicity shown in the docs however I have not been able to find a reason in the source code as to why this would not work with Hooks. 
            beforeUpdate: (postData) => {
                postData.last_updated = now;
                return postData;
            }
        },
        sequelize,
        timestamps:false,
        freezeTableName: true,
        underscored: true,
        modelName: "comment",

    },
);

module.exports = Comment;