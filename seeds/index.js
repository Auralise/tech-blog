const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const users = require("./user.json");
const posts = require("./post.json");
const comments = require("./comment.json");

const runSeeds = async () => {
    await sequelize.sync({ force: true });


    console.log("--- Creating User seeds ---");
    await User.bulkCreate(users, {
        individualHooks: true,
    });

    console.log("--- Creating posts ---");
    await Post.bulkCreate(posts);

    console.log("--- Creating comments ---");
    await Comment.bulkCreate(comments);


    console.log("Seeding complete");

    process.exit(0);
}


runSeeds();