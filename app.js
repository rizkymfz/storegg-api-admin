import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import db from './db/index.js'
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import http from 'http';
import path from "path";
import logger from 'morgan';
import createError from 'http-errors';
import session from 'express-session';
import flash from 'connect-flash';

//router controller xxx
import dashboardRouter from "./app/dashboard/router.js";
import categoryRouter from'./app/category/router.js';
import nominalRouter from './app/nominal/router.js';
import voucherRouter from './app/voucher/router.js';
import bankRouter from './app/bank/router.js';
import paymentRouter from './app/payment/router.js';
import usersRouter from './app/users/router.js';
import transactionRouter from './app/transaction/router.js';
import playerRouter from './app/player/router.js';
import authRouter from './app/auth/router.js';
import { fileURLToPath } from 'url';
//endrouter
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Database Connected'));

var app = express();
const server = http.createServer(app);
const port = process.env.PORT || '3000';
var URL = `/api/v1`
app.use(cors())

app.locals.title = 'Dashboard Storegg'
app.locals.name = 'Admin'
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))
app.use(flash())
app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/adminlte', express.static(path.join(__dirname, '/node_modules/admin-lte/')));

app.use('/', usersRouter);
app.use('/dashboard', dashboardRouter);
app.use('/category', categoryRouter);
app.use('/nominal', nominalRouter);
app.use('/voucher', voucherRouter);
app.use('/bank', bankRouter);
app.use('/payment', paymentRouter);
app.use('/transaction', transactionRouter);

//API
app.use(`${URL}/players`, playerRouter)
app.use(`${URL}/auth`, authRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.locals.auth = req.session.user
  app.locals.name = req.session.user.name
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(port, () => console.log(`Server Running at port: ${port}`));

export default app;
