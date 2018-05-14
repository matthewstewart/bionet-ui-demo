import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import '../components/Search.css';

class SearchPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			query: "",
			status: "",
			resultsArray: [],
			advanceSearch: false,
			sortField: "",
			sortOrder: ""
		};
		this.changeQuery = this.changeQuery.bind(this);
		this.submitQuery = this.submitQuery.bind(this);
		this.toggleAdvancedSearch = this.toggleAdvancedSearch.bind(this);
		this.toggleNameSort = this.toggleNameSort.bind(this);
		this.toggleAvailableSort = this.toggleAvailableSort.bind(this);
		this.toggleLicenseSort = this.toggleLicenseSort.bind(this);
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

	toggleAdvancedSearch() {
		this.setState({
			advanceSearch: !this.state.advanceSearch
		});
	}

	toggleNameSort() {
		let currentSortOrder = this.state.sortOrder;
		let sortOrder = "";
		if(currentSortOrder.length > 0){
			if(currentSortOrder === "desc"){
				sortOrder = "";
			} else if(currentSortOrder === "asc") {
				sortOrder = "desc";
			}
		} else {
			sortOrder = "asc";
		}
		this.setState({
			sortField: "name",
			sortOrder			
		});
	}

	toggleAvailableSort() {
		let currentSortOrder = this.state.sortOrder;
		let sortOrder = "";
		if(currentSortOrder.length > 0){
			if(currentSortOrder === "desc"){
				sortOrder = "";
			} else if(currentSortOrder === "asc") {
				sortOrder = "desc";
			}
		} else {
			sortOrder = "asc";
		}
		this.setState({
			sortField: "available",
			sortOrder			
		});
	}

	toggleLicenseSort() {
		let currentSortOrder = this.state.sortOrder;
		let sortOrder = "";
		if(currentSortOrder.length > 0){
			if(currentSortOrder === "desc"){
				sortOrder = "";
			} else if(currentSortOrder === "asc") {
				sortOrder = "desc";
			}
		} else {
			sortOrder = "asc";
		}
		this.setState({
			sortField: "license",
			sortOrder			
		});
	}

  render() {
  	let placeholderDesc = "Lorem ipsum dolor sit posuere...";
  	let resultsArray = this.state.resultsArray;
  	if(this.state.sortField === "name"){
  		if(this.state.sortOrder === "asc"){
  			resultsArray = resultsArray.sort(dynamicSortAsc('name'));
  		} else if(this.state.sortOrder === "desc"){
  			resultsArray = resultsArray.sort(dynamicSortDesc('name'));
  		}
  	}

  	let searchResults = resultsArray.map((result, index) => {
  		return (
  			<Link 
  				key={shortid.generate()}
  				to="/inventory"
  				className="child panel-block columns is-mobile"
  			>
  					<div className="column is-3">{ result }</div>
  					<div className="column is-5">{ placeholderDesc }</div>
  					{(this.state.sortField === "available") ? (
							<div className="column is-2">
								{(this.state.sortOrder === "asc") ? (
									<i className="mdi mdi-18px mdi-checkbox-marked has-text-success"/>
								) : (
									<i />
								)}
							</div>	
  					) : (
  						<div className="column is-2">
								{(this.state.sortField !== "available" && index % 3 === 0) ? (
									<i className="mdi mdi-18px mdi-checkbox-marked has-text-success"/>
								) : (
									<i />
								)}
							</div>
  					)}
  					{(this.state.sortField === "license") ? (
							<div className="column is-2">
								{(this.state.sortOrder === "asc") ? (
									<div>OpenMTA</div>
								) : (
									<div>
										{(this.state.sortOrder === "desc") ? (
											<div>UBMTA</div>
										) : (
											<div>Limbo</div>
										)}
									</div>
								)}
							</div>	
  					) : (
  						<div className="column is-2">
								{(this.state.sortField !== "available" && index % 3 === 0) ? (
									<div>OpenMTA</div>
								) : (
									<div>
										{(index % 3 !== 0 && index % 4 === 0) ? (
											<div>UBMTA</div>
										) : (
											<div>Limbo</div>
										)}
									</div>
								)}
							</div>
  					)}
  			</Link>
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
	    						<a onClick={ this.toggleAdvancedSearch }>
	    							<i className="mdi mdi-18px mdi-settings" /> Search
	    						</a>
	    					</div>
	    					{ (this.state.advanceSearch) ? (
			    				<div>	
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
		    					</div>
		    				) : null}	
	    				</form>
	    			</div>
	    		</div>

	    		{ (this.state.resultsArray.length > 0) ? (
		    		<div className="columns">
		    			<div className="column">
		    				<div className="sort panel columns is-mobile">
		    					<a 
		    						className="panel-block column is-3"
		    						onClick={ this.toggleNameSort }
		    					>
		    						<div className="columns is-mobile">
		    							<div className="column is-7">Name</div>
		    							<div className="column sort is-5">
		    								{ (this.state.sortField === "name" && this.state.sortOrder.length > 0) ? (
		    									<div>
		    										{ (this.state.sortOrder === "asc") ? (
		    											<i className="mdi mdi-16px mdi-arrow-up-drop-circle-outline" />
		    										) : (
		    											<i className="mdi mdi-16px mdi-arrow-down-drop-circle-outline" />
		    										)}
		    									</div>
		    								) : null }
		    							</div>
		    						</div>
		    					</a>
		    					<div className="panel-block column is-5">
		    						Desc.
		    					</div>
									<a 
		    						className="panel-block column is-2"
		    						onClick={ this.toggleAvailableSort }
		    					>
		    						<div className="columns is-mobile">
		    							<div className="column is-7">Avail.</div>
		    							<div className="column sort is-5">
		    								{ (this.state.sortField === "available" && this.state.sortOrder.length > 0) ? (
		    									<div>
		    										{ (this.state.sortOrder === "asc") ? (
		    											<i className="mdi mdi-16px mdi-arrow-up-drop-circle-outline" />
		    										) : (
		    											<i className="mdi mdi-16px mdi-arrow-down-drop-circle-outline" />
		    										)}
		    									</div>
		    								) : null }
		    							</div>
		    						</div>
		    					</a>
		    					<a 
		    						className="panel-block column is-2"
		    						onClick={ this.toggleLicenseSort }
		    					>
		    						<div className="columns is-mobile">
		    							{ (this.state.sortField !== "license") ? (
		    								<div className="column is-12">Lisc.</div>
		    							) : null }
		    							
		    							<div className="column sort is-12">
		    								{ (this.state.sortField === "license") ? (
		    									<div>
		    										{ (this.state.sortOrder === "asc") ? (
		    											<div>OpenMTA</div>
		    										) : (
		    											<div>
		    												{ (this.state.sortOrder === "desc") ? (
		    													<div>UBMTA</div>
		    												) : (
		    													<div>Limbo</div>
		    												)}
		    											</div>
		    										)}
		    									</div>
		    								) : null }
		    							</div>
		    						</div>
		    					</a>
		    				</div>
		    				<div className="panel">
		    					{searchResults}
		    				</div>
		    			</div>
		    		</div>
	    		) : null }

	    	</div>
    	</div>
    );
  }	
}

export default SearchPage;



function dynamicSortAsc(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function dynamicSortDesc(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}