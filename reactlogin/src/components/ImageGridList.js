import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import {GridList, GridListTile} from 'material-ui/GridList';
import Login from "./Login";
import Message from "./Message";
import Welcome from "./Welcome";
import Signup from "./Signup";
import * as API from '../api/API';
import {Link} from 'react-router-dom';

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
});

class ImageGridList extends Component {

    static propTypes = {
        handleSignUp: PropTypes.func.isRequired
    };

    static propTypes = {
        classes: PropTypes.object.isRequired,
        items: PropTypes.array.isRequired
    };

    //clickModal = (folderpa)
    handleClick = function() {
        this.setState({
            isSelected: true
        })
    }

    render(){
        const classes = this.props;

        return (
            <div className={classes.root}>
                <GridList cellHeight={35} className={classes.gridList} cols={1}>
                    {this.props.items.map(tile => (
                        <GridListTile key={tile} cols={tile.cols || 1}>

                            <div>

                                <div id="myModal" class="modal">


                                    <div class="modal-content">
                                        <span class="close">&times;</span>
                                        <p>Some text in the Modal..</p>
                                    </div>

                                </div>
                                <a href= {'http://localhost:3001/files/download/'+tile} download>{tile} </a>

                                <button className="btn btn-primary" onClick={() => {
                                    var modal = document.getElementById('myModal');
                                    modal.style.display = "block";
                                }}>
                                    Share
                                </button>


                            </div>



                        </GridListTile>
                    ))}
                </GridList>


            </div>
        );
    }


}


export default withStyles(styles)(ImageGridList);