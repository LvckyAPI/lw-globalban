import {bot} from '../../index';
import {Colors} from "discord.js";
import {CachedBanList} from "../api/cachedBanList";

export async function checkMessageAuthor() {
    bot.on('messageCreate', async (message) => {
        CachedBanList.rawBanList.globalbans.forEach((banItem) => {
            if ((banItem.clientid as string).includes(message.author.id)) {
                if (!message.member?.kickable) return;

                message.member.send({
                    embeds: [
                        {
                            title: `❌ LvckyWorld - GlobalBAN ❌`,
                            url: `https://lvckyworld.net`,
                            description: `
You are on the LvckyWorld GlobalBAN list.

**Reason:** \`${banItem.banreason}\`
**BannedBy:** \`${banItem.bancreatorname}\`
**Ban created on Server:**
\`\`\`${banItem.bannedOn}\`\`\`

If you want to create a unban request, you have to join the **LvckyWorld - Server** and create a **Ticket**
https://lvckyworld.net/discord
                        `,
                            thumbnail: {
                                url: `https://lvckyworld.net/images/logo222.png`
                            },
                            color: Colors.Red
                        }
                    ]
                }).catch(() => {
                })
                    .then(() => {
                        message.member?.kick();
                        (message.deletable ? message.delete() : {});
                    });
            }
        });
    });
}