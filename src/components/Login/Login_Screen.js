import React, { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { api_auth_login } from "../../API/api_auth_login";
import Logo from "../Other/Logo";

const Login_Screen = ({ onSetToken }) => {
    const [errorMessage, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onLogIn = async () => {
        const token = await api_auth_login(username, password);
        if (token === undefined) {
            setPassword("");
            setError("Incorrect login details!");
        } else {
            onSetToken(token);
        }
    };

    return (
        <View style={styles.container_main}>
            <Logo />
            <View style={styles.container_btn}>
                <TextInput
                    style={styles.input_txt}
                    label="Username"
                    value={username}
                    autoCapitalize="none"
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    style={styles.input_txt}
                    label="Password"
                    value={password}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={(text) => setPassword(text)}
                />
                <Text style={styles.txt_error}>{errorMessage}</Text>
                <Pressable style={styles.btn_container} onPress={onLogIn}>
                    <Text style={styles.btn_txt}>Log in</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container_main: {
        marginTop: 35,
        width: "100%",
        height: "100%",
    },
    container_btn: {
        width: "80%",
        marginHorizontal: "10%",
        paddingVertical: 20,
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
    btn_container: {
        width: "100%",
        borderRadius: 5,
        backgroundColor: "#9462E5",
    },
    btn_txt: {
        textAlign: "center",
        color: "#fff",
        fontSize: 15,
        paddingVertical: 10,
    },
});

export default Login_Screen;
