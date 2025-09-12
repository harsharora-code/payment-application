const zod  = require("zod");
const {Router} =  require("express");
const {userModel} = require("../db")
const jwt = require("jsonwebtoken");
const {JWT_USER_SECRET} = require("../config")
const {authMiddleware} = require('../middleware')
const {accountModel} =  require("../db");

const userRouter = Router();

const signupBody  = zod.object({
    username : zod.string().min(3).max(15),
    password: zod.string().min(3).max(15),
    firstname : zod.string().min(3).max(15),
    lastname : zod.string().min(3).max(15),
});

userRouter.post('/signup', async function(req, res) {
    try {

    const dataSuccess = signupBody.safeParse(req.body);
    if(!dataSuccess.success) {
      return res.status(500).json({msg: "invalid input"})
    }

    const {username, password, firstname, lastname} = req.body;


    const existingUser = await userModel.findOne({ username });
    if(existingUser) {
        return res.status(413).json({msg : "user alraedy exists"});
    }

   const userData = await userModel.create({
   username,
   password,
   firstname,
   lastname,
   });

   const userId  = userData._id;
   await accountModel.create({
    userId : userId,
    balance : Math.floor(Math.random() * 100000),
   })

   res.json({
    msg : "user signup with balanace suceesfully"
   })
} catch (error) {
    return res.status(500).json({
        status: "error",
        msg: "signup request failed, try again"
    });
}
});

userRouter.post('/signin', async function(req, res) {
    const signinBody = zod.object({
        username: zod.string().min(3).max(15),
        password : zod.string().min(3).max(15),
    });
    try {
    const signindata = signinBody.safeParse(req.body);
      if(!signindata.success) {
        return res.status(500).json({msg : "invalid inputs"});
      }

      const {username, password} = req.body;
      const usermatch = await userModel.findOne({username});
      if(!usermatch) {
        return res.status(403).json({msg : "user not found"});
      }
      const token = jwt.sign({
        id : usermatch._id,
      }, JWT_USER_SECRET);
      res.json({
        msg : "user login sucesss",
        token : token,
      })
    } catch (error) {
        return res.status(500).json({
            msg : "signin req failed"
        })
    }
})

userRouter.put('/', authMiddleware, async function(req, res) {
    const updateBody = zod.object({
        password : zod.string().min(3).max(15),
        firstname : zod.string().min(3).max(15),
        lastname : zod.string().min(3).max(15),
    });

    const update = updateBody.safeParse(req.body);
    if(!update.success) {
        return res.status(403).json({});
    }

    await userModel.updateOne(req.body, {
        id: req.userId,
    })
    res.json({
        msg : "update done"
    })
})

userRouter.get('/bulk', async function(req, res) {
    const filter = req.query.filter || "";
    const users = await userModel.find({
        $or: [{
            firstname : {
                "$regex" : filter
            }
        },
        {
            lastname : {
                "$regex" : filter
            }
        }
    ]
    })
    res.json({
        user : users.map(user => ({
            username : user.username,
            firstname : user.firstname,
            lastname : user.lastname,
            _id: user._id

        }))
    })
})
module.exports = {
    userRouter,
}
