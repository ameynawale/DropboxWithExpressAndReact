import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import '../stylesheets/Welcome.css';
import * as API from '../api/API';


class UserProfile extends React.Component{

    state={
        firstname: "",
        lastname: "",
        username: "",
        contact: "",
        education: "",
        interests: "",
        message: ''
    };

    handleEditProfile = (userdata) => {
        API.editProfile(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        message: "Edit profile successful!!"
                    });
                    //this.props.history.push("/welcome");
                } else if (status === 401) {
                    this.setState({
                        message: "Enter valid information. Try again..!!"
                    });
                }
            });
    };

    render(){
        return(
            <div>
                <div className="page-header-welcome">
                    <h1 className="page-header__heading">Personal Account</h1>
                    <Link to="/login">Logout</Link>
                </div>
                <div>
                    <div className="mainContainer account-div">
                        <div className="row justify-content-md-center">
                            <div className="col-md-3">

                                <form>
                                    <div className="form-group profile-field">
                                        <label>First Name: </label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            label="Firstname"
                                            placeholder="Firstname"
                                            value={this.state.firstname}
                                            onChange={(event) => {
                                                this.setState({
                                                    firstname: event.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="text"
                                            label="Lastname"
                                            placeholder="Lastname"
                                            value={this.state.lastname}
                                            onChange={(event) => {
                                                this.setState({
                                                    lastname: event.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="email"
                                            label="email"
                                            placeholder="Email ID"
                                            value={this.state.username}
                                            onChange={(event) => {
                                                this.setState({
                                                    username: event.target.value
                                                });
                                            }}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            className="form-control"
                                            type="password"
                                            label="password"
                                            placeholder="Enter Password"
                                            value={this.state.password}
                                            onChange={(event) => {
                                                this.setState({
                                                    password: event.target.value
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={() => this.handleEditProfile(this.state)}>
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(UserProfile);