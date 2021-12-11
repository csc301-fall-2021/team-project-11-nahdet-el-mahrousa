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
    this.registerGateways(app)
    this.registerRoutes(app);

    return app;
  }

  /**
   * Configure app from ./config with dotenv.
   * @param {*} app Express app
   */
  configApp(app) {
    const envFile = `.env`
    dotenv.config({ path: `./config/${envFile}` })
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
    const statisticsRouter = require('./api/statistics/retrieve')

    // Register Routers
    app.use('/', indexRouter);
    app.use('/bot', botRouter);
    app.use('/admin', adminBotRouter);
    app.use('/user', userRouter)
    app.use('/auth', authRouter)
    app.use('/statistics', statisticsRouter)
  }

  /**
   * Set up gateway connections.
   * @param {*} app 
   */
  async registerGateways(app) {
    // const dbHandler = new DBHandler()
    // await dbHandler.init(process.env.DATABASE_URI)
    const db = createDB(process.env.DATABASE_URI, process.env.MOCK || false)
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
    // app.use(express.static(path.join(__dirname, 'public')));
    app.use(cors());
  }
}

const appFactory = new AppFactory();

const app = appFactory.registerApp();

module.exports = app
