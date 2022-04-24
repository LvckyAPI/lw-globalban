import { bot } from '../index';
import * as api from './api';

export async function checkNewUser() {

    // start Modules
    bot.on('guildMemberAdd', async (member) => {
        var rawBanList = (await api.MARINA.getGlobalBanList());
        rawBanList.globalbans.forEach((element: { clientid: string; banreason: any; bancreatorname: any; bannedOn: any; }) => {
            if ((element.clientid as string).includes(member.id)) {
                if (!member.kickable) return;

                member.send({
                    embeds: [
                        {
                            title: `❌ LvckyWorld - GlobalBAN ❌`,
                            url: `https://lvckyworld.net`,
                            description: `
You are on the LvckyWorld GlobalBAN list.

**Reason:** \`${element.banreason}\`
**BannedBy:** \`${element.bancreatorname}\`
**Ban created on Server:**
\`\`\`${element.bannedOn}\`\`\`

If you want to create a unban request, you have to join the **LvckyWorld - Server** and create a **Ticket**
https://lvckyworld.net/discord
                        `,
                            thumbnail: {
                                url: `https://lvckyworld.net/images/logo222.png`
                            },
                            color: 'RED'
                        }
                    ]
                }).catch(err => { })
                    .then(() => {
                        member.kick(`This Player is global banned Reason: "${element.banreason}" banned by "${element.bancreatorname}" from the Server ${element.bannedOn}`)
                    });
            }
        });
    });
}