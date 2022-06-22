import express, { Express } from 'express';
import { auth } from '../auth/authMiddleware';
import { APIInteraction, Routes } from 'discord-api-types/v10';
import { handleInteraction } from '../core/handler';
import { getCommands, slashCommands, userCommands } from '../core/commands';
import { SlashCommand, UserCommand } from '../core/commandTypes';
import { REST } from '@discordjs/rest';

export class WebhookServer {
  private app: Express;
  private rest: REST;
  public readonly port: number;
  private readonly token: string;
  private readonly application_id;
  private readonly public_key;

  constructor(options?: ServerOptions) {
    this.app = express();
    this.port = options?.port || 3600;
    this.token = options?.token || '';
    this.application_id = options?.application_id || '';
    this.public_key = options?.public_key || '';
    this.rest = new REST({
      version: '10',
    }).setToken(this.token);
  }

  registerSlashCommand(command: SlashCommand) {
    slashCommands[command.name] = command;
  }

  registerUserCommand(command: UserCommand) {
    userCommands[command.name] = command;
  }

  async pushGlobalApplicationCommands() {
    const commands = getCommands();

    try {
      await this.rest.put(Routes['applicationCommands'](this.application_id), {
        body: commands,
      });
      console.log(`Succesfully overwrote application commands globally`);
    } catch (e) {
      console.log(`Error registering application commands globally`);
      console.log(e);
    }
  }

  async pushGuildApplicationCommands(guildId: string) {
    const commands = getCommands();

    try {
      await this.rest.put(
        Routes['applicationGuildCommands'](this.application_id, guildId),
        {
          body: commands,
        }
      );
      console.log(`Succesfully overwrote application commands in guild`);
    } catch (e) {
      console.log(`Error registering application commands in guild`);
      console.log(e);
    }
  }

  start() {
    this.app.use(express.json());
    this.app.use(auth(this.public_key));

    this.app.post('/', async (req, res) => {
      const interaction = req.body as APIInteraction;
      res.status(200).send(await handleInteraction(interaction));
    });

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
