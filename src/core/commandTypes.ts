import {
  APIApplicationCommandOption,
  APIChatInputApplicationCommandInteraction,
  APIInteractionResponse,
  APIMessageApplicationCommandInteraction,
  APIUserApplicationCommandInteraction,
} from 'discord-api-types/v10';

export type SlashCommand = {
  name: string;
  description: string;
  options: APIApplicationCommandOption[];
  execute: (
    interaction: APIChatInputApplicationCommandInteraction
  ) => APIInteractionResponse;
};

export type UserCommand = {
  name: string;
  execute: (
    interaction: APIUserApplicationCommandInteraction
  ) => APIInteractionResponse;
};

export type MessageCommand = {
  name: string;
  execute: (
    interaction: APIMessageApplicationCommandInteraction
  ) => APIInteractionResponse;
};
