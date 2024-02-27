import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
console.log("hello");

app.get('/', (req, res)=>{
    res.render("home")
})

const handleListen = () => console.log(`Listening on http,ws. On port 3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function handleConnection(socket) {
    socket.send('hello')
    socket.on("close", () => {
        console.log("disconnected from client")
    })
}

wss.on('connection', handleConnection)

server.listen(3000, handleListen);