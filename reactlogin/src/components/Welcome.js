import React, {Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
//import PropTypes from 'prop-types';
import PropTypes from 'prop-types';
//import ImageGridList from "./ImageGridList";
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import * as API from '../api/API';



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
                                filelist: data
                            });
                        });
                }
            });

    };
/*
    static propTypes = {
        handleFileUpload: PropTypes.func.isRequired
    };
*/
    state = {
        username : '',
        filelist: ''
    };


    componentWillMount(){
        this.setState({
            username : this.props.username
        });
        //document.title = `Welcome, ${this.state.username} !!`;
    }

    /*componentDidMount(){
        document.title = `Welcome, ${this.state.username} !!`;
    }*/

    componentDidMount() {
        API.getImages(this.props.email)
            .then((data) => {
                console.log(data);
                this.setState({
                    filelist: data
                });
            });
    };

    render(){
        return(
            <div className="row justify-content-md-center">
                <div className="col-md-3">
                    <div className="alert alert-warning" role="alert">
                        {this.state.username}, welcome to my App..!!
                    </div>
                    <Link to="/login">Logout</Link>
                </div>
                <div>
                    <TextField
                        className={'fileupload'}
                        type="file"
                        name="mypic"
                        onChange={this.handleFileUpload}
                    />
                    <div>{this.state.filelist}</div>
                </div>
            </div>
        )
    }
}

export default withRouter(Welcome);