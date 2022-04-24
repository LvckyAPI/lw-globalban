import * as Discord from 'discord.js';
import 'dotenv/config';

export const bot = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_BANS,
        Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
});

// import modules
import * as joinHandler from './backend/joinHandler';
import * as messageHandler from './backend/messageHandler';



bot.on('ready', () => {
    // start Modules
    joinHandler.checkNewUser();
    messageHandler.checkMessageAuthor()


    // output Infos
    console.info(`The bot is on ${bot.guilds.cache.size}`);
    console.info(`The bot is started succsessfully.`);
    console.info(`The bot is logged in as ${bot.user?.username}#${bot.user?.discriminator}`);
});

// create getters
export class INSTANCE {
    public static apiPassword: string | undefined = process.env.API_PASSWORD?.replace("[HASHTAG]", "#");
}

bot.on('error', (err) => {
    console.error(err);
});
bot.login(process.env.BOT_TOKEN);