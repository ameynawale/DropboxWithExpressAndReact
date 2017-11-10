import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Login from "./Login";
import Message from "./Message";
import Welcome from "./Welcome";
import SignUp from "./SignUp";
import LeftPanel from "./LeftPanel";
import FileContainer from "./FileContainer";
import PageHeader from "./PageHeader";
import UserProfile from "./UserProfile";

class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        message: '',
        username: ''
    };

    handleSubmit = (userdata) => {
        API.doLogin(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!",
                        username: userdata.username
                    });
                    this.props.history.push("/welcome");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };
    handleSignUp = (userdata) => {
        API.doSignup(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Registration successful!! please login",
                        username: userdata.username
                    });
                    this.props.history.push("/login");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Enter valid information. Try again..!!"
                    });
                }
            });
    };

    render() {
        return (
            <div>
                <Route exact path="/" render={() => (
                    <div>
                        <Login handleSubmit={this.handleSubmit}/>
                    </div>
                )}/>

                <Route exact path="/login" render={() => (
                    <div>
                        <Login handleSubmit={this.handleSubmit}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>
                <Route exact path="/signup" render={() => (
                        <div>
                            <SignUp handleSignUp={this.handleSignUp}/>
                            <Message message={this.state.message}/>
                        </div>
                    )}/>
                <Route exact path="/welcome" render={() => (
                    <div>
                        <LeftPanel/>
                        <Welcome username={this.state.username} route={this.props.history.push}/>

                    </div>
                )}/>
                <Route exact path="/userprofile" render={() => (
                    <div>
                        <LeftPanel/>
                        <UserProfile/>
                    </div>
                )}/>
            </div>
        );
    }
}

export default withRouter(NewerHomePage);