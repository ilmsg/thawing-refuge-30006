const http = require('http');
const socketio = require('socket.io');

const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000;
const app = require('./app');

const server = http.createServer(app);
server.listen(port, function () {
    console.log('Express server listening on port ' + port);
});

const io = socketio(server);

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
