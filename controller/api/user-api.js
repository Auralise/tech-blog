const router = require("express").Router();
const { User } = require("../../models");
const checkAuth = require("../../utils/express-middleware/auth")

router.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
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
            //Create session if password is correct
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



router.post("/register", async (req, res) => {
    try {
        if (
            !req.body.username ||
            !req.body.email ||
            !req.body.password
        ) {
            res.status(400).json({
                message: "Please provide a username, email and password",
            });
            return;
        }

        const { username, email, password } = req.body;

        const newUser = await User.create({
            username: username,
            email: email,
            password: password,
        });

        if (newUser) {
            //Create new session if successful
            req.session.save(() => {

                req.session.user_id = newUser.id;
                req.session.logged_in = true;

                res.status(201).json({
                    message: "Successfully created user",
                });
            })
        } else {
            throw new Error("Failed to create user");
        }


    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "An internal server error occured",
        });
    }
});


router.post("/logout", checkAuth, async (req, res) => {

    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }


});

router.post("/update", checkAuth, async (req, res) => {
    try {
        if (!req.body.password) {
            res.status(400).json({
                message: "Please provide a password to update",
            });
            return;
        }

        await User.update({ password: req.body.password })

        res.status(200).json({
            message: "Successfully updated password",
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "An internal server error occurred",
        });
    }
});



module.exports = router;