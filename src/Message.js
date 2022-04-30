import React from 'react'
import { Avatar } from '@material-ui/core'
import './Message.css'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'

function Message(props) {
  const user = props.user;
  const timestamp = props.timestamp;
  const message = props.message;
  const messageId = props.id;
  const disableActions = !props.canDoThings;

  
  return (
    <div className='message'>
        <Avatar src={user.photo}/>
        <div className='message__info'>
            <h4>{user.displayName}
                <span className='message__timestamp'>{new Date(timestamp?.toDate()).toUTCString()}</span>
            </h4>
            <p>{message}</p>
        </div>
        <div className='message_actionsContainer'>
          <div className='message__actions' >
          <IconButton disabled = {disableActions} onClick={() => console.log('dont do nothin yet')}>
              <EditIcon fontSize='small'/>
            </IconButton>
            <IconButton disabled = {disableActions} onClick={() => props.onDelete({user, messageId})}>
              <DeleteIcon fontSize='small'/>
            </IconButton>
          </div>
        </div>
        
      
    </div>
  )
}

export default Message