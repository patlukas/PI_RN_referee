export function endMatch(indexTeam, matchDetails) {
    let newMatchDetails = JSON.parse(JSON.stringify(matchDetails))
    newMatchDetails["winner"] = indexTeam
    return newMatchDetails
}