import axios from "axios";

export async function api_auth_login(username, password) {
    try {
        const result = await axios.post(global.apiLink + "Auth/Login", {
            username,
            password,
        });
        if (result.status == 200) {
            const { roles, token } = result.data;
            console.log(roles, token);
            if (roles.includes("Referee")) return token;
        }
    } catch (error) {
        console.log(error);
    }
    return undefined;
}
