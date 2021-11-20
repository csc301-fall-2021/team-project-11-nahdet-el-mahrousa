const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const createDB = require('./gateways/db');
const jwt = require('jsonwebtoken');
const { JsonWebTokenError } = require('jsonwebtoken');

/**
 * A factory model to build an Express.js app.
 */
class AppFactory {
  /**
   * Build an Express.js app, register extensions, routes, and configurations.
   * @returns Express app
   */
  registerApp() {
    const app = express();
    this.configApp(app)
    this.registerExtensions(app);
    this.registerErrorHandler(app);
    this.registerGateways(app)
    this.registerRoutes(app);

    return app;
  }

  /**
   * Configure app from ./config with dotenv.
   * @param {*} app Express app
   */
  configApp(app) {
    dotenv.config({ path: `./config/.env.${process.env.NODE_ENV}` })
  }

  /**
   * App uses routers.
   * @param {*} app Express app
   */
  registerRoutes(app) {
    // Get Routers
    const indexRouter = require('./api/index');
    const botRouter = require('./api/client/bot');
    const adminBotRouter = require('./api/admin/bot');
    const userRouter = require('./api/auth/user')
    const authRouter = require('./api/auth/auth')

    // Register Routers
    app.use('/', indexRouter);
    app.use('/bot', botRouter);
    app.use('/admin', adminBotRouter);
    app.use('/user', userRouter)
    app.use('/auth', authRouter)
  }

  /**
   * Set up gateway connections.
   * @param {*} app 
   */
  async registerGateways(app) {
    // const dbHandler = new DBHandler()
    // await dbHandler.init(process.env.DATABASE_URI)
    const db = createDB(process.env.DATABASE_URI, process.env.MOCK)
    await db.connect()
    this.db = db
  }

  /**
   * App uses extensions.
   * @param {*} app Express app
   */
  registerExtensions(app) {
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(cors());
  }

  /**
   * App uses error handlers.
   * @param {*} app Express app
   */
  registerErrorHandler(app) {
    // catch 404 and forward to error handler
    // app.use(function (req, res, next) {
    //   next(createError(404));
    // });

    // // error handler
    // app.use(function (err, req, res) {
    //   // set locals, only providing error in development
    //   res.locals.message = err.message;
    //   res.locals.error = req.app.get('env') === 'development' ? err : {};

    //   // render the error page
    //   res.status(err.status || 500);
    //   res.send(err);
    // });
  }
}

const appFactory = new AppFactory();

const app = appFactory.registerApp();

module.exports = app
