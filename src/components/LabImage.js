import React, { Component } from 'react';
import './LabImage.css';

class LabImage extends Component {
  render() {
    return ( 
      <div className="image-container">
        <div className="box lab">
          <div className="box-header">
            <ImageHeading { ...this.props } />
          </div>
          <div className="box-body">
            <div id="lab-image-screen"></div>
            <Image { ...this.props } />
          </div>  
        </div>
      </div>
    );
  }
}

export default LabImage;

function ImageHeading(props) {
  let iconClass;
  switch(props.activeItem.type){
    case "Lab":
      iconClass = "mdi mdi-18px mdi-home";
      break;
    default:
      iconClass = "mdi mdi-18px mdi-flask";  
  }
  return (
    <span>
    <i className={iconClass}/>&nbsp;&nbsp;{props.activeItem.name}
    </span>
  );
}

function Image(props) {
  let hasImage = props.activeItem.imageUrl && props.activeItem.imageUrl.length > 0;
  return (
    <div 
      id="lab-image"
      style={{
        'backgroundImage': `url(${props.activeItem.imageUrl})`,
        'backgroundSize': 'contain',
        'backgroundRepeat': 'no-repeat',
        'backgroundPosition': 'center'
      }}
    >
      {(!hasImage) ? (
        <p style={{'margin': '12px'}}>No Image Available</p>
      ) : null }
    </div>
  );
}