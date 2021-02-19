import { Client, Intents, Message, MessageEmbed } from "discord.js";

import config from "./helpers/config";
import Embed from "./helpers/template";
import Commands, { BotSettings } from "./types/Constants";
import log from "./services/logger";

const intents: Intents = new Intents();
intents.add(Intents.ALL);
const client: Client = new Client();

client.on("ready", () => {
	client.user.setActivity(BotSettings.solitaire);
	client.user.setAvatar(config.AVATAR_URI);
	log.info(`${new Date}\nLogged in as ${client.user.tag}!`);
});

client.on("message", async (msg: Message) => {
	try {
		if (Commands.cardReg.test(msg.content)) {
			const embed: MessageEmbed = await Embed.CardEmbed(msg.content);
			return msg.channel.send(embed);
		}
		else if (Commands.helpReg.test(msg.content)) {
			const embed: MessageEmbed = Embed.HelpEmbed();
			return msg.channel.send(embed);
		}
		// might add more
	} catch (error) {
		log.error(error.message);
		const embed: MessageEmbed = Embed.ErrorEmbed(error.message);
		return msg.channel.send(embed);
	}
});

client.login(config.BOT_TOKEN);