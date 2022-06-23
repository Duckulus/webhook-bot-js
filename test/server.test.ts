import { WebhookServer } from '../dist';

describe('server', () => {
  it('works', () => {
    const server = new WebhookServer({
      port: 3000,
    });
    expect(server.port).toEqual(3000);
  });
});
