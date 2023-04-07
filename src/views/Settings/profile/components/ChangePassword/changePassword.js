import React from 'react'
import {Grid, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography} from '@mui/material'
// import {CircularProgress} from '@material-ui/core'
import {CustomButton, CustomTextBox, Loader} from '../../../../../components'
import MyDiv from './changePassword.style'
const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function ChangePassword(props) {
  const handleChangePassword = () => {
    props.handleChangePassword(props.form)
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
      >Change Password</DialogTitle>
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
              <Grid container >
                <Grid item md={12} xs={12}>
                  <Box>
                    <Typography
                      variant="h6"
                      color="text.primary"
                      fontSize="0.9rem"
                      className="text-font"
                      align="left"
                    >
                      Old Password
                    </Typography>
                    <CustomTextBox
                      type="password"
                      required
                      variant="standard"
                      //fieldlabel="Old Password"
                      name="oldPassword"
                      value={props?.form?.oldPassword}
                      onChange={props?.handleChange('oldPassword')}
                      error={props.error?.old_password || props.Validator.message('oldPassword', props?.form?.oldPassword, 'required')}
                      onBlur={() => props.Validator.showMessageFor('oldPassword')}
                      helperText={props.error?.old_password}
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
                      New Password
                    </Typography>
                    <CustomTextBox
                      type="password"
                      required
                      variant="standard"
                      //fieldlabel="New Password"
                      name="newPassword"
                      value={props?.form?.newPassword}
                      onChange={props.handleChange('newPassword')}
                      error={props.error?.password || props.Validator.message('newPassword', props?.form?.newPassword, 'required')}
                      onBlur={() => props.Validator.showMessageFor('newPassword')}
                      helperText={props.error?.password}
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
                      onChange={props.handleChange('confirmPassword')}
                      error={props.error?.password_confirmation || props.Validator.message('confirmPassword', props?.form?.confirmPassword, 'required')}
                      onBlur={() => props.Validator.showMessageFor('confirmPassword')}
                      helperText={props.error?.password_confirmation}
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
        <CustomButton fieldlabel="Submit" variant="contained" onClick={handleChangePassword} className="text-font action_button" />
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
