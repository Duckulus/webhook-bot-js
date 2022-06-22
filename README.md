## `webhook-bot-js`

A JavaScript library for creating Webhook-Based Discord Bots

### Installation:

`npm install webhook-bot-js`\
or\
`yarn add webhook-bot-js`

### Example:
````js
import { WebhookServer, CommandOption, getStringOption, CommandResponse } from "webhook-bot-js";

//create server by providing information about your application
const server = new WebhookServer({
    application_id: "APPLICATION_ID",
    token: "BOT_TOKEN",
    public_key: "APPLICATION_PUBLIC_KEY",
});

//register a slash command
server.registerSlashCommand({
    name: "hello",
    description: "Greet someone",
    options: [
        {
            name: "name",
            description: "The name of the person to greet",
            type: CommandOption.STRING,
            required: true,
        },
    ],
    execute: (interaction) => {
        const name = getStringOption(interaction, "name");
        return {
            type: CommandResponse.Message,
            data: {
                content: `Hello ${name}`,
            },
        };
    },
});

//register commands against discords api
server.pushGlobalApplicationCommands();

//start server
server.start();
````
More examples can be found in the [examples](examples) directory