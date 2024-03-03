console.log("Rikka's the best");
const socket = io();

const welcome = document.getElementById("welcome");
const joinForm = document.getElementById("joinForm");
const messageForm = document.getElementById("messageForm");
const messageList = document.querySelector("ul");
const messageInput = messageForm.querySelector("input");

const nickForm = document.getElementById("nickForm");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function showRoom(){
    room.hidden = false;
    joinForm.hidden = true;
    const roomTitle = room.querySelector('h3');
    roomTitle.innerText = `Room ${roomName}`;
}

function handleJoin(event){
    event.preventDefault();
    const input = joinForm.querySelector("input");
    socket.emit("join", input.value, showRoom);
    roomName = input.value;
    input.value = "";
}

function sendMessage(event){
    event.preventDefault();
    const value = messageInput.value;
    socket.emit("message", value, roomName, () => {
        addMessage(`You : ${value}`);
    });
    messageInput.value = "";
}

joinForm.addEventListener("submit", handleJoin);
messageForm.addEventListener("submit", sendMessage);
nickForm.addEventListener("submit", setNickname);

socket.on("welcome", (nickname)=>{
    addMessage(`${nickname} joined the chat`);
    console.log('welcome');
})

socket.on("bye", (nickname) => {
    addMessage(`${nickname} left the chat`);
})

socket.on("message", (msg) => {
    addMessage(msg);
})

socket.on("room_change", (msg)=> console.log(msg));

function addMessage(msg){
    //socket.to(roomName).send()
    const li = document.createElement("li");
    li.innerText = msg;
    messageList.append(li);
}

function setNickname(event){
    event.preventDefault();
    //input 태그
    const input = nickForm.querySelector("input");
    const value = input.value;
    socket.emit('set_nick', value, ()=>{
        console.log('닉네임 설정완료');
    });
    input.value = "";
}
// messageForm.addEventListener("submit", handleSubmit);
// nickForm.addEventListener("submit", handleNickSubmit);
// function fn(event){
//     console.log('submit')
// }

// form.addEventListener("submit", fn)