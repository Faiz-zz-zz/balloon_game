var express = require('express')
var app = express()
var path = require('path')
var Pusher = require('pusher')
var bodyParser = require('body-parser')
var config = {
    app_id : "264657",
    key : "7a1bfccdbcc30d3a4853",
    secret : "5e02d1462b3a7160f8dd"
}
var pusher = new Pusher(config)
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})
app.use(bodyParser.urlencoded({extended: true} ))
app.post('/pusher/auth', function(req, res) {
    var socketId = req.body.socket_id;
    var channel = req.body.channel_name;
    var auth = pusher.authenticate(socketId, channel);
    res.send(auth);
})
app.use(express.static('public'));
app.listen(8080)
