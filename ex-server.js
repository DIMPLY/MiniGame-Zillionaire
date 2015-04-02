var express = require('express');
var path = require('path');
var lessMiddleware = require('less-middleware');
var app = express();
app.use(lessMiddleware(path.join(__dirname,'public'),{
    force:true,
    //compress:true,
    debug:true
}));
app.use(express.static(path.join(__dirname,'public')));

app.all('/', function(req, res){
    res.sendFile('index.html',{root:__dirname});
});
app.all('/:file', function(req, res){
    res.sendFile(req.params.file,{root:__dirname});
});

app.get('/templates/:tmp', function(req, res){
    res.sendFile(req.params.tmp, {
        root : path.join(__dirname, 'templates')
    });
});

app.listen(8000);