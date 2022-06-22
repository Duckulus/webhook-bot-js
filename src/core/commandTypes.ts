import {
  APIApplicationCommandOption,
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
} from 'discord-api-types/v10';

export type SlashCommand = {
  name: string;
  description: string;
  options: APIApplicationCommandOption[];
  execute: (
    interaction: APIChatInputApplicationCommandInteraction
  ) => APIInteractionResponse;
};
