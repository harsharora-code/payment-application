const mongoose = require("mongoose");
const { string, minLength, maxLength, strictObject } = require("zod");
const Schema = mongoose.Schema;
const objectId = mongoose.objectId;

const userSchema = new Schema({
   username : {
    type : String,
    required: true,
    minLength: 3,
    maxLength: 15
   },
   password : {
    type : String,
    required : true,
    minLength: 3,
    maxLength: 15,
   },
    firstname : {
        type: String,
        required: true,
         minLength: 3,
          maxLength: 15,

    },
    lastname : {
        type: String,
        required: true,
         minLength: 3,
          maxLength: 15,
    }
})

const accountSchema = new Schema({
    userId :  {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true,
    }

});
const userModel  = new mongoose.model("User", userSchema);
const accountModel = mongoose.model("Account", accountSchema);
module.exports = {
    userModel : userModel,
    accountModel : accountModel,
}