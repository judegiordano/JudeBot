/* eslint-disable no-unused-vars */

export enum Env {
	dev = "development",
	prod = "production"
}

export enum BotSettings {
	solitaire = "Solitaire",
	author = "JudeBot"
}

export enum Colors {
	teal = "#1bb0a2",
	salmon = "#ff6666"
}

export default class Commands {
	public static cardReg: RegExp = /(\[\[)(.*)(\]\])/gmi;
	public static helpReg: RegExp = /.*(!judehelp).*/gmi;
}