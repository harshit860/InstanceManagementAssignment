import React, { useEffect } from "react";
import { Link, BrowserRouter as Router , Route } from 'react-router-dom';
import Credentials from "./Credentials";
import Dashboard from "./Dashboard";

function App() {

  useEffect(() => {
  
  }, [])
  return (
    <React.Fragment>
      <Router>
      <React.Fragment>
        <Link to="/" ></Link>
      </React.Fragment>
      <React.Fragment>
        <Route path="/" exact component={Credentials}></Route>
        <Route path="/dash" exact component={Dashboard}></Route>
      </React.Fragment>
      </Router>
    </React.Fragment>
  );
}

export default App;
