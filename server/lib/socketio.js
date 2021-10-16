const logger = require('../utils/logger').logger;
const socket_io = require('socket.io');
const alreadyRunningClient = [];
let io = socket_io();

io.on('connection', (socket) => {
  let socketID = socket.id;
  logger.info('net socket client connected with socketId',socketID);
  socket.on('data', (msg) => {
    if (alreadyRunningClient.length == 0) {
      logger.debug('subscribe: ', socketID);
      alreadyRunningClient.push(socketID);
    } else {
      alreadyRunningClient.push(socketID);
    }
    logger.info('#################*************   message from client   *************###################', msg.clientId,msg.message);
  });

  socket.once('disconnect', () => {
    logger.debug('diconnected socket ', socketID);
    alreadyRunningClient.splice(alreadyRunningClient.indexOf(socketID), 1);
  });
});

giveSocket = () => {
  return io;
};

exports.giveSocket = giveSocket;
