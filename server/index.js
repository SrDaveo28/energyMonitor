const express = require('express');
const { Server } = require("socket.io");
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const cors = require('cors');
const functions = require('./functions/function');

io.on('connection', (socket) => {
    console.log('new socket connected');
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/reports', (req, res) => {
    
    res.sendFile(__dirname + '/public/reports.html');
});

app.use(express.json());

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

//SerialPort.list().then(ports => console.log(ports))
var dataArduino;

const port = new SerialPort({ path: 'COM10', baudRate: 9600 }, (err) => {
    if (err) {
        return console.log('Error: ', err)
    }
})
port.write('main screen turn on', (err) => {
    if (err) {
        return console.log('Error on write: ', err)
    }
    console.log('message written')
})
/* console.log(port); */
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

parser.on('open', () => {
    console.log('Open connection');
})
parser.on('data', async (data) => {
    let nombresincortar = data
    let nombrecortado = nombresincortar.split(" ");
    let primernombre = nombrecortado[0];

    let dinamico;
    let estatico;

    if (primernombre == "dinamico:") dinamico = nombrecortado[1];
    else if (primernombre == "estatico:") estatico = nombrecortado[1];

    io.emit('arduino:data', {
        dinamico,
        estatico
    })

    let dataStatic = estatico !== undefined ? estatico : "0";
    let dataDynamic = dinamico !== undefined ? dinamico : "0";

    const dataSave = {
        dia: functions.formatDay(Date.now()),
        dataStatic,
        dataDynamic,
        fecha: Date.now()
    }

    /* await functions.execFirebase(dataSave); */

});




parser.on('error', (err) => {
    console.log('error:', err.message)
});

var corsOptions = {

    origin: '*',
    methods: "GET, PUT, DELETE, POST,HEAD,PATCH",
    optionsSuccessStatus: 204
}

app.use(cors(corsOptions));

app.use('/', cors(corsOptions), require('./routes/router'));

server.listen(3000, async () => {
    console.log('Server running');

})
