const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");

const app = express();
const PORT = process.env.PORT || 8888;
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
    console.log("Connected to db successfully");

}).catch(err=>{
    console.log(`Error: ${err.message}`)
});

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
