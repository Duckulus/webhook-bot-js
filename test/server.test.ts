/**
 * @jest-environment node
 */
import { WebhookServer } from '../src';

describe('server', () => {
  it('works', () => {
    const port = 5432;
    const server = new WebhookServer({
      port: port,
    });
    expect(server.port).toEqual(port);
  });
});
