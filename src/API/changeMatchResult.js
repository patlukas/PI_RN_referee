import axios from "axios";
import { apiGetMatchDetails } from "./getMatchDetails";

export async function apiAddPoint(indexTeam, matchKey) {
    if (matchKey.split(":").length !== 2) return false;
    const matchLogDateSplit = matchKey.split(":");
    const gameId = matchLogDateSplit[0];
    const keyCode = matchLogDateSplit[1];

    try {
        const result = await axios.get(global.apiLink + "Games/" + gameId, {});
        if (result.status == 200) {
            if (result.data.keyCode === keyCode) {
                console.log(
                    global.apiLink +
                        "Games/" +
                        gameId +
                        "/Addpoint/" +
                        indexTeam
                );
                const result2 = await axios.put(
                    global.apiLink +
                        "Games/" +
                        gameId +
                        "/Addpoint/" +
                        indexTeam,
                    {}
                );
            }
        }
    } catch (error) {
        console.log(error);
    }
    return await apiGetMatchDetails(matchKey);
}
