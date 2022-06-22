import { Logger } from 'tslog';

export const logger = new Logger({
  name: 'webhook-bot-js',
  type: 'pretty',
  colorizePrettyLogs: true,
  displayFunctionName: false,
  displayFilePath: 'hidden',
});
