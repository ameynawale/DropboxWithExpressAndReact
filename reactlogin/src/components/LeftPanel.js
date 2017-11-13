import React from 'react';
import {withRouter} from 'react-router-dom';
import '../stylesheets/LeftPanel.css';

class LeftPanel extends React.Component{
    render(){
        return(
            <div className="container">
                <a href='/welcome' className='logo-link'>
                    <img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_m1-vfleInWIl.svg" alt className="dropbox-logo__glyph"/>
                </a>
                <div className="nav-options-container">
                    <div className="nav-options">
                        <span><a href="./welcome">Home</a></span>
                    </div>
                    <div className="nav-options">
                        <span><a href="./welcome">Files</a></span>
                    </div>
                    <div className="nav-options">
                        <span><a href="./welcome">Paper</a></span>
                    </div>
                    <div className="nav-options">
                        <span><a href="./welcome">Showcase</a></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeftPanel;