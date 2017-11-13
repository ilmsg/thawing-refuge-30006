
const url = require('url');
const http = require('http');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const compression = require('compression');
const flash = require('express-flash');
const helmet = require('helmet')

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const mongodb_uri = process.env.MONGODB_URI || 'mongodb://localhost/blog';
const mongodb_options = { useMongoClient: true };

mongoose.connect(mongodb_uri, mongodb_options);
mongoose.connection.on('error', (err) => { console.log(err) });
mongoose.connection.on('open', (ref) => { console.log( 'Connected: ' + mongodb_uri ) })
mongoose.connection.on('disconnected', () => { console.log('disconnected.') });

const Archive = require('./models/archive');
const Page = require('./models/page');
const Post = require('./models/post');

const helper = require('./helper');

const moment = require('moment');
moment.locale('th');

const app = express();

app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', '/img/favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	cookie: { maxAge: 86400 * 1000 },
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(helmet());
app.use(flash());
app.use(compression({level: 6}));
app.use(async (req, res, next) => {
	const url_parts = url.parse(req.url, true);
	res.locals.uri = url_parts.pathname;
	res.locals.base_url = req.protocol + '://' + req.get('host');
	res.locals.current_url = res.locals.base_url + res.locals.uri;

	res.locals.site = {
		title: 'เว็บบล็อก'
	};

	res.locals.getPicture = (picture) => { return typeof picture != 'undefined' ? picture.path : '/img/nopicture.jpg' }
	res.locals.moment = moment;
	res.locals.user = req.session.user || '';

	try{
		res.locals.archives = await Archive.find().sort({slug: -1});
		res.locals.pages = await Page.find().sort({order:1});
		res.locals.latest_posts = await Post.find().limit(5).sort({created_at:1});
	}catch(err){
		return next(err);
	}

  return next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', 					require('./routes/post'));
app.use('/pages', 					require('./routes/page'));
app.use('/users/contacts', 	helper.auth, require('./routes/user/contact'));
app.use('/users/posts', 		helper.auth, require('./routes/user/post'));
app.use('/users/pages', 		helper.auth, require('./routes/user/page'));
app.use('/users', 					require('./routes/user/index'));
app.use('/', 								require('./routes/index'));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

const server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

const io = require('socket.io').listen(server);

module.exports = app;
