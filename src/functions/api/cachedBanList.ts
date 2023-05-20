/*
 * ©2016-2023 LvckyWorld - by LvckyAPI all Rights reserved
 * Licensed to Iven Schlenther, Lukas Oetken, Julia Kreutler and Michal Oblong
 * Project: lw-globalban
 */

import * as api from "./api";
import {lwGlobalBan} from "lvckyworld-api";

export class CachedBanList {
    public static rawBanList: lwGlobalBan;

    public static async initCache() {
        if (this.isInitiated) return console.error("The cache was already initialized");
        this.setInitiated(true);

        this.rawBanList = await api.MARINA.getGlobalBanList();
        setInterval(async () => {
            this.rawBanList = await api.MARINA.getGlobalBanList();
        }, 1000 * 60);
    }

    // public static isBanned(discordId: Snowflake): boolean {
    //     return CachedBanList.rawBanList.globalbans.some(bans => bans.clientid === discordId);
    // }

    private static isInitiated: boolean = false;
    private static setInitiated = ((initiated: boolean) => { this.isInitiated = initiated });
}
