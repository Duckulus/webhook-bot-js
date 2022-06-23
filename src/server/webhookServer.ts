import express, { Express } from 'express';
import { auth } from '../auth/authMiddleware';
import { APIInteraction, Routes } from 'discord-api-types/v10';
import { handleInteraction } from '../core/handler';
import {
  getCommands,
  messageCommands,
  slashCommands,
  userCommands,
} from '../core/commands';
import {
  MessageCommand,
  SlashCommand,
  UserCommand,
} from '../core/commandTypes';
import { REST } from '@discordjs/rest';
import { logger } from '../utils/logger';
import EventEmitter from 'events';

export class WebhookServer extends EventEmitter {
  private app: Express;
  private rest: REST;
  public readonly port: number;
  private readonly token: string;
  private readonly application_id;
  private readonly public_key;

  /**
   * Creates a new WebhookServer
   * @param options Options for the Server
   */
  constructor(options?: ServerOptions) {
    super();
    this.app = express();
    this.port = options?.port || 3600;
    this.token = options?.token || '';
    this.application_id = options?.application_id || '';
    this.public_key = options?.public_key || '';
    this.rest = new REST({
      version: '10',
    }).setToken(this.token);
  }

  /**
   * Adds a SlashCommand to be registered.
   * This method does NOT interact with Discord in any way.
   * @param command The SlashCommand
   */
  registerSlashCommand(command: SlashCommand) {
    slashCommands[command.name] = command;
  }

  /**
   * Adds a UserCommand to be registered.
   * This method does NOT interact with Discord in any way.
   * @param command The UserCommand
   */
  registerUserCommand(command: UserCommand) {
    userCommands[command.name] = command;
  }

  /**
   * Adds a MessageCommand to be registered.
   * This method does NOT interact with Discord in any way.
   * @param command The MessageCommand
   */
  registerMessageCommand(command: MessageCommand) {
    messageCommands[command.name] = command;
  }

  /**
   * Overwrites all global Application Commands
   */
  async pushGlobalApplicationCommands() {
    const commands = getCommands();

    try {
      await this.rest.put(Routes['applicationCommands'](this.application_id), {
        body: commands,
      });
      logger.info(`Succesfully overwrote application commands globally`);
    } catch (e) {
      logger.error(`Error registering application commands globally`);
      logger.error(e);
    }
  }

  /**
   * Overwrites all Application Commands in the specified guild
   */
  async pushGuildApplicationCommands(guildId: string) {
    const commands = getCommands();

    try {
      await this.rest.put(
        Routes['applicationGuildCommands'](this.application_id, guildId),
        {
          body: commands,
        }
      );
      logger.info(`Succesfully overwrote application commands in guild`);
    } catch (e) {
      logger.error(`Error registering application commands in guild`);
      logger.error(e);
    }
  }

  /**
   * Runs the Server on "/" on the specified Port.
   * Incoming request are automatically verified using the provided public key
   */
  start() {
    this.app.use(express.json());
    this.app.use(auth(this.public_key));

    this.app.post('/', async (req, res) => {
      const interaction = req.body as APIInteraction;
      this.emit('interactionReceived', interaction);
      res.status(200).send(await handleInteraction(interaction));
    });

    this.app.listen(this.port, () => {
      logger.info(`Server listening on ${this.port}`);
    });
  }
}

export type ServerOptions = {
  port?: number;
  token?: string;
  application_id?: string;
  public_key?: string;
};
