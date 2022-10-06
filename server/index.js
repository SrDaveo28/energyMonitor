const express = require('express');
const socketIo = require('socketIo');
const http = require('http');

const app = express();

const server = http.createServer(app);
const io = socketIo.listen(server);

io.on('connection', (socket) => {
    console.log('new socket connected');
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const port = new SerialPort({ path: 'com5', baudRate: 9600 });
var dataArduino;
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('open', () => {
    console.log('Open connection');
})
parser.on('data', (data) => {
    console.log('Data:', data)
    io.emit('arduino:data', {
        value: data.toString(),
    })
});

parser.on('error', (err) => {
    console.log('error:', err.message)
});

server.listen(3000, () => {
    console.log('Server running');
})