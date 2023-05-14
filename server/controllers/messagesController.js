const MESSAGE = require("../model/messageModal");
module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await MESSAGE.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) return res.json({ status: true, msg: "Msg added Successfully" });
    return res.json({ status: false, msg: "Failed to add message to db" });
  } catch (err) {
    next(err);
  }
};
module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await MESSAGE.find({
      users: {
        $all: [from, to],
      },
    }).sort({updatedAt:1});
    const projectMessages = messages.map(msg=>{
      return {
        fromSelf:msg.sender.toString() === from,
        message:msg.message.text,
      }
    })
    return res.json(projectMessages)
  } catch (ex) {
    next(ex);
  }
};
