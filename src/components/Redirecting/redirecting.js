import React from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import MyDiv from './redirecting.style'

export default function Redirecting(props) {
  return (
    <MyDiv>
      <Box className="redirection_box">
        <div className="redirection_inner_box">
          <Alert className="redirection_msg_yellow text-font" severity={props.status}>{props.message}
            <div className="loader" />
          </Alert>
          {/* <Alert className="redirection_msg_green text-font" severity="success">We are redirecting to your page. Please Wait.....
            <div className="loader" />
          </Alert> */}
        </div>
      </Box>
    </MyDiv>
  )
}

