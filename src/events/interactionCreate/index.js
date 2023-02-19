import { Events } from 'discord.js'

export const event = {
    name: Events.InteractionCreate,
}

export const action = (interaction) => {
    console.log(interaction)
    if (!interaction.isChatInputCommand()) return

    interaction.commandName
}
