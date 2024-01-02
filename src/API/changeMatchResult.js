import axios from "axios";
import { apiGetMatchDetails } from "./getMatchDetails";

export async function apiAddPoint(token, indexTeam, matchKey) {
    console.log(token, indexTeam, matchKey);
    if (matchKey.split(":").length !== 2) return false;
    const matchLogDateSplit = matchKey.split(":");
    const gameId = matchLogDateSplit[0];
    const keyCode = matchLogDateSplit[1]; //TODO

    try {
        console.log(
            global.apiLink + "Games/" + gameId + "/Addpoint/" + indexTeam
        );
        await axios.put(
            global.apiLink + "Games/" + gameId + "/Addpoint/" + indexTeam,
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
    } catch (error) {
        console.log("2.", error);
    }
    return await apiGetMatchDetails(token, matchKey);
}
