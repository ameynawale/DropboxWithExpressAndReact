import React from 'react';
import {withRouter} from 'react-router-dom';
import '../stylesheets/Welcome.css';

class Starred extends React.Component{
    render(){
        return(
            <div className="mainContainer home-access-section__header">
                <div>Starred</div>
            </div>
        )
    }
}

export default withRouter(Starred);