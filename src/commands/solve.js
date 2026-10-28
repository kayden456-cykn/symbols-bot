import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { solutions, symbols } from "../data/symbols.ts";

export const data = new SlashCommandBuilder().setName("solve").setDescription("Look up a saved puzzle sequence.")
 .addStringOption(o => o.setName("puzzle").setDescription("Puzzle name or ID").setRequired(true));

export async function execute(interaction) {
 const query = interaction.options.getString("puzzle", true).trim().toLowerCase();
 const found = solutions.find(s => s.id.toLowerCase() === query || s.name.toLowerCase() === query);
 if (!found) return interaction.reply({content:solutions.length ? "No saved solution found for that puzzle." : "No verified puzzle solutions have been added yet.",ephemeral:true});
 const labels = found.symbols.map(id => { const s=symbols.find(x=>x.id===id); return s ? s.name : "Unknown symbol ("+id+")"; });
 const embed = new EmbedBuilder().setColor(0xE53935).setTitle(found.name)
  .setDescription(labels.map((n,i) => "**"+(i+1)+".** "+n).join("\n") || "No sequence saved.")
  .addFields({name:"Sequence IDs",value:found.symbols.map(id=>"`"+id+"`").join(" → ").slice(0,1000)||"None"},{name:"Location",value:found.location||"Not specified",inline:true})
  .setFooter({text:found.notes||"Use sequences verified in-game."});
 return interaction.reply({embeds:[embed],ephemeral:true});
}
