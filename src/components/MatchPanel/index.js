import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { apiGetMatchDetails } from "../../API/getMatchDetails";
import { apiAddPoint } from "../../API/changeMatchResult";
import { endMatch } from "../../API/endMatch";
import MatchPanelRow from "../MatchPanelRow";
import EndMatchAlert from "../EndMatchAlert";

const MatchPanel = ({ matchKey, onDisconnectMatch }) => {
    const [matchDetails, setMatchDetails] = useState(undefined);
    const [showEndMatchAlert, onShowEndMatchAlert] = useState(false);

    useEffect(() => {
        loadMatchDetailsFromApi(matchKey, setMatchDetails, onDisconnectMatch);
    }, []);
    if (matchDetails === undefined) return null;

    const onAddPoint = async (indexTeam) => {
        const newMatchDetails = await apiAddPoint(
            matchDetails.teams[indexTeam].teamId,
            matchKey
        );
        if (newMatchDetails === false) onDisconnectMatch();
        setMatchDetails(newMatchDetails);
    };

    const onEndMatch = async (indexTeam) => {
        const newMatchDetails = await endMatch(indexTeam, matchDetails);
        setMatchDetails(newMatchDetails);
        onShowEndMatchAlert(false);
    };

    el_sets = [];
    for (let i = 0; i < matchDetails["setNow"]; i++) {
        el_sets.push(
            <MatchPanelRow
                key={i}
                name={"Set " + (i + 1)}
                textTeam1={matchDetails["teams"][0]["points"][i]}
                textTeam2={matchDetails["teams"][1]["points"][i]}
                special={
                    i == matchDetails["setNow"] && matchDetails["winner"] == -1
                }
            />
        );
    }

    el_btn = [];
    el_end = [];
    if (matchDetails["winner"] === -1) {
        // el_end = (
        //     <Button mode="contained" onPress={() => onShowEndMatchAlert(true)}>Zakończ mecz</Button>
        // )
        el_btn = (
            <View style={styles.container_addPoint}>
                <Button
                    mode="contained"
                    onPress={() => onAddPoint(0)}
                    style={styles.btn_addPoint}
                >
                    +
                </Button>
                <Button
                    mode="contained"
                    onPress={() => onAddPoint(1)}
                    style={styles.btn_addPoint}
                >
                    +
                </Button>
            </View>
        );
    } else {
        el_btn = (
            <Text style={styles.txt_winner}>
                Drużyna {matchDetails["teams"][matchDetails["winner"]]["name"]}{" "}
                wygrała
            </Text>
        );
    }

    return (
        <>
            <EndMatchAlert
                show={showEndMatchAlert}
                team1={matchDetails["teams"][0]["name"]}
                team2={matchDetails["teams"][1]["name"]}
                onClose={() => onShowEndMatchAlert(false)}
                onSelect={onEndMatch}
            />
            <View style={styles.main_container}>
                <Button mode="contained" onPress={onDisconnectMatch}>
                    Rozłącz mecz
                </Button>
                {el_end}
                <View style={styles.result_container}>
                    <MatchPanelRow
                        name=""
                        textTeam1={matchDetails["teams"][0]["name"]}
                        textTeam2={matchDetails["teams"][1]["name"]}
                        bold={true}
                        big={true}
                    />
                    <MatchPanelRow
                        name="Wynik"
                        textTeam1={matchDetails["teams"][0]["result"]}
                        textTeam2={matchDetails["teams"][1]["result"]}
                        bold={true}
                    />
                    {el_sets}
                    {el_btn}
                </View>
            </View>
        </>
    );
};

async function loadMatchDetailsFromApi(
    matchKey,
    setMatchDetails,
    onDisconnectMatch
) {
    const matchDetails = await apiGetMatchDetails(matchKey);
    if (matchDetails === false) {
        onDisconnectMatch();
    } else {
        setMatchDetails(matchDetails);
    }
}

const styles = StyleSheet.create({
    main_container: {
        padding: "2%",
        width: "100%",
        height: "100%",
    },
    result_container: {
        width: "100%",
    },
    container_addPoint: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    btn_addPoint: {
        width: "40%",
    },
    txt_winner: {
        width: "100%",
        fontSize: 18,
        textAlign: "center",
        color: "green",
    },
});

export default MatchPanel;
