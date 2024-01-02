import axios from "axios";

export async function apiOnMatchConnect(token, matchId, matchPassword) {
    console.log(":", matchId, matchPassword);
    try {
        const result = await axios.get(global.apiLink + "Games/" + matchId, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (result.status == 200) {
            if (result.data.keyCode === matchPassword) {
                return matchId + ":" + matchPassword;
            }
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}
