import React from 'react'
import PropTypes from 'prop-types'
import {Snackbar, IconButton} from '@mui/material'
import {Close as CloseIcon} from '@mui/icons-material'
import Alert from '@mui/material/Alert'
import {ErrorTimeOut} from '../../constants/constant'
import MyDiv from './snackbar.style'

export default function SnackbarComponent(props) {
  const {message, severity, open} = props
  const handleClose = () => {
    props.close()
  }
  const closeBtn = () => {
    return (
      <>
        <IconButton
          aria-label="close"
          color="inherit"
          className="close"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </>
    )
  }
  return (
    <MyDiv>
      <Snackbar open={open}
        autoHideDuration={ErrorTimeOut}
        onClose={handleClose}
        action={closeBtn()}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        className="custom_snack"
      >
        <Alert severity={severity} className="text-font custom_snack_alert">
          {message}
        </Alert>
      </Snackbar>
    </MyDiv>
  )
}

SnackbarComponent.propTypes = {
  message: PropTypes.string,
  severity: PropTypes.string,
  duration: PropTypes.number,
  open: PropTypes.bool,
  close: PropTypes.func,
}

