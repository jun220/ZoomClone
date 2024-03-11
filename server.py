from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('home.html')

@socketio.on('join_room')
def handle_join_room(roomName):
    print(f"join room : {roomName}")
    room = roomName
    join_room(room)
    emit('welcome', room=room)

@socketio.on('offer')
def handle_offer(offer, roomName):
    emit('offer', offer, room=roomName)

@socketio.on('answer')
def handle_answer(answer, roomName):
    emit('answer', answer, room=roomName)

@socketio.on('ice')
def handle_ice(ice, roomName):
    emit('ice', ice, room=roomName)

if __name__ == '__main__':
    socketio.run(app, debug=True)
