import { bot } from '../index';
import * as api from 'lvckyworld-api';
import * as fs from 'fs';

export async function handleMessages() {
    bot.on('messageCreate', async (message) => {

        if (!await api.MARINA.isSystemAdmin(message.author.id)) {
            return;
        }

        var cmdPrefix = 'lw.';
        var command = message.content.toLowerCase().slice(cmdPrefix.length).split(" ")[0];
        var args = message.content.slice(cmdPrefix.length).split(" ").slice(1);

        switch (command) {
            case 'leave':
                await message.reply('Meister, Ihr Wunsch ist mir Befehl!\n`leave`');
                await message.guild?.leave();
                break;
            case 'permleave':
                var joinBlacklist = fs.readFileSync(
                    __dirname + '/../data/joinBlacklist.json',
                    { encoding: 'utf-8' })

                interface blacklist {
                    blacklist: [
                        { guildId: string }
                    ]
                }

                if (!message.guildId) return;
                let list: blacklist = JSON.parse(joinBlacklist);
                if (list.blacklist.some(elm => elm.guildId == message.guildId)) return;

                const json = {
                    guildId: message.guildId
                }

                list.blacklist.push(json);
                fs.writeFileSync(
                    __dirname + '/../data/joinBlacklist.json',
                    JSON.stringify(list),
                    { encoding: 'utf-8' }
                )

                await message.reply('Meister, Ihr Wunsch ist mir Befehl!\n`permleave`');
                await message.guild?.leave();

                break;
        }

    })
}