import { Server } from "socket.io";

export default function SocketHandler(req, res) {
    if (res.socket.server.io) {
        console.log("Socket is already running");
        res.end();
        return;
    }

    const io = new Server(res.socket.server, {
        path: "/api/socketio",
    });
    
    res.socket.server.io = io;

    io.on("connection", (socket) => {
        console.log("New client connected:", socket.id);
        
        socket.on("sendEmail", (data) => {
            console.log("Received email data:", data);
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });

    console.log("Socket server initialized");
    res.end();
}

// import { Server } from "socket.io";
// const EventEmitter = require('events');
// const myEmitter = new EventEmitter();


// myEmitter.setMaxListeners(100);

// Socket.EventEmitter.setMaxListeners(100)


// export default function SocketHandler(req, res) {
// //   if (res.socket.server.io) {
// //     console.log("Already set up");
    
// //   }
// //   e

// console.log("hello")

//   const io = new Server(res.socket.server);

//     res.socket.server.io = io;
//   io.on("connection", (socket) => {
//     console.log("connection")
//     // socket.on("send-message", (obj) => {
//     //   io.emit("receive-message", obj);
//     // });
//     socket.on("send-message", (data) => {
//         console.log("hello again")
//         console.log("data obtained : " + data.testdata)
//     })
//   });

//   console.log("Setting up socket");
//   res.end();
// }


// // // import { Socket } from "socket.io-client";

// // const express = require('express');
// // const http = require('http');
// // const { Server } = require('socket.io');
// // const cors = require('cors');

// // const app = express();
// // // app.use(cors)
// // const server = http.createServer(app);
// // const io = new Server(server, {
// //     cors: {
// //         origin: "https://localhost:3000",
// //         methods: ["GET", "POST"]
// //     }
// // });

// // app.use(cors());


// // import WebSocket, { WebSocketServer } from 'ws';

// // const wss = new WebSocketServer({
// //   port: 8080,
// //   perMessageDeflate: {
// //     zlibDeflateOptions: {
// //       // See zlib defaults.
// //       chunkSize: 1024,
// //       memLevel: 7,
// //       level: 3
// //     },
// //     zlibInflateOptions: {
// //       chunkSize: 10 * 1024
// //     },
// //     // Other options settable:
// //     clientNoContextTakeover: true, // Defaults to negotiated value.
// //     serverNoContextTakeover: true, // Defaults to negotiated value.
// //     serverMaxWindowBits: 10, // Defaults to negotiated value.
// //     // Below options specified as default values.
// //     concurrencyLimit: 10, // Limits zlib concurrency for perf.
// //     threshold: 1024 // Size (in bytes) below which messages
// //     // should not be compressed if context takeover is disabled.
// //   }
// // });

// // wss.on("connection", () => {
// //     console.log()
// // })


// // // import { Socket } from "socket.io-client";

// // const express = require('express');
// // const http = require('http');
// // const { Server } = require('socket.io');
// // const cors = require('cors');

// // const app = express();
// // // app.use(cors)
// // const server = http.createServer(app);
// // const io = new Server(server, {
// //     cors: {
// //         origin: "https://localhost:3000",
// //         methods: ["GET", "POST"]
// //     }
// // });

// // app.use(cors());

// // // interface Emaildata {
// // //     email: string
// // // }

// // io.on("connection", (socket) => {
    

// //     console.log("connected socket id " + socket.id);

// //     socket.on("sendEmail", (data) => {
// //         console.log("email : " + data.email);
// //     })
// // });

// // server.listen(3001, () => {
// //     console.log("Express server running");

// // });
