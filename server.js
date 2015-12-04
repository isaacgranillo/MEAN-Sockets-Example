var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.get('/', function(req, res){
	res.render('index');	
})


var server = app.listen(8000, function(){
	console.log('listening on port 8000');
})

var counter = 0;
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
	// console.log(socket.id)

	socket.on('clicking_epic', function(){
		counter++
		// console.log(counter)

	io.emit('updated_count', counter)
	

	socket.on('clicking_reset', function(){
		counter = 0;
		// console.log(counter)
	

	io.emit('reset_count', counter)


		})

	})

})




