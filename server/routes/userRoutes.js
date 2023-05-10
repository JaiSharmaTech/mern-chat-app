const { Router } = require("express");
const { register, login, setAvatar } = require("../controllers/userController");
const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/setAvatar/:id",setAvatar)

module.exports = userRouter;
