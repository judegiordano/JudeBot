import axios, { AxiosResponse } from "axios";
import { MessageEmbed } from "discord.js";

import config from "../helpers/config";
import log from "../services/logger";
import { Colors, BotSettings } from "../types/Constants";

export default class Embed {

	private static readonly endpoint: string = config.SCRYFALL_URI;
	private static mtgCard = new MessageEmbed();
	private static helpCard = new MessageEmbed();
	private static errorCard = new MessageEmbed();

	private static ParseContent(msg: string): string {
		const mySubString: string = msg.substring(
			msg.lastIndexOf("[") + 1,
			msg.lastIndexOf("]") - 1
		);
		return mySubString;
	}

	private static async FetchCard(parse: string): Promise<AxiosResponse> {
		try {
			return await axios.get(`${Embed.endpoint}${parse}`);
		} catch (error) {
			throw Error(error.response.data.details || error.message);
		}
	}

	public static async CardEmbed(msg: string): Promise<MessageEmbed> {
		try {
			const parse: string = Embed.ParseContent(msg);
			const { data }: AxiosResponse = await Embed.FetchCard(parse);

			if (!data) throw "internal server error";

			Embed.mtgCard.setTimestamp();
			Embed.mtgCard.setTitle(data.name);
			Embed.mtgCard.setColor(Colors.teal);
			Embed.mtgCard.setImage(data.image_uris.small);
			Embed.mtgCard.setURL(data.purchase_uris.tcgplayer);
			if (data.prices.usd) Embed.mtgCard.setFooter(data.prices.usd);
			Embed.mtgCard.setDescription(`${data.type_line}\n${data.oracle_text}`);
			Embed.mtgCard.setAuthor(BotSettings.author, config.MTG_LOGO, config.INVITE);

			return Embed.mtgCard;
		} catch (error) {
			throw Error(error);
		}
	}

	public static HelpEmbed(): MessageEmbed {
		try {
			Embed.helpCard.setTimestamp();
			Embed.helpCard.setTitle("Help");
			Embed.helpCard.setColor(Colors.teal);
			Embed.helpCard.setAuthor(BotSettings.author, config.AVATAR_URI, config.INVITE);
			Embed.helpCard.setDescription("To Query MTG Card Info, Type A Card Name In Brackets: [[Sol Ring]]");

			return Embed.helpCard;
		} catch (error) {
			throw Error(error.message);
		}
	}

	public static ErrorEmbed(error: string): MessageEmbed {
		try {
			Embed.helpCard.setTimestamp();
			Embed.helpCard.setTitle("Error");
			Embed.helpCard.setColor(Colors.salmon);
			Embed.helpCard.setDescription(error);
			Embed.helpCard.setAuthor(BotSettings.author, config.AVATAR_URI, config.INVITE);

			return Embed.helpCard;
		} catch (error) {
			log.error(error);
		}
	}
}