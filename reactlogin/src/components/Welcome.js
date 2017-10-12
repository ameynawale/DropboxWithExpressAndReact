import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
//import '/App.css';
import * as API from '../api/API';
import ImageGridList from "./ImageGridList";
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

class Welcome extends Component {
	
	 handleFileUpload = (event) => {

	        const payload = new FormData();

	        payload.append('mypic', event.target.files[0]);

	        API.uploadFile(payload)
	            .then((status) => {
	                if (status === 204) {
	                    API.getImages()
	                        .then((data) => {
	                            this.setState({
	                                images: data
	                            });
	                        });
	                }
	            });

	    };

    static propTypes = {
        username: PropTypes.string.isRequired
    };

    state = {
        username : '',
        	images: []
    };

   componentWillMount(){
        this.setState({
            username : this.props.username
            
        }); 
        //document.title = `Welcome, ${this.state.username} !!`;
    }

    componentDidMount(){
    	
        document.title = `Welcome, ${this.state.username} !!`;
        API.getImages()
        .then((data) => {
            console.log(data);
            this.setState({
                images: data
            });
        });
    }

    render(){
        return(
            <div className="row justify-content-md-center">
                <div className="col-md-12">
                    <div className="alert alert-warning" role="alert">
                        {this.state.username}, welcome to my App..!!
                    </div>
                        <Typography
                        align={'center'}
                        type="display3"
                    >
                        DropBox
                    </Typography>
                    <TextField
                        className={'fileupload'}
                        type="file"
                        name="mypic"
                        onChange={this.handleFileUpload}
                    />
                    <ImageGridList items={this.state.images}/>
                    <Link to="/login">Logout</Link>
                </div>
            </div>
        )
    }
}

export default withRouter(Welcome);