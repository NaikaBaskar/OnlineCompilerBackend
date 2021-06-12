var hackerearth = require('hackerearth-node');
var hackerearth = new hackerearth('203157672c819e6d5ca8ace68ad81fbe08758ba6');

var config = {};
config.time_limit = 2;
config.memory_limit = 323244;
// config.input = "";
config.language = "cpp";

async function compile(code, input, language) {
    try {
        config.source = code;
        config.input = input;
        config.language = language;
        let result = await JSON.parse(await hackerearth.compile(config));
        if (result.compile_status == "OK") {
            return { "status": 2, "final": result };
        }
        else {
            return { "status": 1, "final": result };
        }
    }
    catch (err) {
        return { "status": 0, "final": err };
    }
}

async function run(code, input, language) {
    try {
        config.source = code;
        config.input = input;
        config.language = language;
        let result = await JSON.parse(await hackerearth.run(config));
        if (result.run_status.status == "AC") {
            return { "status": 2, "final": result };
        }
        else {

            console.log("bahar " + result);
            return { "status": 1, "final": result };
        }

    }
    catch (err) {
        console.log("aaja choosle");
        return { "status": 0, "final": result };
    }
}
exports = module.exports = {
    compile,
    run
}

// function compile(code, req, res, callback) {
//     config.source = code;
//     hackerearth.compile(config, function (err, result) {
//         if (err) {
//             console.log("-----------------Error in Compiling---------------------")
//             console.log(err);
//             res.send(err);
//             callback({ "status": 0 });
//         } else {
//             console.log("Compiled Succesfully " + JSON.parse(result));
//             res.send(JSON.parse(result));
//             callback({ "status": 1 });
//         }
//     });
// }
//
// function run(code, req, res, callback) {
//     config.source = code;
//     hackerearth.run(config, function (err, result) {
//         if (err) {
//             console.log("-----------------Error in running----------------------")
//             console.log(err);
//             res.send(err);
//             callback({ "status": 0 });
//         } else {
//             console.log("--------------------Run ho gaya hai bhaya--------------");
//             console.log(result);
//             res.send(result);
//             callback({ "status": 1 });
//         }
//     });
// }








// const express = require('express');
// const path = require('path')
// const socketio = require('socket.io') ///////////////
// const http = require('http')   //////////////

// const app = express()
// const server = http.createServer(app) //////////////
// const io = socketio(server)           /////////////

// const main = require('./Backend/main');

// var port = process.env.PORT || 2000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/', express.static(__dirname + "/Frontend"));

// io.on('connection', (socket) => {
//     console.log("New socket formed from " + socket.id)

//     socket.on('send', async (data) => {
//         let code = data.task;
//         let input = data.input;
//         let language = data.language;
//         let result = await main.compile(code, input, language);

//         if (result.status === 0) {
//             console.log("error while compiling the code");
//             socket.emit('rcv', result.final)
//         }
//         else if (result.status === 1) {
//             console.log("compiled with errors in code");
//             socket.emit('rcv', result.final)
//         }
//         else if (result.status === 2) {
//             console.log("--------------successfully compile---------------");
//             let result2 = await main.run(code, input, language);
//             if (result2.status === 0) {
//                 console.log("error while running the code");
//                 socket.emit('rcv', result2.final)
//             }
//             else if (result2.status === 1) {
//                 console.log("run with errors in code");
//                 socket.emit('rcv', result2.final)
//             }
//             else {
//                 console.log("-------------------successfully run---------------------");
//                 console.log("server.js " + result2.final.code_id + " " + socket.id);
//                 io.to(socket.id).emit('rcv', result2.final)                                  // 2nd fucntion 
//             }
//         }
//     })
// })

// console.log("Server started at http://localhost:2000/");
// server.listen