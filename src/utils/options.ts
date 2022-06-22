import { APIChatInputApplicationCommandInteraction } from 'discord-api-types/v10';

export const getOption = (
  interaction: APIChatInputApplicationCommandInteraction,
  name: string
) => {
  return (interaction.data.options?.find(option => option.name === name) as any)
    .value;
};

export const getStringOption = (
  interaction: APIChatInputApplicationCommandInteraction,
  name: string
) => {
  return getOption(interaction, name) as string;
};
