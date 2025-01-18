import mongoose, { Schema } from "mongoose";

const DocumentSchema: Schema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, require: true },
    content: { type: String, required: false },
    userId: { type: String, required: true },
})

export default mongoose.model("Document", DocumentSchema);