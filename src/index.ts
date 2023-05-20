import * as Discord from 'discord.js';
import * as fs from 'fs';
import 'dotenv/config';
import {info} from 'node:console';

export const bot = new Discord.Client({intents: 3276799});

// import modules
import * as joinHandler from './functions/events/joinHandler';
import * as messageHandler from './functions/events/messageHandler';
import * as sysadmin from './functions/command/sysadmin';
import {CachedBanList} from "./functions/api/cachedBanList";

bot.on('ready', () => {

    // start modules

    CachedBanList.initCache().then(() => {

        joinHandler.checkNewUser().then(() => {
        });

        messageHandler.checkMessageAuthor().then(() => {
        });

        sysadmin.handleMessages().then(() => {
        });

    })


    // output infos
    info(`The bot is on ${bot.guilds.cache.size} guilds.`);
    info(`The bot is started successfully.`);
    info(`The bot is logged in as ${bot.user?.username}#${bot.user?.discriminator}`);
});

bot.on('guildCreate', guild => {
    const joinBlacklist = fs.readFileSync(
        __dirname + '/data/joinBlacklist.json',
        {encoding: 'utf-8'});

    interface blacklist {
        blacklist: [
            { guildId: string }
        ]
    }

    let list: blacklist = JSON.parse(joinBlacklist);
    if (list.blacklist.some(elm => elm.guildId == guild.id)) guild.leave().then(() => {
    });
})

bot.on('error', (err) => {
    console.error(err);
});

bot.login(process.env.BOT_TOKEN).then(() => {
});