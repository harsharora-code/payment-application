const {accountModel} = require("../db")
const {Router} = require("express");
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");

const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    const account = await accountModel.findOne({
        userId: req.userId,

    });
    res.json({
        balance : account.balance,
    });
})


accountRouter.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    try {

    const {amount, to} = req.body;

    const account = await accountModel.findOne({userId : req.userId}).session(session);
    if(!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({msg: "Insufficent balance"});
    }
    const toAccount = await accountModel.findOne({userId: to}).session(session);
    if(!toAccount) {
        return res.status(400).json({msg : "Inavalid account"});
    }
 
    //perform the transfer amount
    await accountModel.updateOne({userId : req.userId}, {$inc: {balance: -amount}}).session(session);

    await accountModel.updateOne({ userId: to }, {$inc: { balance: amount } }).session(session);
    

    await session.commitTransaction();
    res.json({
        msg : amount + " Transfer sucessfully",
    });
} catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.error(error.message);
}

})


module.exports = {
    accountRouter,
}