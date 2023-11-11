import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Main from "./src/components/Main"

export default function App() {
  return (
    <>
      <StatusBar style="light" translucent={false}/>
      <View style={styles.container}>
        <Main />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
