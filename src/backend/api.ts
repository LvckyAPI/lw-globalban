import fetch from "node-fetch";

/**
 * That's the INSTANCE of the RestfulAPI-Marina
 * @author LvckyAPI, IloveKOHL 
 * @author (LvckyWorld)
 */
export class MARINA {

    /**
     * Get the LW-GlobalBanList by RestAPI
     * @returns The GlobalBanList as Json
     */
    public static getGlobalBanList() {
        return fetch('https://api.lvckyworld.net:61619/dcGlobalBanList')
            .then(res => res.json())
            .then(json => {
                return json;
            })
            .catch(err => {
                console.error(err);
            });
    }

}