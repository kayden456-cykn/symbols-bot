import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";
import * as symbolsCommand from "./commands/symbols.js";
import * as solveCommand from "./commands/solve.js";
if (!process.env.DISCORD_TOKEN) throw new Error("Missing DISCORD_TOKEN.");
const commands=new Map([[symbolsCommand.data.name,symbolsCommand],[solveCommand.data.name,solveCommand]]);
const client=new Client({intents:[GatewayIntentBits.Guilds]});
client.once(Events.ClientReady,c=>console.log("Logged in as "+c.user.tag));
client.on(Events.InteractionCreate,async interaction=>{
 if (!interaction.isChatInputCommand()) return;
 const command=commands.get(interaction.commandName); if (!command) return;
 try { await command.execute(interaction); }
 catch(error) {
  console.error("Command failed:",error);
  const reply={content:"Something went wrong. Check the bot logs.",ephemeral:true};
  if (interaction.replied || interaction.deferred) await interaction.followUp(reply).catch(()=>{});
  else await interaction.reply(reply).catch(()=>{});
 }
});
client.login(process.env.DISCORD_TOKEN);
