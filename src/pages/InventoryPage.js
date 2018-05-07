import React, { Component } from 'react';
import LabPanel from '../components/LabPanel';

class InventoryPage extends Component {

  render() {
    return ( 
    	<div className="page-container">
	    	<div className="page-content">
	    		<div className="columns">
	    			<div className="column">
	    				<LabPanel />		
	    			</div>
	    		</div>		    		
	    	</div>
    	</div>
    );
  }
}

export default InventoryPage;