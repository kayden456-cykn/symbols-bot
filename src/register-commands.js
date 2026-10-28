import "dotenv/config";
import { REST, Routes } from "discord.js";
import { data as symbolsCommand } from "./commands/symbols.js";
import { data as solveCommand } from "./commands/solve.js";
const {DISCORD_TOKEN,DISCORD_CLIENT_ID,DISCORD_GUILD_ID}=process.env;
if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !DISCORD_GUILD_ID) throw new Error("Missing required .env values.");
const rest=new REST({version:"10"}).setToken(DISCORD_TOKEN);
await rest.put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID,DISCORD_GUILD_ID),{body:[symbolsCommand.toJSON(),solveCommand.toJSON()]});
console.log("Registered /symbols and /solve.");
