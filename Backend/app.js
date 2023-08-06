const express = require("express")
const mongoose = require("mongoose");
const router = require("./routes/book-routes");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors())

app.use("/books", router) //localhost:5000/books

//Middlewares
// app.use("/", (req, res, next) => {
//     res.send("This is our server")

// })

mongoose.connect(
    "mongodb+srv://hussainhafidh1:hussain123@cluster0.i3adgel.mongodb.net/book-management?retryWrites=true&w=majority"
).then(() => console.log(`Connected to MongoDB...`))
    .then(() => {
        app.listen(5000, () => console.log(`Listening on: ${5000}`));
    }).catch((err) => console.log(err));






