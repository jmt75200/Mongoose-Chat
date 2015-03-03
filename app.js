var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
  username: String,
  message: String,
  timestamp: Date
});

var Chat = mongoose.model('Chat', chatSchema);
//model name also sets collection name to 'chat'

var Cat = mongoose.model('Cat', { name: String });

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  // //saves new kitty object into mongo db
  // var kitty = new Cat({ name: 'Zildjian' });
  // kitty.save(function (err) {
  //   if (err) // ...
  //   console.log('meow');
  // });

  // //find all cats
  // Cat.find(function (err, cats){
  //   if (err) throw err;
  //   res.json(cats);
  // });

  res.send('Hello Clarice!');
});

app.get('/chat/:username', function (req, res) {

  //If username is not defined send empty string
  var username = req.params.username || "";

  //find all cats
  Chat.find(function (err, chats){
    if (err) throw err;
    res.render('chats', {chats : chats, username : username});
  });

  // res.send('Hello Clarice!');
});

app.post('/chat', function (req, res){
  var username = req.body.username;
  var message = req.body.message;

  var chat = new Chat(
    {
      username : username,
      message : message
    }
  );

  //save obj to db now
  chat.save(function (err){
    if (err) throw err;
    res.redirect("/chat/" +username);
  });
});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});