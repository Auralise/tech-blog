const router = require("express").Router();
const { Post } = require("../models");
const authCheck = require("../utils/express-middleware/auth");



router.get("/", async (req, res) => {

    const postsData = await Post.findAll({
        limit: 5,
        order: ["last_updated", "DESC"],
        include: [{ model: "comment", limit: 3 }],
    });

    const posts = postsData.map(post => post.get({plain: true}));

    res.render("homepage", posts, req.session.logged_in); 

});

router.get("/:id", async (req, res) => {
    const postData = await Post.findByPk(req.params.id, {
        include: [{ model: "comment" }],
    });

    const post = postData.map(content => content.get({plain: true}));

    res.render("post-page", post, req.session.logged_in);
});



router.get("/new-post", authCheck, (req, res) => {

    res.render("new-post", req.session.logged_in);

});



router.get("/login", (req, res) => {

    if (req.session.logged_in) {
        res.redirect("/");
        return;
    } else {
        res.render("login");
    }
});