import { bot } from '../index';
import * as api from './api';


var rawBanList: any;

export async function checkMessageAuthor() {
    rawBanList = (await api.MARINA.getGlobalBanList());
    bot.on('messageCreate', async (message) => {
        rawBanList.globalbans.forEach((element: { clientid: string; banreason: any; bancreatorname: any; bannedOn: any; }) => {
            if ((element.clientid as string).includes(message.author.id)) {
                if (!message.member?.kickable) return;

                message.member.send({
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
                        message.member?.kick();
                        (message.deletable ? message.delete() : {});
                    });
            }
        });
    });
}

export async function updateBanList() {
    setInterval(async () => {
        rawBanList = (await api.MARINA.getGlobalBanList());
    }, 1000 * 60);
}