import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Customer from "./components/customer/Customer"
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import Home from './components/Home';


ReactDOM.render((
    <Router history={browserHistory}>
        <Router path="/" component={Home} />
        <Router path="/customers" component={Customer} />
    </Router>
), document.getElementById('root'));
registerServiceWorker();