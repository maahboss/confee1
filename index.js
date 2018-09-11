
const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const app = express();
const port = process.env.PORT || 3000;


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Session middleware

// Create an instance of Pusher
const pusher = new Pusher({
    appId: '596900',
    key: '8be839e56cdfbf5a4db6',
    secret: 'b9ec68ee62885ee07253',
    cluster: 'ap2',
    encrypted: true
});


app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html');
});

// get authentictation for the channel;
app.post('/pusher/auth', (req, res) => {
        const socketId = req.body.socket_id;
        const channel = req.body.channel_name;
        var presenceData = {
            user_id: Math.random().toString(36).slice(2) + Date.now()
        }
        const auth = pusher.authenticate(socketId, channel, presenceData);
        res.send(auth);
});

//listen on the app
app.listen(port,() => {
    console.log(`server is up on port: ${port}`);
  });
