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
        return fetch('http://api.lvckyworld.net:19450/dcGlobalBanList')
            .then(res => res.json())
            .then(json => {
                return json;
            })
            .catch(err => {
                console.error(err);
            });
    }

}