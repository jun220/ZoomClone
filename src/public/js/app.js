console.log("Rikka's the best");

const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
// var result = confirm("릿카는 가장 귀엽습니까?");
// if(result){
//     alert("당연하죠! 역시 릿카..");
// }else{
//     alert("뭘 모르시네..");
// }

const socket = new WebSocket(`ws://${window.location.host}`)
socket.addEventListener("open", ()=>{
    console.log("connected to server");
})

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
    console.log("New message : \"", message.data, "\" from the server")
})

socket.addEventListener("close", () => {
    console.log("Disconnected from server")
})

// setTimeout(() => {
//     console.log("time's up!");
//     socket.send("hello from the browser!");
// }, 10000)

function makeMessage(type, payload){
    const msg = {type, payload};
    return JSON.stringify(msg);
}

function handleSubmit(event){
    event.preventDefault();
    //input 태그
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("message", input.value))
    input.value = "";
}

function handleNickSubmit(event){
    event.preventDefault();
    //input 태그
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value))
}
messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
// function fn(event){
//     console.log('submit')
// }

// form.addEventListener("submit", fn)