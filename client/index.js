const readline = require('readline');
let io = require('socket.io-client')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var socketIdList = [];
function takeInput () {
    rl.question('Please enter the number of clients ? ', function(clientNumber) {
        let numberOfClient = parseInt(clientNumber);
        if(isNaN(numberOfClient)){
            console.log('Invalid Input')
            return takeInput();
        }
        rl.question('Data sending interval rate in Seconds ? ', function(seconds) {
            let intervalrate = parseInt(seconds)
            if(isNaN(intervalrate)){
                console.log('Invalid Input please start again')
                return takeInput();
            }
            for (let i = 0; i < clientNumber; i++){
                let socketConnection = io.connect('http://localhost:3300', {reconnect: true});

                // Add a connect listener
                socketConnection.on('connect', function (socket) {
                    console.log('Connected!', socketConnection);
                    
                    socketIdList.push(socketConnection);
                });
            }
            setInterval(function(){
                sendDataToserver(seconds)
            },seconds*1000);
        });
    });
}

function sendDataToserver(seconds){
    socketIdList.forEach( socketClient => socketClient.emit('data', {clientId:`${socketClient.id}`,message:`data stream`}));
}
takeInput();
