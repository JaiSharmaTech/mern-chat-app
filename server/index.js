require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messageRoutes");
const socket = require("socket.io")

const app = express();
const PORT = process.env.PORT;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter)

connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to db successfully");
  })
  .catch((err) => {
    console.log(`Error: ${err.message}`);
  });

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const io = socket(server,{
  cors:{
    origin:"*",
    credentials:true,
  }
})

global.onlineUsers = new Map();

io.on("connection",socket=>{
  global.chatSocket = socket;
  socket.on("add-user",(userId)=>{
    onlineUsers.set(userId, socket.id)
  })
  socket.on("send-msg",data=>{
    const sendUserSocket = onlineUsers.get(data.to)
    if(sendUserSocket){
      socket.to(sendUserSocket).emit("msg-recieved",data.message)
    }
  })
})
