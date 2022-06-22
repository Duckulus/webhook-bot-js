import { CommandResponse, WebhookServer } from 'webhook-bot-js';

const server = new WebhookServer({
  application_id: '',
  token: '',
  public_key: '',
});

// messagecommands can be accessed in the context menu when rightclicking a message in a guild
server.registerMessageCommand({
  name: 'reversed',
  execute: interaction => {
    const msg = interaction.data.resolved.messages[interaction.data.target_id];
    return {
      type: CommandResponse.Message,
      data: {
        content: reversed(msg.content),
      },
    };
  },
});

const reversed = s => {
  return s
    .split('')
    .reverse()
    .join('');
};

await server.pushGlobalApplicationCommands();

server.start();
