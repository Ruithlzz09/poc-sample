require('dotenv').config();
var app = require('../../package.json');
const { env } = process;

const IS_TESTING = env.IS_TESTING === 'true';
const HOSTNAME = require('os').hostname();

module.exports = {
  DB_URL: IS_TESTING ? env.TEST_MONGODB_URI : env.MONGODB_URI,
  TEST_DBURL: env.TEST_MONGODB_URI,
  MAIN_DBURL: env.MONGODB_URI,
  PORT: parseInt(env.PORT) || 8020,
  ENABLE_LOGGING: env.ENABLE_LOGGING || true,
  LOGGER_VERBOSE: env.LOGGER_VERBOSE || false,
  PINO_LOG_LEVEL: env.PINO_LOG_LEVEL || 'info',
  MAX_LOGS: parseInt(env.MAX_LOGS),
  HOSTNAME,
  IS_TESTING,
  DEBUG_QUERIES: env.DEBUG_QUERIES === 'true',
  JWT_SECRET: env.JWT_SECRET,
  APP_NAME: env.APP_NAME || app.name,
};
