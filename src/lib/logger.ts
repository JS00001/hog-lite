import { consoleTransport, logger as RNLogger } from 'react-native-logs';

export type LogLevels = 'debug' | 'info' | 'warn' | 'error';

export const logger = RNLogger.createLogger({
  async: false,
  printDate: false,
  transport: consoleTransport,
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  transportOptions: {
    colors: {
      debug: 'grey',
      info: 'grey',
      warn: 'yellowBright',
      error: 'redBright',
    },
    extensionColors: {
      Websocket: 'magentaBright',
      Http: 'greenBright',
    },
  },
});

export const httpLogger = logger.extend('Http');
