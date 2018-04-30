import React, { Component } from 'react';
import testData from '../data/test.json';
import shortid from 'shortid';
import './LabPanel.css';
import LabImage from './LabImage';

class LabPanel extends Component {

	constructor(props) {
		super(props);
		this.state = {
			activeItem: {
				children: []
			},
			breadcrumbs: {
				lab: {},
				freezer: {},
				shelf: {},
				rack: {},
				box: {},
				well: {}
			}
		};
		this.changeActiveItemChild = this.changeActiveItemChild.bind(this);
		this.changeLab = this.changeLab.bind(this);
		this.changeFreezer = this.changeFreezer.bind(this);
		this.changeShelf = this.changeShelf.bind(this);
		this.changeRack = this.changeRack.bind(this);
		this.changeBox = this.changeBox.bind(this);
	}

	changeActiveItemChild(e) {
		let childIndex = e.target.getAttribute('index');
		let child = this.state.activeItem.children[childIndex];
		let childType = child.type.toLowerCase();
		let breadcrumbs = this.state.breadcrumbs;
		breadcrumbs[childType] = child;
		this.setState({
			activeItem: child,
			breadcrumbs
		});
	}

	changeLab(e) {
		e.preventDefault();
		let activeItem = this.state.breadcrumbs.lab;
		let breadcrumbs = {
			lab: activeItem,
			freezer: {},
			shelf: {},
			rack: {},
			box: {},
			well: {}
		};
		this.setState({
			activeItem,
			breadcrumbs
		});
	}

	changeFreezer(e) {
		e.preventDefault();
		let lab = this.state.breadcrumbs.lab;
		let activeItem = this.state.breadcrumbs.freezer;
		let breadcrumbs = {
			lab,
			freezer: activeItem,
			shelf: {},
			rack: {},
			box: {},
			well: {}
		};
		this.setState({
			activeItem,
			breadcrumbs
		});
	}

	changeShelf(e) {
		e.preventDefault();
		let lab = this.state.breadcrumbs.lab;
		let freezer = this.state.breadcrumbs.freezer;
		let activeItem = this.state.breadcrumbs.shelf;
		let breadcrumbs = {
			lab,
			freezer,
			shelf: activeItem,
			rack: {},
			box: {},
			well: {}
		};
		this.setState({
			activeItem,
			breadcrumbs
		});		
	}

	changeRack(e) {
		e.preventDefault();
		let lab = this.state.breadcrumbs.lab;
		let freezer = this.state.breadcrumbs.freezer;
		let shelf = this.state.breadcrumbs.shelf;
		let activeItem = this.state.breadcrumbs.rack;
		let breadcrumbs = {
			lab,
			freezer,
			shelf,
			rack: activeItem,
			box: {},
			well: {}
		};
		this.setState({
			activeItem,
			breadcrumbs
		});		
	}

	changeBox(e) {
		e.preventDefault();
		let lab = this.state.breadcrumbs.lab;
		let freezer = this.state.breadcrumbs.freezer;
		let shelf = this.state.breadcrumbs.shelf;
		let rack = this.state.breadcrumbs.rack;
		let activeItem = this.state.breadcrumbs.box;
		let breadcrumbs = {
			lab,
			freezer,
			shelf,
			rack,
			box: activeItem,
			well: {}
		};
		this.setState({
			activeItem,
			breadcrumbs
		});		
	}	

	componentDidMount() {
		let activeItem = testData;
		let breadcrumbs = this.state.breadcrumbs;
		breadcrumbs.lab = testData;
		this.setState({
			activeItem,
			breadcrumbs
		});
	}

  render() {
    return ( 
			<div className="panel">
				
				<PanelHeading { ...this.state }/>
				
				<div className="panel-block">
					<BreadCrumbs 
						{ ...this.state }
						changeLab={this.changeLab}
						changeFreezer={this.changeFreezer}
						changeShelf={this.changeShelf}
						changeRack={this.changeRack}
						changeBox={this.changeBox}
					/>
				</div>

				<ChildPanels
					activeItem={this.state.activeItem}
					changeActiveItemChild={this.changeActiveItemChild}
				/>

				<LabImage { ...this.state } />
			</div>		
    );
  }
}

export default LabPanel;


function PanelHeading(props) {
	let panelHeadingClass, iconClass;
	panelHeadingClass = "panel-heading is-size-4";
	switch(props.activeItem.type){
		case "Lab":
			iconClass = "mdi mdi-24px mdi-home";
			break;
		case "Freezer":
			iconClass = "mdi mdi-24px mdi-fridge";
			break;
		case "Shelf":
			iconClass = "mdi mdi-24px mdi-format-align-justify";
			break;
		case "Rack":
			iconClass = "mdi mdi-24px mdi-view-parallel";
			break;
		case "Box":
			iconClass = "mdi mdi-24px mdi-view-grid";
			break;
		case "Well":
			iconClass = "mdi mdi-24px mdi-square-outline";
			break;				
		default:
			iconClass = "mdi mdi-24px mdi-flask";
	};	
	return (
		<p className={panelHeadingClass}>
			
				<i className={iconClass}/>
			&nbsp;  				
			{props.activeItem.name}
		</p>	
	);
}

function ChildPanels(props) {
  	let childPanels = props.activeItem.children.map((child, index) => {
  		let panelClass, iconClass;
  		panelClass = "child panel-block";
  		switch(child.type){
  			case "Lab":
  				iconClass = "mdi mdi-24px mdi-home-circle";
  				break;
				case "Freezer":
  				iconClass = "mdi mdi-24px mdi-fridge";
  				break;
  			case "Shelf":
  				iconClass = "mdi mdi-24px mdi-format-align-justify";
  				break;
  			case "Rack":
  				iconClass = "mdi mdi-24px mdi-view-parallel";
  				break;
  			case "Box":
  				iconClass = "mdi mdi-24px mdi-view-grid";
  				break;
  			case "Well":
  				iconClass = "mdi mdi-24px mdi-square-outline";
  				break;			  				
  			default: 
  				iconClass = "mdi mdi-24px mdi-flask";		
  		}
  		return (
  			<div 
  				key={shortid.generate()}
  				index={index}
  				className={panelClass}
  				onClick={props.changeActiveItemChild}
  			>	
					<i className={iconClass}/>
					&nbsp;
					{child.name}
				</div>
  		);
  	});
  	return childPanels;	
}

function BreadCrumbs(props) {
	let hasLab = hasCrumb(props, "lab");
	let labClass = crumbActive(props, "Lab") ? "is-active" : "";
	let hasFreezer = hasCrumb(props, "freezer");
	let freezerClass = crumbActive(props, "Freezer") ? "is-active" : "";
	let hasShelf = hasCrumb(props, "shelf");
	let shelfClass = crumbActive(props, "Shelf") ? "is-active" : "";
	let hasRack = hasCrumb(props, "rack");
	let rackClass = crumbActive(props, "Rack") ? "is-active" : "";
	let hasBox = hasCrumb(props, "box");
	let boxClass = crumbActive(props, "Box") ? "is-active" : "";
	let hasWell = hasCrumb(props, "well");
	let wellClass = crumbActive(props, "Well") ? "is-active" : "";
	return (
		<div className="breadcrumb">
			<ul>
				{(hasLab) ? (
					<li className={labClass}>
						<a 
							href="/"
							onClick={props.changeLab}
						>{props.breadcrumbs.lab.name}</a>
					</li>
				) : null }
				{(hasFreezer) ? (
					<li className={freezerClass}>
						<a 
							href="/"
							onClick={props.changeFreezer}
						>{props.breadcrumbs.freezer.name}</a>
					</li>
				) : null }
				{(hasShelf) ? (
					<li className={shelfClass}>
						<a 
							href="/"
							onClick={props.changeShelf}
						>{props.breadcrumbs.shelf.name}</a></li>
				) : null }
				{(hasRack) ? (
					<li className={rackClass}>
						<a 
							href="/"
							onClick={props.changeRack}
						>{props.breadcrumbs.rack.name}</a></li>
				) : null }
				{(hasBox) ? (
					<li className={boxClass}>
						<a 
							href="/"
							onClick={props.changeBox}
						>{props.breadcrumbs.box.name}</a></li>
				) : null }
				{(hasWell) ? (
					<li className={wellClass}>
						<a 
							href="/"
						>{props.breadcrumbs.well.name}</a></li>
				) : null }
			</ul>
		</div>
	);
}

function hasCrumb(props, attr) {
	return Object.keys(props.breadcrumbs[attr]).length > 0;
}

function crumbActive(props, attr) {
	return props.activeItem.type === attr;
}