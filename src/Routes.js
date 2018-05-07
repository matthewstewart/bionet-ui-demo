import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import InventoryPage from './pages/InventoryPage';
import SearchPage from './pages/SearchPage';

class Routes extends Component {
  render() {
    const searchPage = (props) => {
      return (
        <SearchPage 
          {...props}
          {...this.props}
        />
      );
    };
    const inventoryPage = (props) => {
      return (
        <InventoryPage 
          {...props}
          {...this.props}
        />
      );
    };
    return ( 
      <main>
        <Switch>
          <Route exact path='/' component={searchPage}/>
          <Route exact path='/inventory' component={inventoryPage}/>
        </Switch>
      </main>
    );
  }
}

export default Routes;
