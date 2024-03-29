import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import store from './store';
import Layouts from 'Modules/Layouts';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/" name="Home" component={Layouts} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

export default App;
