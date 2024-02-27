console.log("Rikka's the best")
var result = confirm("릿카는 가장 귀엽습니까?");
if(result){
    alert("당연하죠! 역시 릿카..");
}else{
    alert("뭘 모르시네..");
}

const socket = new WebSocket(`ws://${window.location.host}`)
socket.addEventListener("open", ()=>{
    console.log("connected to server");
})

socket.addEventListener("message", (message) => {
    console.log("Just got this: ", message, " from the server")
})

socket.addEventListener("close", () => {
    console.log("Disconnected from server")
})

// function fn(event){
//     console.log('submit')
// }

// form.addEventListener("submit", fn)