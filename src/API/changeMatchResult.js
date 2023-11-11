export function apiAddPoint(indexTeam, matchDetails) {
    const setNow = matchDetails["setNow"]
    let newMatchDetails = JSON.parse(JSON.stringify(matchDetails))
    newMatchDetails["teams"][indexTeam]["points"][setNow] += 5 //TODO
    const resultA = newMatchDetails["teams"][indexTeam]["points"][setNow]
    const resultB = newMatchDetails["teams"][1 - indexTeam]["points"][setNow]
    if (
            (
                (newMatchDetails["setNow"] == 4 && resultA >= 15) 
                || 
                (newMatchDetails["setNow"] != 4 && resultA >= 25) 
            ) 
            && 
            resultA - resultB >= 2
        ) {
        newMatchDetails["teams"][indexTeam]["result"] += 1
        if (newMatchDetails["teams"][indexTeam] ["result"] == 3) {
            newMatchDetails["winner"] = indexTeam
        }
        else newMatchDetails["setNow"] += 1
    }
    return newMatchDetails

    // TODO: del argument matchDetails, możliwy zwrot false od API jak nie można dodać puktu
}