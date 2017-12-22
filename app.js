
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

//Создание приложения
//Функция для обработки всех приходящих запросов!!
var app = express();
app.set('port', 3000);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

//Обработчик - Middleware Для реагирования на запросы
app.use((req, res, next) => {
  if(req.url === '/'){
    res.end('Hello');
  }else {
    next();
  }
})

app.use((req, res, next) => {
  if(req.url === '/test'){
    res.end('Test');
  }else {
    next();
  }
})

//Метод send - это метод который добавляется фреймворком express
app.use((req, res, next) => {
  res.send(404, 'Page is not found!!!');
})

// var routes = require('./routes');
// var user = require('./routes/user');

// // all environments
// app.set('port', process.env.PORT || 3000);
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(express.cookieParser('your secret here'));
// app.use(express.session());
// app.use(app.router);
// app.use(express.static(path.join(__dirname, 'public')));

// // development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }

// app.get('/', routes.index);
// app.get('/users', user.list);
