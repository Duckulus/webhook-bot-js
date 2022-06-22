import express, { Express } from 'express';
import { auth } from '../auth/authMiddleware';

export class WebhookServer {
  private app: Express;
  public readonly port: number;
  // private token: string;
  // private application_id;
  private readonly public_key;

  constructor(options?: ServerOptions) {
    this.app = express();
    this.port = options?.port || 3600;
    // this.token = options.token || '';
    // this.application_id = options.application_id || '';
    this.public_key = options?.public_key || '';
  }

  start() {
    this.app.use(express.json());
    this.app.use(auth(this.public_key));

    this.app.listen(this.port, () => {
      console.log(`Server listening on ${this.port}`);
    });
  }
}

export type ServerOptions = {
  port?: number;
  token?: string;
  application_id?: string;
  public_key?: string;
};
