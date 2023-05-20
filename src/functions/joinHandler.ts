import {bot} from '../index';
import {Colors} from "discord.js";
import {CachedBanList} from "./cachedBanList";

export async function checkNewUser() {

    bot.on('guildMemberAdd', async (joinedMember) => {
        const rawBanList = CachedBanList.rawBanList;
        rawBanList.globalbans.forEach((banItem) => {
            if ((banItem.clientid as string).includes(joinedMember.id)) {
                if (!joinedMember.kickable) return;

                joinedMember.send({
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

If you want to create a unban request, you have to join the **LvckyWorld - Server** and create a **ticket**
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
                        joinedMember.kick(`This Player is global banned Reason: "${banItem.banreason}" banned by "${banItem.bancreatorname}" from the Server ${banItem.bannedOn}`)
                    });
            }
        });
    });
}