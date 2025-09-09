require("dotenv").config()
const express = require("express");
const app  = express();

const mongoose = require("mongoose")

const {userRouter} = require("./routes/user");
const {accountRouter} = require("./routes/account")
app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/account', accountRouter);


async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000)
}
main();