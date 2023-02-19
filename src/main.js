import { Client, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'
import { loadCommands, loadEvents } from './core/loader'

dotenv.config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

loadCommands()
loadEvents(client)

client.login(process.env.TOKEN)
