import React from 'react';
import {withRouter} from 'react-router-dom';
import '../stylesheets/Welcome.css';

class Recent extends React.Component{
    render(){
        return(
            <div className="mainContainer home-access-section__header">
                <div>Recent</div>
            </div>
        )
    }
}

export default Recent;