import axios from "axios";

export async function apiGetMatchDetails(matchKey) {
    console.log(":2: 1", matchKey);
    if (matchKey.split(":").length !== 2) return false;
    const matchLogDateSplit = matchKey.split(":");
    const gameId = matchLogDateSplit[0];
    const keyCode = matchLogDateSplit[1];
    console.log(":2: 2");
    try {
        const result = await axios.get(global.apiLink + "Games/" + gameId, {});
        if (result.status == 200) {
            if (result.data.keyCode === keyCode) {
                const { winnerId, currentSet, team1Id, team2Id } = result.data;
                const { state, team1Sets, team2Sets } = result.data;
                const {
                    set1Team1Points,
                    set2Team1Points,
                    set3Team1Points,
                    set4Team1Points,
                    set5Team1Points,
                } = result.data;
                const {
                    set1Team2Points,
                    set2Team2Points,
                    set3Team2Points,
                    set4Team2Points,
                    set5Team2Points,
                } = result.data;
                let winner = -1;
                if (winnerId !== null && winnerId === team1Id) winner = 0;
                if (winnerId !== null && winnerId === team2Id) winner = 1;
                console.log(":2: T");
                return {
                    isEnd: state == "finished",
                    setNow: currentSet,
                    winner,
                    teams: [
                        {
                            name: await getTeamName(team1Id),
                            teamId: team1Id,
                            result: team1Sets,
                            points: [
                                set1Team1Points,
                                set2Team1Points,
                                set3Team1Points,
                                set4Team1Points,
                                set5Team1Points,
                            ],
                        },
                        {
                            name: await getTeamName(team2Id),
                            teamId: team2Id,
                            result: team2Sets,
                            points: [
                                set1Team2Points,
                                set2Team2Points,
                                set3Team2Points,
                                set4Team2Points,
                                set5Team2Points,
                            ],
                        },
                    ],
                };
            }
        }
    } catch (error) {
        console.log(":2F: FF");
        console.log(error);
    }
    console.log(":2: F");
    return false;
}

const getTeamName = async (teamId) => {
    const result = await axios.get(global.apiLink + "Teams/" + teamId, {});
    if (result.status == 200) {
        return result.data.teamName;
    }
    return "";
};
