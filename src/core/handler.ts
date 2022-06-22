import {
  APIApplicationCommandInteraction,
  APIInteraction,
  APIInteractionResponse,
  InteractionResponseType,
  InteractionType,
} from 'discord-api-types/v10';
import { handleCommand } from './commands';

export const handleInteraction = async (
  interaction: APIInteraction
): Promise<APIInteractionResponse | undefined> => {
  switch (interaction.type) {
    case InteractionType.Ping:
      return {
        type: InteractionResponseType.Pong,
      };
    case InteractionType.ApplicationCommand:
      return await handleCommand(
        interaction as APIApplicationCommandInteraction
      );
  }
  return;
};
