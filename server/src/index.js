const app = require('./server');
const connect = require('./config/db');

const start = async ()=>{
    await connect();
    app.listen(1105, ()=>{
        console.log('listening to port 1105');
    });
};

start();