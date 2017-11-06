import React from 'react';
import {withRouter} from 'react-router-dom';
import '../stylesheets/RightPanel.css';
import TextField from 'material-ui/TextField';


class RightPanel extends React.Component{
    render(){
        return(
            <div className="rightParentContainer">
                <button className="upload-button">Upload files</button>
                <button class="mc-tertiary-link-button secondary-action-menu__button action-new-folder">
                   <span class="mc-tertiary-link-button-content">
                      <span class="mc-tertiary-icon-wrapper">
                         <svg width="32" height="32" viewBox="0 0 32 32" class="mc-icon-template-actionable">
                            <title>action-new-folder</title>
                            <g fill="none" fill-rule="evenodd">
                               <path fill="none" d="M0 0h32v32H0z"></path>
                               <path d="M24 11.491c0-.823-.668-1.491-1.505-1.491H16l-2-2H9.499C8.67 8 8 8.664 8 9.493v12.014C8 22.332 8.667 23 9.505 23h12.99c.831 0 1.505-.663 1.505-1.491V11.49zM22 21H10v-9h12v9z" fill-rule="nonzero" fill="#0070E0"></path>
                            </g>
                         </svg>
                      </span>
                      <span class="mc-tertiary-icon-text">
                         <div class="ue-effect-container uee-AppActionsView-SecondaryActionMenu-text-new-folder">New folder</div>
                      </span>
                   </span>
                </button>
            </div>
        )
    }
}

export default withRouter(RightPanel);