import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return ( 
      <footer>
        <div className="columns">
          <div className="column">
            <a href="https://www.bionet.io/">The Bionet</a> is a project of <a href="https://biobricks.org/">The BioBricks Foundation</a>.<br/>
            See <a href="/attributions">source code, copyright and attributions</a> 
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
