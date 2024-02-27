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

const sockets = [];

function parseMessage(message){

}

wss.on('connection', (socket) => {
    sockets.push(socket);
    socket['nickname'] = 'anonymous'
    console.log('connected from client')
    socket.on("close", () => {
        console.log("disconnected from client")
    })
    socket.on("message", (message) => {
        const data = JSON.parse(message);
        switch(data.type){
            case 'message':
                sockets.forEach(soc => soc.send(`${socket.nickname} : ${data.payload}`));
            case 'nickname':
                socket['nickname'] = data.payload;
                console.log(`set nickname : ${data.payload}`);
        }
    });
})

server.listen(3000, handleListen);