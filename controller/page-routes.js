const router = require("express").Router();
const { Post, Comment } = require("../models");
const checkAuth = require("../utils/express-middleware/auth");



router.get("/", async (req, res) => {

    const postsData = await Post.findAll({
        limit: 5,
        order: [["last_updated", "DESC"]],
        include: [{ model: Comment, limit: 3 }],
    });

    const posts = postsData.map(post => post.get({plain: true}));

    res.render("homepage", {
        posts,
        logged_in: req.session.logged_in
    }); 

});

router.get("/dashboard", checkAuth, async (req, res) => {
    const postsData = await Post.findAll({
        where: {
            user_id: req.session.user_id,
        },
    });

    const posts = postsData.map(post => post.get({plain: true}));

    res.render("dashboard", {
        posts,
        logged_in: req.session.logged_in,
    });
});

router.get("/new-post", checkAuth, (req, res) => {

    res.render("new-post", {
        logged_in: req.session.logged_in
    });

});

router.get("/login", (req, res) => {

    if (req.session.logged_in) {
        res.redirect("/");
        return;
    } else {
        res.render("login");
    }
});

router.get("/register", async (req, res) => {
    if (req.session.logged_in)
    {
        res.redirect("/");
    } else {
        res.render("register", {
            signup: true
        });

    }
})

router.get("/posts/:id", async (req, res) => {
    const postData = await Post.findByPk(req.params.id, {
        include: [{ model: Comment }],
    });


    const post = postData.map(content => content.get({plain: true}));
    
    res.render("post-page", {
        post,
        logged_in: req.session.logged_in
    });

});




module.exports = router;