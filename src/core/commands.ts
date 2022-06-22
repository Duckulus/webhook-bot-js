import { MessageCommand, SlashCommand, UserCommand } from './commandTypes';
import {
  APIApplicationCommandInteraction,
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  APIMessageApplicationCommandInteraction,
  APIUserApplicationCommandInteraction,
  ApplicationCommandType,
} from 'discord-api-types/v10';

export const slashCommands: { [name: string]: SlashCommand } = {};
export const userCommands: { [name: string]: UserCommand } = {};
export const messageCommands: { [name: string]: MessageCommand } = {};

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
    case ApplicationCommandType.Message:
      const messageCommand = messageCommands[command.name];
      if (!messageCommand) return;
      return messageCommand.execute(
        commandInteraction as APIMessageApplicationCommandInteraction
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

  Object.values(messageCommands).forEach(cmd => {
    commands.push({
      name: cmd.name,
      type: ApplicationCommandType.Message,
    });
  });

  return commands;
};
