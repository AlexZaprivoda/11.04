var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

const arrayConnection = [];
io.on("connection", function (socket) {
    arrayConnection.push(socket);
    console.log(arrayConnection.length)

    socket.on("hit", function (data) {
        console.log(data);
        arrayConnection.forEach(connect => {
            if (connect !== socket) {
                connect.emit("passHit", null);
            }
        });
    });

    socket.on("disconnect", function () {
        let index = arrayConnection.findIndex(connect => connect === socket);
        arrayConnection.splice(index, 1);
        // console.log(arrayConnection.length)
    });


});

// io.on('connection', function (socket) {
//     // console.log(socket)
//     socket.emit('who?', {});
//     // socket.emit('news', { hello: 'world' });
//     socket.on('name', function (data) {
//         // console.log(this);
//         connectionArray.push({
//             name: data.name,
//             socket
//         });
//     });

//     socket.on("disconnect", function () {
//         let index = connectionArray.findIndex(connect => connect.socket === socket);
//         connectionArray.splice(index, 1);
//     });

//     socket.on("input", function ({ text }) {
//         console.log(text)
//         connectionArray.forEach((socketObject)=>{
//             if (socketObject.name === "view"){
//                 socketObject.socket.emit("sendInput",{
//                     text: text
//                 });
//             }
//         })
//     })

// });