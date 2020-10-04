import React from "react";
import { useSelector } from "react-redux";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import Dashboard from "./pages/dashBoard";
import UnAuthPage from "./pages/unAuthPage";

function App() {
    const logged = useSelector((state) => state.auth.logged);

    return (
        <Router>
            {logged ? (
                <Switch>
                    <Route path="/dashboard" component={Dashboard} exact />
                    <Redirect to="/dashboard" />
                </Switch>
            ) : (
                <Switch>
                    <Route exact path="/" component={UnAuthPage} />
                    <Redirect to="/" />
                </Switch>
            )}
        </Router>
    );
}

export default App;
