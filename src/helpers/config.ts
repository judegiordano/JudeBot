import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const config = {
	BOT_TOKEN: <string>process.env.BOT_TOKEN || undefined,
	CLIENT_ID: <number>parseInt(process.env.CLIENT_ID) || undefined,
	IS_PROD: <boolean>(process.env.NODE_ENV == "production" ? true : false),
	CLIENT_SECRET: <string>process.env.CLIENT_SECRET || undefined,
	SCRYFALL_URI: <string>process.env.SCRYFALL_URI || undefined,
	INVITE: <string>process.env.INVITE || undefined,
	MTG_LOGO: <string>process.env.MTG_LOGO || undefined,
	AVATAR_URI: <string>process.env.AVATAR_URI || undefined,
	IS_COMPILED: <boolean>path.extname(__filename).includes("js"),
};

if (config.BOT_TOKEN === undefined)
	throw Error("BOT_TOKEN not specified");
else if (config.CLIENT_ID === undefined)
	throw Error("CLIENT_ID not specified");
else if (config.CLIENT_SECRET === undefined)
	throw Error("CLIENT_SECRET not specified");
else if (config.SCRYFALL_URI === undefined)
	throw Error("SCRYFALL_URI not specified");

export default config;