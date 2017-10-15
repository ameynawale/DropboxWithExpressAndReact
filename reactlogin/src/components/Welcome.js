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
	        payload.append('email',this.state.username);

	        API.uploadFile(payload)
	            .then((res) => {
	                if (res.status === 204) {
                        API.GetFiles(res.email)
                            .then((data) => {
                                //console.log(data);
                                this.setState({
                                    images: data
                                });
                            });
	                    //window.location.reload();
                        //this.getUserFiles(res.email);
	                    /*API.getImages()
	                        .then((data) => {
	                            this.setState({
	                                images: data
	                            });
	                        });*/
	                }
	            });

	    };

    getUserFiles = (userdata) => {
        API.GetFiles(userdata)
            .then((data) => {
                //console.log(data);
                this.setState({
                    images: data
                });
            });
    };

    static propTypes = {
        username: PropTypes.string.isRequired
    };

    /*state = {
        username : '',
        	images: []
    };*/

    constructor(props){
        super(props);
        this.state = {
            username : '',
            images: [],
            folderpath : ''
        };

        this.getUserFiles = this.getUserFiles.bind(this);
    }

   componentWillMount(){
        this.setState({
            username : this.props.username,
            //getUserFiles: this.getUserFiles
        }); 
        //document.title = `Welcome, ${this.state.username} !!`;
       //this.getUserFiles(this.state);
    }

    componentDidMount(){
    	
        document.title = `Welcome, ${this.state.username} !!`;
        this.getUserFiles(this.state);
        /*API.getImages()
        .then((data) => {
            console.log(data);
            this.setState({
                images: data
            });
        });*/
       /* API.GetFiles(userdata)
            .then((data) => {
                console.log(data);
                this.setState({
                    images: data
                });
            });*/
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
                    <ImageGridList items={this.state.images} route={this.props.route} username={this.state.username}/>
                    <Link to="/login">Logout</Link>
                </div>
            </div>
        )
    }
}

export default withRouter(Welcome);