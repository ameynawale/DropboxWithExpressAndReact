import React from 'react';
import {withRouter} from 'react-router-dom';
import '../stylesheets/RightPanel.css';
import TextField from 'material-ui/TextField';
import Modal from 'react-modal';
import Modal1 from 'react-modal';
import {withStyles} from 'material-ui/styles';
import * as API from '../api/API';
import PropTypes from 'prop-types';
import FileContainer from './FileContainer';
//import FileInput from 'react-file-input';



const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    subheader: {
        width: '100%',
    },
    modal: {
        display: 'none', /* Hidden by default */
        position: 'fixed', /* Stay in place */
        /*z-index: 1, /* Sit on top */
        left: 0,
        top: 0,
        width: 100, /* Full width */
        height: 100, /* Full height */
        overflow: 'auto', /* Enable scroll if needed */
        //backgroundcolor: 'rgb(0,0,0)', /* Fallback color */
        //backgroundcolor: 'rgba(0,0,0,0.4)' /* Black w/ opacity */
    }
});

const customStyles = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)'
    },
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

class RightPanel extends React.Component{
    static propTypes = {
        username: PropTypes.string.isRequired
    }

    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            modal1IsOpen: false,
            activeItemName: '',
            activeItemId: null,
            emails: '',
            folder: '',
            groupname: '',
            images:[]
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal1 = this.openModal1.bind(this);
        this.closeModal1 = this.closeModal1.bind(this);
        //this.handleShare = this.handleShare.bind(this);
    }

    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('mypic', event.target.files[0]);
        payload.append('username',this.props.username);

        API.uploadFile(payload)
            .then((data) => {
                //   if (status === 201) {
                API.GetFiles(data)
                    .then((res) => this.setState({
                        images: res.files
                    }))
            });

    };

    handleCreateGroup = (userdata) => {
        API.createGroup(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        modalIsOpen: true,
                        message: "Share successful!!",
                        username: userdata.username,
                        activeItemName: userdata.activeItemName
                    });
                    //this.props.history.push("/welcome");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Enter valid information. Try again..!!"
                    });
                }
            });
    };

    handleCreateFolder = (userdata) => {
        API.createFolder(userdata)
            .then((status) => {
                if (status === 201) {
                    this.setState({
                        modalIsOpen: true,
                        message: "Create folder successful!!",
                        username: userdata.username,
                        activeItemName: userdata.activeItemName
                    });
                    //this.props.history.push("/welcome");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Could not create folder!"
                    });
                }
            });
    };

    openModal(item) {
        this.setState({
            modalIsOpen: true,
            activeItemName: item,
            activeItemId: item.id,
            emails: '',
            username: this.props.username
        });
    }
    openModal1(item) {
        this.setState({
            modal1IsOpen: true,
            activeItemName: item,
            activeItemId: item.id,
            emails: '',
            username: this.props.username
        });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#00f';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }
    closeModal1() {
        this.setState({modal1IsOpen: false});
    }

    render(){
        return(
            <div className="rightParentContainer">
                <button className="upload-button">Upload files</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    overlayClassName="mainContainerRoot mainContainer"
                >
                    <h6 ref={subtitle => this.subtitle = subtitle}>{this.state.activeItemName}</h6>
                    <h6 ref={subtitle => this.subtitle = subtitle}>{this.state.username}</h6>
                    <button onClick={this.closeModal}>close</button>
                    <form>
                        <input
                            className="form-control"
                            type="text"
                            label="email"
                            placeholder="Folder name"
                            value={this.state.folder}
                            onChange={(event) => {
                                this.setState({
                                    folder: event.target.value
                                });
                            }}
                        />
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => this.handleCreateFolder(this.state)}>
                            Create
                        </button>
                    </form>
                </Modal>
                <Modal1
                    isOpen={this.state.modal1IsOpen}
                    onRequestClose={this.closeModal1}
                    style={customStyles}
                    //contentLabel="Example Modal"
                    itemId={this.state.activeItemId}
                    itemName={this.state.activeItemName}
                    overlayClassName="mainContainerRoot mainContainer"
                >

                    <h6 ref={subtitle => this.subtitle = subtitle}>{this.state.activeItemName}</h6>
                    <h6 ref={subtitle => this.subtitle = subtitle}>{this.state.username}</h6>
                    <button onClick={this.closeModal1}>close</button>
                    <form>
                        <input
                            className="form-control"
                            type="text"
                            label="text"
                            placeholder="Group name"
                            value={this.state.groupname}
                            onChange={(event) => {
                                this.setState({
                                    groupname: event.target.value
                                });
                            }}
                        />
                        <input
                            className="form-control"
                            type="text"
                            label="email"
                            placeholder="Enter comma separated emails"
                            value={this.state.emails}
                            onChange={(event) => {
                                this.setState({
                                    emails: event.target.value
                                });
                            }}
                        />
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => this.handleCreateGroup(this.state)}>
                            Create
                        </button>

                    </form>
                </Modal1>

                <TextField
                    className="fileupload"
                    type="file"
                    name="mypic"
                    onChange={this.handleFileUpload}
                />
                <button className="mc-tertiary-link-button secondary-action-menu__button action-new-folder"
                        onClick={() => this.openModal('test')}>
                   <span className="mc-tertiary-link-button-content"  style={{display: 'inline'}}>
                      <span className="mc-tertiary-icon-wrapper">
                         <svg width="32" height="32" viewBox="0 0 32 32" class="mc-icon-template-actionable">
                            <title>action-new-folder</title>
                            <g fill="none" fillRule="evenodd">
                               <path fill="none" d="M0 0h32v32H0z"></path>
                               <path d="M24 11.491c0-.823-.668-1.491-1.505-1.491H16l-2-2H9.499C8.67 8 8 8.664 8 9.493v12.014C8 22.332 8.667 23 9.505 23h12.99c.831 0 1.505-.663 1.505-1.491V11.49zM22 21H10v-9h12v9z" fillRule="nonzero" fill="#0070E0"></path>
                            </g>
                         </svg>
                      </span>
                      <span className="mc-tertiary-icon-text"  style={{display: 'inline'}}>
                         <div className="ue-effect-container uee-AppActionsView-SecondaryActionMenu-text-new-folder">New folder</div>
                      </span>
                   </span>
                </button>
                <button
                    className="mc-tertiary-link-button secondary-action-menu__button action-new-shared-folder"
                    onClick={() => this.openModal1('')}
                >
                       <span className="mc-tertiary-link-button-content">
                          <span className="mc-tertiary-icon-wrapper">
                             <svg width="32" height="32" viewBox="0 0 32 32" class="mc-icon-template-actionable">
                                <title>action-new-shared-folder</title>
                                <g fill="none" fillRule="evenodd">
                                   <path fill="none" d="M0 0h32v32H0z"></path>
                                   <path d="M24 11.491c0-.823-.668-1.491-1.505-1.491H16l-2-2H9.499C8.67 8 8 8.664 8 9.493v12.5C8 22.549 8.445 23 9 23h14a1 1 0 0 0 1-.999v-10.51zM22 21H10v-9h12v9zm-11 0h10v2H11v-2z" fill="#0070E0" fillRule="nonzero"></path>
                                   <path d="M16 23h-3.309c-.545 0-.809-.41-.575-.916l.334-.724c.347-.753 1.301-1.36 2.133-1.36h2.834c.832 0 1.786.607 2.133 1.36l.334.724c.234.506-.03.916-.575.916H16zm0-4a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="#0070E0"></path>
                                </g>
                             </svg>
                          </span>
                          <span className="mc-tertiary-icon-text">
                             <div className="ue-effect-container uee-AppActionsView-SecondaryActionMenu-text-new-shared-folder">Create Group</div>
                          </span>
                       </span>
                </button>


            </div>
        )
    }
}
export default withStyles(styles)(RightPanel);