import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";

const Button = ({ title, filled = false, onPress }) => {
    if (!filled) {
        return (
            <Pressable style={styles.btn_container1} onPress={onPress}>
                <Text style={styles.btn_txt1}>{title}</Text>
            </Pressable>
        );
    }
    return (
        <Pressable style={styles.btn_container2} onPress={onPress}>
            <Text style={styles.btn_txt2}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    btn_container1: {
        width: "100%",
        borderRadius: 5,
        borderColor: "#aaa",
        borderWidth: 1,
    },
    btn_txt1: {
        textAlign: "center",
        color: "#aaa",
        fontSize: 15,
        paddingVertical: 10,
    },
    btn_container2: {
        width: "100%",
        borderRadius: 5,
        backgroundColor: "#9462E5",
    },
    btn_txt2: {
        textAlign: "center",
        color: "#fff",
        fontSize: 15,
        paddingVertical: 10,
    },
});

export default Button;
