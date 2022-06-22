import {
  WebhookServer,
  CommandOption,
  getStringOption,
  CommandResponse,
} from 'webhook-bot-js';

const server = new WebhookServer({
  application_id: '',
  token: '',
  public_key: '',
});

server.registerSlashCommand({
  name: 'hello',
  description: 'Greet someone',
  options: [
    {
      name: 'name',
      description: 'The name of the person to greet',
      type: CommandOption.STRING,
      required: true,
    },
  ],
  execute: interaction => {
    const name = getStringOption(interaction, 'name');
    return {
      type: CommandResponse.Message,
      data: {
        content: `Hello ${name}`,
      },
    };
  },
});

await server.pushGlobalApplicationCommands();

server.start();
