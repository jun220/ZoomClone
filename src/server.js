import express from "express";
import http from "http";
import SocketIO from "socket.io";

const path = require("path");
const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.use("/views", express.static(path.join(__dirname, "views")));

const handleListen = () => console.log(`Listening on http,ws. On port 3000`);

const httpServer = http.createServer(app);
const io = SocketIO(httpServer);

app.get("/", (req, res) => {
  //res.sendFile("home.html");
  res.sendFile("home.html", { root: path.join(__dirname, "views") });
  //res.render("home");
});

io.on("connection", (socket) => {
  socket.on("join_room", (roomName) => {
    console.log(`join room : ${roomName}`);
    socket.join(roomName);
    socket.to(roomName).emit("welcome");
  });

  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });

  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });

  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });
});

httpServer.listen(3000, handleListen);
