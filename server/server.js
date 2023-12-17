const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

// Implement in-memory storage!

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User joined room: " + data);
    // Send message to room that user joined
    // Add user to room number
  });

  socket.on("send_message", (data) => {
    console.log(socket.rooms);
    console.log(`${data.message} was sent to room ${data.room}`);
    socket.to(data.room).emit("receive_message", buildMsg(data.name, data.message));
  });

  socket.on("user-activity", (data) => {
    // Send message to room that user is typing
  });

  socket.on("leave_room", (data) => {
    socket.leave(data);
    console.log("User left room: " + data);
    // Send message to room that user left
    // Remove user from room number
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    // Send message to room that user left
    // Remove user from room number
  });

});

function buildMsg(name, text) {
  return {
      name,
      text,
      time: new Intl.DateTimeFormat('default', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
      }).format(new Date())
  }
}

const port = 3001; // Define a variable to store the port number

server.listen(port, () => {
  console.log("SERVER IS RUNNING at port " + port);
});
