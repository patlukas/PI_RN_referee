import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { apiOnMatchConnect } from '../../API/matchConnect';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';

const MatchConnect = ({onSetMatchKey}) => {
    const [errorMessage, setError] = useState("");
    const [matchId, setMatchId] = useState("");
    const [matchPassword, setMatchPassword] = useState("");
    const [hasPermission, setHasPermission] = useState(null);
    const [scan, setScan] = useState(false);
    useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        login_data = data.split(":") 
        if(login_data.length != 2) {
            setError("Błędny kod QR")
            return
        }
        else {
            const matchKey = apiOnMatchConnect(login_data[0], login_data[1])
            console.log("M", matchKey)
            if (matchKey === false) {
                setError("Błędny kod QR")
            }
            else {
                onSetMatchKey(matchKey)
            }
        }
        setScan(false)
      };

    // const renderCamera = () => {
    //     return (
    //       <View style={styles.cameraContainer}>
    //         <BarCodeScanner
    //           onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
    //           style={styles.camera}
    //         />
    //       </View>
    //     );
    //   };

    const onMathConnect = () => {
        const matchKey = apiOnMatchConnect(matchId, matchPassword)
        console.log("M", matchKey)
        if (matchKey === false) {
            setMatchPassword("")
            setError("Błędne dane")
        }
        else {
            onSetMatchKey(matchKey)
        }
    }
    if(scan) {
        return (
            <View style={{height: "100%", width:"100%"}}>
              <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                style={{height: "90%", width:"100%"}}
              />
              <Button mode="contained" onPress={() =>setScan(false)}>
                Zakończ skan
            </Button>
            </View>
          );
    }

    return (
        <View>
            <Text variant="titleMedium">{errorMessage}</Text>
            <TextInput
                label="Id meczu"
                value={matchId}
                onChangeText={text => setMatchId(text)}
            />
            <TextInput
                label="Hasło meczu"
                value={matchPassword}
                secureTextEntry={true}
                onChangeText={text => setMatchPassword(text)}
            />
             <Button mode="contained" onPress={onMathConnect}>
                Połącz
            </Button>
            <Button mode="contained" onPress={() => setScan(true)}>
                Połącz za pomocą kodu QR
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    optionText: (color) => ({
        color,
        paddingLeft: 5,
    }),
    checkbox: {
        paddingVertical: 6, 
        paddingLeft: 6
    }
})


export default MatchConnect;