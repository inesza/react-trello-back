const { Schema, model } = require("mongoose")

const cardSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        list: {
            type: Schema.Types.ObjectId,
            ref: "List"
        },
    },
    {
        timestamps: true,
    }
)

const Card = model("Card", cardSchema)

module.exports = Card