import { SlashCommand, UserCommand } from './commandTypes';
import {
  APIApplicationCommandInteraction,
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  APIUserApplicationCommandInteraction,
  ApplicationCommandType,
} from 'discord-api-types/v10';

export const slashCommands: { [name: string]: SlashCommand } = {};
export const userCommands: { [name: string]: UserCommand } = {};

export const handleCommand = async (
  commandInteraction: APIApplicationCommandInteraction
): Promise<APIInteractionResponse | undefined> => {
  const command = commandInteraction.data;

  switch (command.type) {
    case ApplicationCommandType.ChatInput:
      const slashCommand = slashCommands[command.name];
      if (!slashCommand) return;
      return slashCommand.execute(
        commandInteraction as APIChatInputApplicationCommandInteraction
      );
    case ApplicationCommandType.User:
      const userCommand = userCommands[command.name];
      if (!userCommand) return;
      return userCommand.execute(
        commandInteraction as APIUserApplicationCommandInteraction
      );
  }

  return;
};

export const getCommands = () => {
  const commands: any[] = [];

  Object.values(slashCommands).forEach(cmd => {
    commands.push({
      name: cmd.name,
      type: ApplicationCommandType.ChatInput,
      description: cmd.description,
      options: cmd.options,
    });
  });

  Object.values(userCommands).forEach(cmd => {
    commands.push({
      name: cmd.name,
      type: ApplicationCommandType.User,
    });
  });

  return commands;
};
