const express = require('express');
const cors = require('cors');
const app = express();

//Extrai o servidor http criado com express(app)
const server = require('http').Server(app);
//Habilita no nosso servidor ouça o protocolo ws protocolo web socket
const io = require('socket.io')(server, {
  cors: {
    methods: ["GET", "POST"]
  }
});

//Cria um middleware. Envia informações em tempo real
app.use((req, res, next) => {
  //Cria uma variavel dentro do req
  req.io = io;

  return next();
});
app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(3000, () => {
  console.log('Server started on port 3000');
});