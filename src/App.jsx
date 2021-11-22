import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Coin from './pages/Coin';
import Alert from './components/Alert'
import { HashRouter as Router, Routes as Switch, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#fff",
      color: "#666",
      minHeight: "100vh",
    }
  }))

const App = () => {

  const classes = useStyles()

  return (
    <Router>
      <div className={classes.App}>
        <Header />
        <Switch>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<Coin />} />
        </Switch>
        <Footer />
      </div>
      <Alert />
    </Router>
  );
}

export default App;

