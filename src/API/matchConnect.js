import axios from "axios";

export async function apiOnMatchConnect(matchId, matchPassword) {
    console.log(":", matchId, matchPassword);
    try {
        const result = await axios.get(global.apiLink + "Games/" + matchId, {});
        if (result.status == 200) {
            if (result.data.keyCode === matchPassword) {
                console.log(":1: T");
                return matchId + ":" + matchPassword;
            }
        }
    } catch (error) {
        console.log(error);
    }
    console.log(":1: F");
    return false;
}
