const { Schema, model } = require("mongoose")

const listSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        color: {
            type: String,
        },
    }
)

const List = model("List", listSchema)

module.exports = List