import express from "express";
import {ReviewMutation} from "../types";
import fileDb from '../fileDB';
import {imagesUpload} from "../multer";

const reviewsRouter = express.Router();

reviewsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if (!req.body.message) {
        res.status(400).send({error: 'Message must be present in the request'});
        return;
    } else if (!req.body.author) {
        req.body.author = 'Anonymous';
    } else if (!req.body.image) {
        req.body.image = null;
    }

    const review: ReviewMutation = {
        author: req.body.author,
        message: req.body.message,
        image: req.file ? 'images' + req.file.filename : null,
    }

    const savedReview = await fileDb.addItem(review);
    res.send(savedReview);
});

export default reviewsRouter;