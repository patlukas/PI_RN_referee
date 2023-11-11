export function apiOnMatchConnect(matchId, matchPassword) {
    if (matchId == "1" && matchPassword == "1") {
        return "123456789"
    }
    if (matchId == "2") {
        return "111111111"
    }
    return false
}