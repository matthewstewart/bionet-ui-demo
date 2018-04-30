import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
        <Footer />
      </div>
    );
  }
}

export default App;
