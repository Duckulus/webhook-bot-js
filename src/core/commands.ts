import { SlashCommand } from './commandTypes';
import {
  APIApplicationCommandInteraction,
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  ApplicationCommandType,
} from 'discord-api-types/v10';

export const slashCommands: { [name: string]: SlashCommand } = {};

export const handleCommand = async (
  commandInteraction: APIApplicationCommandInteraction
): Promise<APIInteractionResponse | undefined> => {
  const command = commandInteraction.data;

  switch (command.type) {
    case ApplicationCommandType.ChatInput:
      const cmd = slashCommands[command.name];
      if (!cmd) return;
      return cmd.execute(
        commandInteraction as APIChatInputApplicationCommandInteraction
      );
  }

  return undefined;
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

  return commands;
};
