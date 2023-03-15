const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const messageRoute = require("./routes/message.route");
const auth = require("./middleware/auth");
const errorHandler = require("./utils/errorHandler");
require("dotenv").config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoute);
app.use("/api/messages", messageRoute);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then((result) => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

httpServer.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});

io.on("connection", (socket) => {
  socket.on("createroom", (data) => {
    socket.join(data);
  });
  socket.on("newMessageToServer", (data) => {
    console.log(socket.rooms);
    console.log(data);
    console.log(data.message);
    socket.to(data.roomId).emit("newMessageToClient", data.message);
  });
});
