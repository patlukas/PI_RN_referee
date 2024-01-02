import axios from "axios";

export async function apiGetMatchDetails(token, matchKey) {
    if (matchKey.split(":").length !== 2) return false;
    const matchLogDateSplit = matchKey.split(":");
    const gameId = matchLogDateSplit[0];
    const keyCode = matchLogDateSplit[1];
    try {
        const result = await axios.get(global.apiLink + "Games/" + gameId, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (result.status == 200) {
            if (result.data.keyCode === keyCode) {
                const { winnerId, currentSet, team1, team2 } = result.data;
                const { state, team1Sets, team2Sets, team1Id, team2Id } =
                    result.data;
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
                if (winnerId !== null && winnerId === team1.id) winner = 0;
                if (winnerId !== null && winnerId === team2.id) winner = 1;
                let team1Name = "",
                    team2Name = "";
                if (team1 !== null) team1Name = team1.teamName;
                if (team2 !== null) team2Name = team2.teamName;
                const baseUrl = global.apiLink.replace("/api", "");
                const url1 = baseUrl + team1?.user?.imageUrl;
                const url2 = baseUrl + team2?.user?.imageUrl;
                return {
                    isEnd: state == "finished",
                    setNow: currentSet,
                    winner,
                    teams: [
                        {
                            name: team1Name,
                            teamId: team1Id,
                            result: team1Sets,
                            imageUrl: url1,
                            points: [
                                set1Team1Points,
                                set2Team1Points,
                                set3Team1Points,
                                set4Team1Points,
                                set5Team1Points,
                            ],
                        },
                        {
                            name: team2Name,
                            teamId: team2Id,
                            result: team2Sets,
                            imageUrl: url2,
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
        console.log("1.", error);
    }
    return false;
}
