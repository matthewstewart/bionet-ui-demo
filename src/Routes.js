import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

class Routes extends Component {
  render() {
    const landingPage = (props) => {
      return (
        <LandingPage 
          {...props}
          {...this.props}
        />
      );
    };
    return ( 
      <main>
        <Switch>
          <Route exact path='/' component={landingPage}/>
        </Switch>
      </main>
    );
  }
}

export default Routes;
