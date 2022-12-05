const router = require("express").Router();
const checkAuth = require("../../utils/express-middleware/auth");
const { Post } = require("../../models");

router.put("/:id", checkAuth, async (req, res) => {
    try {
        if (
            !req.body.title &&
            !req.body.contents
        ) {
            res.status(400).json({
                message: "Please include either or both: title, contents"
            });
            return;
        }

        const postToEdit = await Post.findByPk(req.params.id);

        if (!postToEdit) {
            res.status(404).json({
                message: "Could not find post to edit",
            });
            return;
        }

        const reqBody = { ...req.body };

        const rowsUpdate = await Post.update(reqBody, {
            where: {
                id: req.params.id,
            },
        });

        if (rowsUpdate[0]) {
            res.status(200).json({
                message: "Successfully updated post"
            });
        } else {
            throw new Error(`Failed to update post with id: ${req.params.id}`)
        }




    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "An internal server error occurred",
        })
    }
});

router.delete("/:id", checkAuth, async (req, res) => {
    try {
        const postToDelete = await Post.findByPk(req.params.id);

        if (!postToDelete) {
            res.status(404).json({
                message: "No post with that ID"
            });
            return;
        }

        await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.status(200).json({
            message: "Post successfully deleted",
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "An internal server error occurred",
        });
    }
});

router.post("/create", checkAuth, async (req, res) => {
    try {
        if (!req.body.title || !req.body.contents){
            res.status(400).json({
                message: "Please include a title and contents",
            });
            return;
        }

        const reqBody = {...req.body};

        const newObject = await Post.create(reqBody);

        if (!newObject) {
            throw new Error("Failed to create new object");
        } else {
            res.status(201).json({
                message: "Successfully created new post",
            });
        }

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "An internal server error occurred"
        })
    }
});



module.exports = router;