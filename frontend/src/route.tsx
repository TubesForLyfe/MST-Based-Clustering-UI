import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import NewCluster from "./pages/NewCluster/NewCluster";
import ClusterLog from "./pages/ClusterLog/ClusterLog";

const RouteManager = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/new-cluster" component={NewCluster} />
                <Route path="/cluster-log" component={ClusterLog} />
                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
        </Router>
    )
}

export default RouteManager;