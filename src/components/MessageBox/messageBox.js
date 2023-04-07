import React from 'react'
import {Box} from '@mui/material'
import {Add as AddIcon} from '@mui/icons-material'
import {CustomButton} from '..'
import MyDiv from './messageBox.style'

export default function MessageBox(props) {

  return (
    <MyDiv>
      <Box className="empty_box">
        <div className="empty_box_inner">
          <div className="empty_msg text-font">
            {props.messageTitle}
          </div>
          {props.disableBtn === true &&
            <div className="schedule_btn">
              <CustomButton fieldlabel={props.messageBtn} variant="contained" className="text-font action_button" onClick={props.handleClick}
                startIcon={props.startIcon ? <AddIcon /> : ''}
              />
            </div>
          }
        </div>
      </Box>
    </MyDiv>
  )
}
