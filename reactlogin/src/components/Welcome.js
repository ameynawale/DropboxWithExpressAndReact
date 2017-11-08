import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
//import '/App.css';
import * as API from '../api/API';
import ImageGridList from "./ImageGridList";
import '../stylesheets/RightPanel.css';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import PageHeader from './PageHeader';
import {withStyles} from 'material-ui/styles';
import FileContainer from './FileContainer';
import RightPanel from './RightPanel';
import Starred from './Starred';
import Recent from './Recent';
import '../stylesheets/Welcome.css';


const styles = ({
    fileContainer: {
        right: 0,
        paddingLeft: 240,

    }
});

class Welcome extends Component {

    //var styles = ({

    //});

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
                    images: data.files
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
            <div>
                <PageHeader/>
                <Starred/>
                <Recent/>
                <FileContainer items={this.state.images} route={this.props.route} username={this.state.username}/>

                <RightPanel/>

            </div>
        )
    }
}

export default withStyles(styles)(Welcome);