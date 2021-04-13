import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css';
import Home from './Home';
import Edit from './Edit';
import Reminders from './Reminders';
import PageNotFound from './PageNotFound';
import logo from './task.png'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav} from 'react-bootstrap';


function App() {
  return (<div>
    <Router>
      <div className="header">
         <img src={logo} alt="Logo"/> 
      <Nav>
      <Nav.Item>
    <Nav.Link href="/">Home</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link href="/reminders">Reminders</Nav.Link>
  </Nav.Item>
</Nav>
</div>
<div>
      <Switch>

        <Route exact path="/" component={Home} />
        <Route path="/edit" component={Edit} />
        <Route path="/reminders" component={Reminders} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  </Router>
  <br/><br/>
  <footer>
  <p>Contact us @https://bbdsoftware.com/</p>
</footer>
  </div>
  );
}

export default App;
