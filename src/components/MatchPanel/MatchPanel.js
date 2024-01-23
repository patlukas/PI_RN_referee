import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { apiGetMatchDetails } from "../../API/getMatchDetails";
import { apiAddPoint } from "../../API/changeMatchResult";
import MatchPanel_Row from "./MatchPanel_Row";
import MatchPanel_Head from "./MatchPanel_Head";
import Button from "../Other/Button";

const MatchPanel = ({ token, matchKey, onDisconnectMatch }) => {
    const [matchDetails, setMatchDetails] = useState(undefined);

    useEffect(() => {
        loadMatchDetailsFromApi(
            token,
            matchKey,
            setMatchDetails,
            onDisconnectMatch
        );
    }, []);
    if (matchDetails === undefined) return null;

    const onAddPoint = async (indexTeam) => {
        const newMatchDetails = await apiAddPoint(
            token,
            matchDetails.teams[indexTeam].teamId,
            matchKey
        );
        if (newMatchDetails === false) onDisconnectMatch();
        setMatchDetails(newMatchDetails);
    };

    el_sets = [];
    let last_set = matchDetails["setNow"];
    if (matchDetails["winner"] !== -1) last_set -= 1;
    for (let i = 0; i < last_set; i++) {
        el_sets.push(
            <MatchPanel_Row
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
        el_btn = (
            <View style={styles.container_addPoint}>
                <View style={styles.container_btn_addPoint}>
                    <Button
                        title="Add point"
                        filled={true}
                        onPress={() => onAddPoint(0)}
                    />
                </View>
                <View style={{ width: 71 }} />
                <View style={styles.container_btn_addPoint}>
                    <Button
                        title="Add point"
                        filled={true}
                        onPress={() => onAddPoint(1)}
                    />
                </View>
            </View>
        );
    } else {
        el_btn = (
            <Text style={styles.txt_winner}>
                {matchDetails["teams"][matchDetails["winner"]]["name"]} WON!
            </Text>
        );
    }

    return (
        <>
            <View style={styles.main_container}>
                {el_end}
                <View style={styles.result_container}>
                    <MatchPanel_Head
                        nameH={matchDetails["teams"][0]["name"]}
                        nameG={matchDetails["teams"][1]["name"]}
                        resultH={matchDetails["teams"][0]["result"]}
                        resultG={matchDetails["teams"][1]["result"]}
                        imageH={matchDetails["teams"][0]["imageUrl"]}
                        imageG={matchDetails["teams"][1]["imageUrl"]}
                    />

                    {el_sets}
                    {el_btn}
                </View>
            </View>
            <View style={styles.btn_exit}>
                <Button
                    title="Exit"
                    filled={true}
                    onPress={onDisconnectMatch}
                />
            </View>
        </>
    );
};

async function loadMatchDetailsFromApi(
    token,
    matchKey,
    setMatchDetails,
    onDisconnectMatch
) {
    const matchDetails = await apiGetMatchDetails(token, matchKey);
    if (matchDetails === false) {
        onDisconnectMatch();
    } else {
        setMatchDetails(matchDetails);
    }
}

const styles = StyleSheet.create({
    container_btn_addPoint: {
        flex: 1,
        paddingHorizontal: "5%",
    },
    main_container: {
        flex: 1,
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
        marginTop: 8,
        width: "40%",
    },
    txt_winner: {
        width: "100%",
        fontSize: 25,
        textAlign: "center",
        color: "#080",
        paddingTop: 20,
    },
    btn_exit: {
        width: "80%",
        marginHorizontal: "10%",
        marginBottom: 20,
    },
});

export default MatchPanel;
