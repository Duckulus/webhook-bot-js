import {
  APIInteraction,
  APIInteractionResponse,
  InteractionResponseType,
  InteractionType,
} from 'discord-api-types/v10';

export const handleInteraction = async (
  interaction: APIInteraction
): Promise<APIInteractionResponse | undefined> => {
  switch (interaction.type) {
    case InteractionType.Ping:
      return {
        type: InteractionResponseType.Pong,
      };
  }
  return;
};
