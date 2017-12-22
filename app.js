//Module dependencies.
const express = require('express');
const http = require('http');
const path = require('path');
const config = require('./config');
const log = require('./libs/log')(module);

//Создание приложения
//Функция для обработки всех приходящих запросов!!
const app = express();

//Шаблоны
app.set('views', __dirname + '/templates');

//Движок для шаблонов, может быть и другой.
app.set('view engine', 'ejs');

app.use(express.favicon());

// Стандартный логгер. dev - это формат логгирования, есть другие
if (app.get('env') === 'development') {
  app.use(express.logger('dev'));
}else {
  app.use(express.logger('default'));
}

//Читает тело запроса (form, json). Данные доступны в req.body....
app.use(express.bodyParser());

//Парсер для cookie
app.use(express.cookieParser('your secret here'));

//Говорит о том какие запросы как будут обработаны в зависимости от URL и типа метода
app.use(app.router);
//Например для метода get
app.get('/', (req, res, next) => {
  res.render('index', {
    title: 'chat application',
    body: '<b>Hello<b>'
  });
});

app.use(express.static(path.join(__dirname, 'public')));

//Обработчик ошибок - имеет четыре аргумента!!!
app.use((err, req, res, next) => {
  //NODE_ENV = 'production'   -   значение в реальной жизни
  if (app.get('env') === 'development'){
    //Встроенный обработчик
    //app.use(express.errorHandler());
    const errorHandler = express.errorHandler();
    errorHandler(err, req, res, next);
  }else {
    res.send(500);
  }
});


http.createServer(app).listen(config.get('port'), () => {
  log.info('Express server listening on port ' + config.get('port'));
});



// var routes = require('./routes');
// var user = require('./routes/user');

// app.get('/', routes.index);
// app.get('/users', user.list);


// //Обработчик - Middleware - Для реагирования на запросы
// app.use((req, res, next) => {
//   if(req.url === '/'){
//     res.end('Hello');
//   }else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   if(req.url === '/forbidden'){
//     next(new Error('Oops, access denied!'));
//   }else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   if(req.url === '/test'){
//     res.end('Test');
//   }else {
//     next();
//   }
// });

// //Метод send - это метод который добавляется фреймворком express
// app.use((req, res) => {
//   res.send(404, 'Page is not found!!!');
// });