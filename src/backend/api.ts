import * as api from "lvckyworld-api"
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
        return (async () => {
            return api.MARINA.getDcGlobalBanList()
        })()
    }

}