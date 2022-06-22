import { WebhookServer } from 'webhook-bot-js';

const server = new WebhookServer({
  application_id: '',
  token: '',
  public_key: '',
});

// events allow you to handle the raw interactions yourself
server.on('interactionReceived', interaction => {
  console.log(interaction.type);
});

server.once('interactionReceived', () => {
  console.log('Received first interaction');
});

server.start();
