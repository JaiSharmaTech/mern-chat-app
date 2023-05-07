const { Router } = require("express");
const { register } = require("../controllers/userController");
const userRouter = Router();

userRouter.post("/register", register);

module.exports = userRouter;
