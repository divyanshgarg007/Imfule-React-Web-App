import React from 'react'
import {Box} from '@mui/material'
import AuthImage from '../../images/auth.jpg'
import MyDiv from './authRightPanel.style'
export default function AuthRightPanel(props) {
  return (
    <MyDiv>
      <Box className="auth-image">
        <img
          src={AuthImage}
        />
      </Box>
    </MyDiv>
  )
}


