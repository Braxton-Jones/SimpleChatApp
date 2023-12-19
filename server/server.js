const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

// Implement in-memory storage!
let socketIds = []; // Create an empty array to store socket ids



const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("join_room", (data) => {
//     socket.join(data);
//     console.log("User joined room: " + data);
//     io.to(data).emit("get_message", buildMsg('Admin', ` has joined the room`, data));
//   });

//   socket.on("send_message", (data) => {
//     console.log(data);
//     io.to(data.room).emit("get_message", buildMsg(data.name, data.message, data.room));
//   });
  

//   socket.on("user-activity", (data) => {
//     // Send message to room that user is typing
//   });

//   socket.on("leave_room", (data) => {
//     socket.leave(data);
//     console.log("User left room: " + data);
//     io.to(data).emit("get_message", buildMsg('Admin', ` has left the room`, data));
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });

// });
io.on("connection", (socket) => {
  console.log("A user connected");

  // Push the socket id into the socketIds array
  socketIds.push(socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("User joined room: " + data);
    io.to(data).emit("get_message", buildMsg('Admin', `ID: ${socket.id.substring(0,5)} has joined the room`, data));
  });

  socket.on("send_message", (data) => {
    console.log(data);
    io.to(data.room).emit("get_message", buildMsg(data.name, data.message, data.room, socket.id.substring(0,5)));
  });
  
  socket.on("user-activity", (data) => {
    // Send message to room that user is typing
  });

  socket.on("leave_room", (data) => {
    socket.leave(data);
    console.log("User left room: " + data);
    io.to(data).emit("get_message", buildMsg('Admin', `ID: ${socket.id.substring(0,5)} has left the room`, data));
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");

    // Remove the socket id from the socketIds array
    socketIds = socketIds.filter(id => id !== socket.id);
  });

});
function buildMsg(name, message, room, id) {
  return {
      name,
      message,
      time: new Intl.DateTimeFormat('default', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
      }).format(new Date()),
      room,
      id
  }
}

const port = 3001; // Define a variable to store the port number

server.listen(port, () => {
  console.log("SERVER IS RUNNING at port " + port);
});
