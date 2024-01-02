import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Logo = () => {
    return (
        <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }} />
            <View style={styles.logo_container}>
                <Text style={styles.txt_logo}>Playmaker</Text>
                <Text style={styles.txt2_logo}>Referee</Text>
            </View>
            <View style={{ flex: 1 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    logo_container: {
        width: "auto",
        paddingTop: 70,
        paddingBottom: 110,
    },
    txt_logo: {
        textAlign: "center",
        fontSize: 40,
        color: "#9462E5",
        fontWeight: "700",
    },
    txt2_logo: {
        color: "#9462E5",
        textAlign: "right",
        fontSize: 32,
        fontWeight: "700",
        top: -20,
        left: -1,
    },
});

export default Logo;
