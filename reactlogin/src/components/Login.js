import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/LoginPage.css';
import path from 'path';

class Login extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    };

    state = {
        username: '',
        password: '',
        folderpath: ''
    };

    componentWillMount(){
        this.setState({
            username: '',
            password: '',
            folderpath: ''
        });
    }

    //const imagePath = path.join(__dirname,'..','public','dropbox-logo');

    render() {
        return (
            <div>
                <header className="page-header">
                    <div className="master-head">
                    <a href='/' className='logo-link'>
                        <img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_m1-vfleInWIl.svg" alt className="dropbox-logo__glyph"/>
                        <img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_text_2015_m1-vflV-vZRB.svg" alt className="dropbox-logo__type"/>
                    </a>
                </div>
                </header>
                <div className="register-page-content">

                        <img src="https://cfl.dropboxstatic.com/static/images/empty_states/sign-in@2x-vflBuaBON.png"
                             alt className="login-or-register-img"
                        />
                        <div className="login-form-container">
                            <h5>Sign in</h5>
                            <h6>
                                or&nbsp;
                                <a href="/signup">create an account</a>
                            </h6>
                            <form>
                                <div className="form-group">
                                    <input
                                        className="text-input"
                                        type="email"
                                        label="Username"
                                        placeholder="Enter Username"
                                        value={this.state.username}
                                        onChange={(event) => {
                                            this.setState({
                                                username: event.target.value,
                                                folderpath: event.target.value
                                            });
                                        }}
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        className="text-input"
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
                                        onClick={() => this.props.handleSubmit(this.state)}>
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        </div>

                </div>
            </div>
        );
    }
}

export default Login;