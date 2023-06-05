const express = require('express');
const helmet = require('helmet');
const http = require('http');
const { PORT, IS_TESTING, APP_NAME } = require('./config');
const { databaseConnection } = require('./database');
const server = require('./server');
const { logs } = require('../logger');

const app = express();
app.set('port', PORT);
app.set('trust proxy', true);

app.disable('etag').disable('x-powered-by');
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('Cache-Control', 'no-store');
  res.header('Pragma', 'no-cache');
  next();
});

app.use(express.json());
const httpserver = http.createServer(app);
const methodName = '[main]';

if (!IS_TESTING) {
  databaseConnection().then(() => {
    logs(
      'info',
      methodName,
      `Spinning up the ${APP_NAME} app on PORT: ${PORT}`,
    );
    server(app);

    httpserver
      .listen(PORT, () => {
        Promise.resolve()
          .then(() => {
            logs('info', methodName, 'Intializing App');
          })
          .catch(async (err) => {
            logs('error', methodName, `${err.stack || err}`);
            process.exit(1);
          });
        logs(
          'info',
          methodName,
          `${APP_NAME} app is listening to port ${PORT}`,
        );
      })
      .on('error', (err) => {
        logs('error', methodName, `Error: ${err.stack || err}`);
        process.exit(1);
      });
  });
  process.on('uncaughtException', async (err) => {
    logs('error', methodName, `There was an uncaught error: => ${err}`);
    process.exit(1);
  });

  process.on('unhandledRejection', async (reason, p) => {
    logs(
      'error',
      methodName,
      `Unhandled Rejection at: ${JSON.stringify(p)}, reason:, ${
        reason.stack || reason
      }`,
    );
    process.exit(1);
  });

  process.on('SIGINT', () => {
    logs('info', methodName, 'clean up done');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    process.exit(0);
  });
} else {
  logs(
    'info',
    methodName,
    `Spinning up the ${APP_NAME} app for testing on PORT: ${PORT}`,
  );
  databaseConnection().then(() => {
    server(app);

    httpserver
      .listen(PORT, () => {
        logs(
          'info',
          methodName,
          `${APP_NAME} activated in testing mode and listening to port ${PORT}`,
        );
      })
      .on('error', (err) => {
        logs('error', methodName, `${err.stack || err}`);
        process.exit();
      });
  });
}

module.exports = app;
