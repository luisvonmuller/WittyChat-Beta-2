require('dotenv').config();
var express = require("express")
var http = require("http");
const app = express();
const server = http.createServer(app);
var socket = require("socket.io");
const io = socket(server);

const users = {};

const socketToRoom = {};

io.on('connection', socket =>
{
    socket.on("join room", roomID =>
    {
        if (users[roomID])
        {
            const length = users[roomID].length;
            if (length === 4)
            {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else
        {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload =>
    {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload =>
    {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () =>
    {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room)
        {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });

});

server.listen(process.env.PORT || 8080, () => console.log('server is running on port 3000'));

module.exports = app;

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  const path = require('path');
    app.use(path.join(req, res)(__dirname, 'webclient/src/room/room.js'));
        app.use(express.static((__dirname, 'webclient/src/room/room.js')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/index.html'));
  });
}

