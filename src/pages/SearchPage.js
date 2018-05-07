import React, { Component } from 'react';
import shortid from 'shortid';

class SearchPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			query: "",
			status: "",
			resultsArray: []
		};
		this.changeQuery = this.changeQuery.bind(this);
		this.submitQuery = this.submitQuery.bind(this);
	}

	changeQuery(e) {
		let query = e.target.value;
		this.setState({
			query,
			status: "",
			resultsArray: []
		});
	}

	submitQuery(e) {
		e.preventDefault();
		let query = this.state.query;
		let status = `Searching for '${query}'`;
		let resultsArray = this.state.resultsArray;
		for(let i = 0; i < 8; i++){
			resultsArray.push(`${query} ${i}`);
		}
		this.setState({
			query: "",
			status,
			resultsArray
		});
	}

  render() {
  	let searchResults = this.state.resultsArray.map((result, index) => {
  		return (
  			<div 
  				key={shortid.generate()}
  				className="child panel-block spaced"
  			>
  					<span>{ result }</span>
  					{(index % 3 === 0 || index % 4 === 0) ? (
							<i className="mdi mdi-18px mdi-flask"/>
  					) : null }
  			</div>
  		);
  	});
    return ( 
    	<div className="page-container">
	    	<div className="page-content">
	    		
	    		<div className="columns">
	    			<div className="column">
	    				<form onSubmit={this.submitQuery}>
		    				<div className="field has-addons">
		    					<div className="control">
		    						<input 
		    							type="text" 
		    							className="input"
		    							placeholder="Search the Bionet"
		    							name="search"
		    							onChange={this.changeQuery}
		    							value={this.state.query}
		    						/>
		    					</div>
		    					<div className="control">
		    						<a 
		    							className="button is-info"
		    							onClick={this.submitQuery}
		    						>Search</a>
		    					</div>	
		    				</div>
	    					<div className="field">
	    						{(this.state.status.length > 0) ? (
	    							<p className="has-text-success">
	    								<span>{ this.state.status }</span> - <span>{ `${this.state.resultsArray.length} Found` }</span>
	    							</p>
	    						) : null}
	    					</div>
	    					<div className="field">
	    						<div className="control">
	    							<label className="radio">
	    								<input 
	    									type="radio"
	    									name="scope"
	    									value="local"
	    								/> Local Search
	    							</label>
	    							<label className="radio">
	    								<input 
	    									type="radio"
	    									name="scope"
	    									value="global"
	    								/> Global Search
	    							</label>
	    						</div>
	    					</div>
	    					<div className="field">
	    						<div className="control">
	    							<label className="radio">
	    								<input 
	    									type="radio"
	    									name="type"
	    									value="human"
	    								/> Human Language
	    							</label>
	    							<label className="radio">
	    								<input 
	    									type="radio"
	    									name="type"
	    									value="blast"
	    								/> Nucletide Sequence
	    							</label>
	    							<label className="radio">
	    								<input 
	    									type="radio"
	    									name="type"
	    									value="blast_aa"
	    								/> Amino Acid Sequence
	    							</label>
	    						</div>
	    					</div>
	    					<div className="field">
	    						<div className="control">
	    							<label className="checkbox">
	    								<input type="checkbox" /> Show only currently available materials
	    							</label>
	    						</div>
	    					</div>
	    					<div className="hint">
	    						<div className="hint-label">Hint:</div>
	    						<div className="hint-text">
	    							<p>You can search using either human language or a nucleotide sequence.</p>
	    							<p className="other">
	    								For advanced search tips have a look at <a href="/help/search">search syntax help</a>.
	    							</p>
	    						</div>
	    					</div>
	    				</form>
	    			</div>
	    		</div>

	    		<div className="columns">
	    			<div className="column">
	    				<div className="panel">
	    					{searchResults}
	    				</div>
	    			</div>
	    		</div>

	    	</div>
    	</div>
    );
  }	
}

export default SearchPage;