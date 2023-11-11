import React from 'react';
import {StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';


const EndMatchAlert = ({show, team1, team2, onClose, onSelect}) => {
    return (
        <Modal 
            visible={show}
            transparent={true}
        >
            <TouchableOpacity onPress={onClose} style={styles.background}/>
            <View style={styles.main_container} onPress={onClose}>
                <View style={styles.container}>
                    <Text style={styles.txt_title}>Wybierz zwycięską drużynę</Text>
                    <View style={styles.btn_container}>
                        <Button mode="contained" onPress={() => onSelect(0)}>{team1}</Button>
                        <Button mode="contained" onPress={() => onSelect(1)}>{team2}</Button>
                    </View>
                    <Button onPress={onClose}>Anuluj</Button>
                </View>
            </View>
        </Modal>
        
    )
}

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.15)"
    },  
    main_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        width: "60%",
        height: "auto",
        backgroundColor: "#bbb"
    },
    txt_title: {
        textAlign: "center",
        fontSize: 18
    },
    btn_container: {
        flexDirection: "row",
        justifyContent: 'space-between'
    }
})

export default EndMatchAlert;