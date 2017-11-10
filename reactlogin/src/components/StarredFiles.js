import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import {GridList, GridListTile} from 'material-ui/GridList';
import Login from "./Login";
import Message from "./Message";
import Welcome from "./Welcome";
import SignUp from "./SignUp";
import * as API from '../api/API';
import {Link} from 'react-router-dom';
//import gridlist from './ImageGridList.css';
//import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import '../stylesheets/Welcome.css';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const styles = theme => ({
    root: {
        top: 32,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: theme.palette.background.paper
    },
    gridList: {
        width: 300,
        height: 300,
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

class StarredFiles extends Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            activeItemName: '',
            activeItemId: null,
            emails: ''
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleShare = this.handleShare.bind(this);
    }

    openModal(item) {
        this.setState({
            modalIsOpen: true,
            activeItemName: item,
            activeItemId: item.id,
            emails: '',
            username: this.props.username
        });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#00f';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handleShare = (userdata) => {
        API.doShare(userdata)
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

    /*static propTypes = {
        handleShare: PropTypes.func.isRequired
    };*/

    static propTypes = {
        classes: PropTypes.object.isRequired,
        items: PropTypes.array.isRequired,
        handleShare: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired
    };

    /* state = {
         isShowingModal: false,
     }*/
    //clickModal = (folderpa)
    /*handleClick() {
        this.openModal();
        this.setState
    }*/
    //handleClose = () => this.setState({isShowingModal: false})

    componentWillMount(item){
        this.setState({
            modalIsOpen: false,
            activeItemName: '',
            activeItemId: null,
            emails: ''
        })
    }

    render(){
        const classes = this.props;

        let buttonList = this.props.items.map( item => {
            return (<button onClick={() => this.openModal(item)}>{item}</button>)
        });

        var style ={
            top: 32
        }

        return (
            //const classes = this.props;
            <div className="mainContainer mainContainerRoot">


                <GridList cellHeight={35} cols={1}>
                    {this.props.items.map(tile => (
                        <GridListTile key={tile} cols={tile.cols || 1}>
                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeModal}
                                style={customStyles}
                                //contentLabel="Example Modal"
                                itemId={this.state.activeItemId}
                                itemName={this.state.activeItemName}
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
                                        onClick={() => this.handleShare(this.state)}>
                                        Share
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={() => this.handleShare(this.state)}>
                                        Star
                                    </button>
                                </form>
                            </Modal>

                            <div className="itemRow">


                                <a href= {'http://localhost:3001/files/download/'+this.props.username+'/'+tile} download style={{color:'#3d464d'}}>{tile} </a>
                                <button className="share-button" onClick={() => this.openModal(tile)} style={{float:'right'}}>Share</button>
                                <button className="share-button" onClick={() => this.openModal(tile)} style={{float:'right'}}>Remove Star</button>







                            </div>



                        </GridListTile>
                    ))}
                </GridList>


            </div>
        );
    }


}


export default withRouter(StarredFiles);