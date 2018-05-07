import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';

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
    const searchPage = (props) => {
      return (
        <SearchPage 
          {...props}
          {...this.props}
        />
      );
    };
    return ( 
      <main>
        <Switch>
          <Route exact path='/' component={landingPage}/>
          <Route exact path='/search' component={searchPage}/>
        </Switch>
      </main>
    );
  }
}

export default Routes;
