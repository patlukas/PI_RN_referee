import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { apiOnMatchConnect } from "../../API/matchConnect";
import { BarCodeScanner } from "expo-barcode-scanner";
import DoubleBtn from "../Other/DoubleBtn";
import Logo from "../Other/Logo";
import Button from "../Other/Button";

const MatchConnect = ({ token, onSetMatchKey, onLogout }) => {
    const [errorMessage, setError] = useState("");
    const [matchId, setMatchId] = useState("");
    const [matchPassword, setMatchPassword] = useState("");
    const [scan, setScan] = useState(false);
    useEffect(() => {
        (async () => {
            await BarCodeScanner.requestPermissionsAsync();
        })();
    }, []);

    const handleBarCodeScanned = async ({ data }) => {
        login_data = data.split(":");
        if (login_data.length != 2) {
            setError("Incorrect QR code!");
            return;
        } else {
            const matchKey = await apiOnMatchConnect(
                token,
                login_data[0],
                login_data[1]
            );
            if (matchKey === false) {
                setError("Incorrect QR code!");
            } else {
                onSetMatchKey(matchKey);
            }
        }
        setScan(false);
    };

    const onMatchConnect = async () => {
        const matchKey = await apiOnMatchConnect(token, matchId, matchPassword);
        if (matchKey === false) {
            setMatchPassword("");
            setError("Incorrect data!");
        } else {
            onSetMatchKey(matchKey);
        }
    };
    if (scan) {
        return (
            <View style={styles.container_main}>
                <BarCodeScanner
                    onBarCodeScanned={handleBarCodeScanned}
                    style={styles.container_qr}
                />
                <View style={styles.container_smaller}>
                    <Button
                        title="Finish scan"
                        onPress={() => setScan(false)}
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container_main}>
            <Logo />
            <View style={styles.container_smaller}>
                <TextInput
                    style={styles.input_txt}
                    label="Match ID"
                    value={matchId}
                    onChangeText={(text) => setMatchId(text)}
                />
                <TextInput
                    style={styles.input_txt}
                    label="Key"
                    value={matchPassword}
                    secureTextEntry={true}
                    onChangeText={(text) => setMatchPassword(text)}
                />
                <Text style={styles.txt_error}>{errorMessage}</Text>
                <DoubleBtn
                    title1="Connect"
                    title2="Connect using QR code"
                    onPress1={onMatchConnect}
                    onPress2={() => setScan(true)}
                />
                <View style={styles.separator} />
                <Button title="Log Out" onPress={onLogout} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container_main: {
        width: "100%",
        height: "100%",
    },
    container_smaller: {
        width: "80%",
        marginHorizontal: "10%",
    },
    container_qr: {
        height: "90%",
        width: "100%",
    },
    input_txt: {
        marginVertical: 10,
        backgroundColor: "#ddd",
    },
    txt_error: {
        color: "#f55",
        fontSize: 16,
        fontWeight: 600,
    },
    separator: {
        height: 60,
    },
});

export default MatchConnect;
