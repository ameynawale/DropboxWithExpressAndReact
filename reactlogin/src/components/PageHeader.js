import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import '../stylesheets/Welcome.css';


class PageHeader extends React.Component{
    render(){
        return(
            <div className="page-header-welcome">
                <h1 className="page-header__heading">Home</h1>
                <Link to="/userprofile" style={{float:'right'}}>Settings</Link>
                <Link to="/login">Logout</Link>
            </div>
        )
    }
}

export default withRouter(PageHeader);