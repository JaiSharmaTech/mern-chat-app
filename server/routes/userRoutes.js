const { Router } = require("express");
const { register, login, setAvatar, getAllUsers } = require("../controllers/userController");
const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/setAvatar/:id", setAvatar)
userRouter.get("/allusers/:id", getAllUsers)

module.exports = userRouter;
