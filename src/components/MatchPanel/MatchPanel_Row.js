import React from "react";
import { StyleSheet, View, Text } from "react-native";

const MatchPanel_Row = ({
    name,
    textTeam1,
    textTeam2,
    bold = false,
    big = false,
    special = false,
}) => {
    return (
        <View style={styles.container}>
            <Text
                style={[
                    styles.txt_val,
                    bold && styles.boldText,
                    big && styles.bigText,
                    special && styles.specialText,
                ]}
            >
                {textTeam1}
            </Text>
            <Text style={styles.txt_desc}>{name}</Text>
            <Text
                style={[
                    styles.txt_val,
                    bold && styles.boldText,
                    big && styles.bigText,
                    special && styles.specialText,
                ]}
            >
                {textTeam2}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        marginTop: 8,
    },
    txt_val: {
        padding: 6,
        textAlign: "center",
        width: "40%",
        fontSize: 22,
        fontWeight: "700",
    },
    txt_desc: {
        marginTop: 6,
        textAlign: "center",
        width: "20%",
        color: "gray",
        fontSize: 22,
    },
    boldText: {
        fontWeight: 700,
    },
    bigText: {
        fontSize: 18,
    },
    specialText: {
        color: "red",
    },
});

export default MatchPanel_Row;
