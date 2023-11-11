import React from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MatchConnect from '../MatchConnect';
import MatchPanel from '../MatchPanel';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchKey: undefined
        }
        this.loadDataFromLocalStorage()
        this.onSetMatchKey = this.onSetMatchKey.bind(this)
    }
    render () {
        const {matchKey} = this.state;
        if (matchKey === undefined) {
            return (
                <MatchConnect onSetMatchKey={this.onSetMatchKey}/>
            )
        }
        return (
            <MatchPanel matchKey={matchKey} onDisconnectMatch={() => {this.onSetMatchKey(undefined)}}/>
        )
    }

    async onSetMatchKey (matchKey) {
        if (matchKey === undefined) {
            AsyncStorage.removeItem("@matchKey")
        }
        else {
            await AsyncStorage.setItem("@matchKey", matchKey)
        }
        this.setState({matchKey})
    }

    async loadDataFromLocalStorage () {
        try {
            const matchKey = await AsyncStorage.getItem('@matchKey')
            if(matchKey !== null) this.setState({matchKey})
        } catch(e) {console.log(e)}
    }
}

export default Main;