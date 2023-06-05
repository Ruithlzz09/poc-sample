const pino = require('pino');
const {
  PINO_LOG_LEVEL,
  ENABLE_LOGGING,
  MAX_LOGS,
  LOGGER_VERBOSE,
} = require('./src/config');

const levels = {
  crit: 60,
  error: 50,
  warn: 40,
  info: 20,
};

let rotatingLogStream = require('file-stream-rotator').getStream({
  filename: `${__dirname}/logs/app-%DATE%`,
  frequency: 'daily',
  extension: '.log',
  max_logs: MAX_LOGS,
  date_format: 'YYYYMMDD',
  verbose: LOGGER_VERBOSE,
});

const streams = Object.keys(levels).map((level) => {
  return {
    level,
    stream: rotatingLogStream,
  };
});

const logger = pino(
  {
    level: PINO_LOG_LEVEL || 'info',
    customLevels: levels,
    useOnlyCustomLevels: true,
    formatters: {
      level: (label) => {
        return { level: label };
      },
    },
    enabled: ENABLE_LOGGING,
  },
  pino.multistream(streams, { levels, dedupe: true }),
);

const logs = (level, methodName, message) => {
  logger[level](`${methodName} - ${message}`);
};

module.exports = { logs };
