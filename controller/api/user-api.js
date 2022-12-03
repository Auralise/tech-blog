const router = require("express").Router();
const { User } = require("../../models");






router.post("/login", async (req, res) => {
    try {
        const userData = User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!userData) {
            res.status(401).json({
                message: "Incorrect username or password",
            });
            return;
        }

        //If password is incorrect
        if (!await userData.checkPassword(req.body.password)) {
            res.status(401).json({
                message: "Incorrect username or password",
            });

            return;
        } else {

            req.session.save(() => {

                req.session.user_id = userData.id;
                req.session.logged_in = true;

                res.status(200).json({
                    message: "Login successful",
                });
            });
        }


    } catch (err) {
        console.error(err);

        res.status(500).json({
            mesasge: "An internal server error occurred"
        })
    }


});








module.exports = router;