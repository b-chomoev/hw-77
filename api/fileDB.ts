import {IReview, ReviewMutation} from "./types";
import {promises as fs} from 'fs';
import crypto from "crypto";

const fileName = './db.json';
let data: IReview[] = [];

const fileDb = {
    async init() {
        try {
            const fileContent = await fs.readFile(fileName);
            data = await JSON.parse(fileContent.toString()) as IReview[];
        } catch (e) {
            console.error(e);
        }
    },
    async getItems() {
        return data;
    },
    async addItem(review: ReviewMutation) {
        const id = crypto.randomUUID();
        const newReview = {id, ...review};
        data.push(newReview);
        await this.save();
        return newReview;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;