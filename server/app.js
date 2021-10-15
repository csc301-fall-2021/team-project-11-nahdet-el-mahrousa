const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

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
    this.registerRoutes(app);
    this.registerErrorHandler(app);

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

    // Register Routers
    app.use('/', indexRouter);
    app.use('/bot', botRouter);
  }

  /**
   * App uses extensions.
   * @param {*} app Express app
   */
  registerExtensions(app) {
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
  }

  /**
   * App uses error handlers.
   * @param {*} app Express app
   */
  registerErrorHandler(app) {
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function(err, req, res) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.send(err);
    });
  }
}

const appFactory = new AppFactory();

const app = appFactory.registerApp();

module.exports = app;
