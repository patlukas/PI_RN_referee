import React from "react";
import MatchConnect from "../MatchConnect";
import MatchPanel from "../MatchPanel/MatchPanel";
import Login_Screen from "../Login/Login_Screen";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchKey: undefined,
            token: undefined,
        };
        this.onSetMatchKey = this.onSetMatchKey.bind(this);
        this.onSetToken = this.onSetToken.bind(this);
    }
    render() {
        const { matchKey, token } = this.state;
        if (token === undefined) {
            return <Login_Screen onSetToken={this.onSetToken} />;
        }
        if (matchKey === undefined) {
            return (
                <MatchConnect
                    onSetMatchKey={this.onSetMatchKey}
                    token={token}
                    onLogout={() => this.onSetToken(undefined)}
                />
            );
        }
        return (
            <MatchPanel
                token={token}
                matchKey={matchKey}
                onDisconnectMatch={() => {
                    this.onSetMatchKey(undefined);
                }}
            />
        );
    }

    async onSetMatchKey(matchKey) {
        this.setState({ matchKey });
    }

    async onSetToken(token) {
        this.setState({ token });
    }
}

export default Main;
