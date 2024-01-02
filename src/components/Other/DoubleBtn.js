import React from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";

const DoubleBtn = ({ title1, title2, onPress1, onPress2 }) => {
    return (
        <View style={styles.container}>
            <Pressable style={styles.btn_container1} onPress={onPress1}>
                <Text style={styles.btn_txt1}>{title1}</Text>
            </Pressable>
            <View style={styles.line_container}>
                <View style={styles.line_line} />
                <Text style={styles.line_txt}>or</Text>
                <View style={styles.line_line} />
            </View>
            <Pressable style={styles.btn_container2} onPress={onPress2}>
                <Text style={styles.btn_txt2}>{title2}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
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
    line_container: {
        height: 25,
        width: "100%",
        flexDirection: "row",
    },
    line_line: {
        flex: 1,
        marginTop: 12,
        borderTopWidth: 1,
        borderColor: "#aaa",
    },
    line_txt: {
        width: "auto",
        textAlign: "center",
        marginHorizontal: 15,
        color: "#aaa",
    },
});

export default DoubleBtn;
