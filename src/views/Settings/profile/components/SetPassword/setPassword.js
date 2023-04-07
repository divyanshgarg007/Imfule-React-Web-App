import React from 'react'
import {Grid, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography} from '@mui/material'
import PropTypes from 'prop-types'
// import {CircularProgress} from '@material-ui/core'
import {CustomButton, CustomTextBox, Loader} from '../../../../../components'
import MyDiv from './setPassword.style'
const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function SetPassword(props) {
  const handleSetPassword = () => {
    props.handleSetPassword(props.form)
  }
  const popup = (popupbox) => (
    <MyDiv>
      {props.loading &&
      <div>
        {/* <CircularProgress style={{height: '40px', width: '40px', zIndex: 1000, position: 'absolute', top: '50%', left: '50%'}} /> */}
        <Loader />
      </div>
      }
      <DialogTitle className="center text-font"
        gutterBottom
        variant="h5"
        component="div"
      >Set Password</DialogTitle>
      <DialogContent className="no-scroll">
        <DialogContentText id="alert-dialog-slide-description" variant="body1"
          color="#333"
          textAlign="center"
          fontSize="0.9rem"
          fontFamily="Poppins"
          fontWeight="500"
        >
          Please enter your new password
        </DialogContentText>
        <Box sx={{width: '100%'}} mt={3}>
          <Grid container>
            <Grid item md={12} xs={12}>
              <Grid container>
                <Grid item md={12} xs={12}>
                  <Box>
                    <Typography
                      variant="h6"
                      color="text.primary"
                      fontSize="0.9rem"
                      className="text-font"
                      align="left"
                    >
                      Password
                    </Typography>
                    <CustomTextBox
                      type="password"
                      required
                      variant="standard"
                      //fieldlabel="Password"
                      name="password"
                      value={props?.form?.password}
                      onChange={props?.handleChange('password')}
                      // error={props?.error?.password}
                      error={props.error?.password || props.Validator.message('password', props?.form?.password, 'required')}
                      onBlur={() => props.Validator.showMessageFor('password')}
                      helperText={props?.error?.password}
                    />
                  </Box>
                </Grid>
                <Grid item md={12} xs={12}>
                  <Box>
                    <Typography
                      variant="h6"
                      color="text.primary"
                      fontSize="0.9rem"
                      className="text-font"
                      align="left"
                    >
                      Confirm New Password
                    </Typography>
                    <CustomTextBox
                      type="password"
                      required
                      variant="standard"
                      //fieldlabel="Confirm New Password"
                      name="confirmPassword"
                      value={props?.form?.confirmPassword}
                      onChange={props?.handleChange('confirmPassword')}
                      error={props.error?.confirmPassword || props.Validator.message('confirmPassword', props?.form?.confirmPassword, 'required')}
                      onBlur={() => props.Validator.showMessageFor('confirmPassword')}
                      helperText={props?.error?.confirmPassword}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions className="custom_dialog_action">
        <CustomButton fieldlabel="Cancel" variant="outlined" onClick={() => props.handleClose()} className="text-font action_button_outlined" />
        <CustomButton fieldlabel="Submit" variant="contained" onClick={handleSetPassword} className="text-font action_button" />
      </DialogActions>
    </MyDiv>
  )

  return (

    <Dialog
      popupbox="openPopup"
      open={props.openPopup}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      onClose={() => props.handleClose()}
      aria-describedby="alert-dialog-slide-description"
    >
      {popup('openPopup')}
    </Dialog>
  )
}
SetPassword.propTypes = {
  openPopup: PropTypes.bool,
  closePopup: PropTypes.func,
  handleSetPassword: PropTypes.func,
}
