export function apiGetMatchDetails(matchKey) {
    let dataFromApi = undefined
    if (matchKey === '111111111') {
        dataFromApi = (
            {
                "isEnd": false,
                "setNow": 0,
                "winner": -1,
                "teams": [
                    {
                        "name": "Team 1",
                        "result": 0,
                        "points": [0, 0, 0, 0, 0]
                    },
                    {
                        "name": "Team 2",
                        "result": 0,
                        "points": [0, 0, 0, 0, 0]
                    }
                ]
            }
            
        )
    }
    else if (matchKey === '123456789') {
        dataFromApi = (
            {
                "isEnd": true,
                "setNow": 0,
                "winner": -1,
                "teams": [
                    {
                        "name": "Team 1",
                        "result": 0,
                        "points": [0, 0, 0, 0, 0]
                    },
                    {
                        "name": "Team 2",
                        "result": 0,
                        "points": [0, 0, 0, 0, 0]
                    }
                ]
            }
            
        )
    }
    if (dataFromApi === undefined) return false;
    if (dataFromApi["isEnd"] === true) return false;
    return dataFromApi
}