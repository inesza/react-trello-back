const mongoose = require("mongoose");

const endpoint = process.env.MONGO_URI || "mongodb://127.0.0.1/react-trello";

mongoose
    .set('strictQuery', true)
    .connect(endpoint)
    .then((db) => console.log("DB connected: http://localhost:8080, db name: ", db.connection.name))
    .catch((e) => console.error(e));