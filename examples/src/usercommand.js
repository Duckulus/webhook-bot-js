import { CommandResponse, WebhookServer } from 'webhook-bot-js';

const server = new WebhookServer({
  application_id: '',
  token: '',
  public_key: '',
});

// usercommands can be accessed in the context menu when rightclicking a user in a guild
server.registerUserCommand({
  name: 'ping',
  execute: interaction => {
    return {
      type: CommandResponse.Message,
      data: {
        content: `<@${interaction.data.target_id}>`,
      },
    };
  },
});

await server.pushGlobalApplicationCommands();

server.start();
