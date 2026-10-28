import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { symbols } from "../data/symbols.ts";

export const data = new SlashCommandBuilder()
 .setName("symbols").setDescription("Show the latest symbols in the database.")
 .addStringOption(o => o.setName("name").setDescription("Optional symbol name or ID").setRequired(false));

export async function execute(interaction) {
 const query = interaction.options.getString("name")?.trim().toLowerCase();
 if (!symbols.length) return interaction.reply({content:"No symbols have been added yet. Add verified symbols to src/data/symbols.ts.", ephemeral:true});
 if (query) {
  const found = symbols.find(s => s.id.toLowerCase() === query || s.name.toLowerCase() === query || (s.aliases || []).some(a => a.toLowerCase() === query));
  if (!found) return interaction.reply({content:"Symbol not found. Run /symbols to list the current database.", ephemeral:true});
  const embed = new EmbedBuilder().setColor(0xE53935).setTitle(found.name).setDescription(found.description || "No description added.")
   .addFields({name:"Symbol ID",value:"`" + found.id + "`"}).setFooter({text:"Animal Company • Current symbol database"});
  return interaction.reply({embeds:[embed],ephemeral:true});
 }
 const embeds = [];
 for (let i=0; i<symbols.length && i<100; i+=20) {
  const page = symbols.slice(i,i+20);
  embeds.push(new EmbedBuilder().setColor(0xE53935).setTitle(i===0 ? "Latest Animal Company Symbols" : "Latest Animal Company Symbols (page " + (i/20+1) + ")")
   .setDescription(page.map(s => "• **" + s.name + "** — `" + s.id + "`" + (s.description ? "\n  " + s.description : "")).join("\n").slice(0,4000))
   .setFooter({text:"Current database • " + symbols.length + " symbols"}));
 }
 return interaction.reply({embeds,ephemeral:true});
}
