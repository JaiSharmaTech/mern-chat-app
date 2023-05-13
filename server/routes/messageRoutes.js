const { Router } = require("express");
const { addMessage, getAllMessage} = require("../controllers/messagesController");
const messageRouter = Router();

messageRouter.post("/addmsg", addMessage);
messageRouter.post("/getmsg", getAllMessage);

module.exports = messageRouter;
