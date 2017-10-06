import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {GridList, GridListTile} from 'material-ui/GridList';

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
        classes: PropTypes.object.isRequired,
        images: PropTypes.array.isRequired
    };

    render(){
        const classes = this.props;

        return (
            <div className={classes.root}>
                <GridList cellHeight={250} className={classes.gridList} cols={10}>
                    {this.props.images.map(tile => (
                        <GridListTile key={tile.img} cols={tile.cols || 1}>
                            <img src={'http://localhost:3001/'+tile.img} alt={'myimage'}/>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }


}


export default withStyles(styles)(ImageGridList);