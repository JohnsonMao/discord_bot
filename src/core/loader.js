import { REST, Routes, Collection } from 'discord.js'

const updateSlashCommands = async (guildId, commands) => {
    const rest = new REST().setToken(process.env.TOKEN)

    const result = await rest.put(
        Routes.applicationGuildCommands(process.env.APP_ID, guildId),
        {
            body: commands,
        }
    )
}

export const loadCommands = async (guildId = process.env.GUILD_ID) => {
    const modules = import.meta.glob('@/commands/**/index.js')
    const actions = new Collection()
    const commands = (
        await Promise.all(Object.values(modules).map((module) => module()))
    ).map((module) => {
        actions.set(module.command.name, module.action)
        return module.command
    })

    await updateSlashCommands(guildId, commands)
}

export const loadEvents = async (client) => {
    const modules = import.meta.glob('@/events/**/index.js')
    const events = await Promise.all(
        Object.values(modules).map((module) => module())
    )
    events.map((module) => {
        client[module.once ? 'once' : 'on'](module.event.name, module.action)
    })
}
