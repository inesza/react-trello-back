const { Schema, model } = require("mongoose")

const checklistSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        card: {
            type: Schema.Types.ObjectId,
            ref: "Card"
        },
        isDone: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
)

const Checklist = model("Checklist", checklistSchema)

module.exports = Checklist