import {React, useState, useEffect} from 'react'
import {Grid, Box, Card, CardContent, CardActions, CardMedia, Typography} from '@mui/material'
import PropTypes from 'prop-types'
import {connect, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import {CustomButton, Snackbar} from '../../../../../components'
import ChangePassword from '../ChangePassword/changePassword'
import SetPassword from '../SetPassword/setPassword'
import {ActionCreators} from '../../../../../redux/actions'
import MyDiv from './userDetails.style'
const UserDetails = (props) => {
  const authState = useSelector((state) => state.authState)
  const [OpenBox, setOpenBox] = useState(false)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
  })
  const handleChangePasswordChange = (e) => {
    let data = {
      ...form,
      [e.target.name]: e.target.value,
    }
    setForm(data)
  }
  const handleSetPasswordChange = (e) => {
    let data = {
      ...values,
      [e.target.name]: e.target.value,
    }
    setValues(data)
  }
  const handleClose = () => {
    setOpenBox(false)
    setForm({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
    setValues({
      password: '',
      confirmPassword: '',
    })
    props.actions.cleanUpState()
  }
  useEffect(() => {
    if (authState?.changePassword?.data?.payload) {
      setMessage(authState.changePassword.data.meta?.message)
      setStatus('success')

      handleClose()

    } else if (authState?.changePassword?.error?.meta) {
      setMessage(authState.changePassword.error.meta?.message)
      setStatus('error')
    }
  }, [authState?.changePassword])
  useEffect(() => {
    if (authState?.setPassword?.data?.payload) {
      setMessage(authState.setPassword.data.meta?.message)
      setStatus('success')
      handleClose()
    } else if (authState?.setPassword?.error?.meta) {
      setMessage(authState.setPassword.error.meta?.message)
      setStatus('error')
    }
  }, [authState?.setPassword])

  const handleChangePassword = (form) => {
    props.actions.changePassword(form)
  }
  const handleSetPassword = (form) => {
    props.actions.setPassword(form)
  }
  const handleSnackBarClose = () => {
    setTimeout(() => {
      setMessage('')
      setStatus('')
    }, 2500)
  }
  return (
    <MyDiv>
      <Snackbar
        message={message}
        severity={status}
        duration={2500}
        open={message.length > 0}
        close={handleSnackBarClose}
      />
      {authState?.session?.data?.has_password &&
        <ChangePassword
          openPopup={OpenBox}
          closePopup={setOpenBox}
          handleChangePassword={handleChangePassword}
          error={authState?.changePassword?.error?.errors}
          handleChange={handleChangePasswordChange}
          form={form}
          handleClose={handleClose}
          loading={authState?.changePassword?.loading}
        />
      }
      {!authState?.session?.data?.has_password &&
      <SetPassword
        openPopup={OpenBox}
        closePopup={setOpenBox}
        handleSetPassword={handleSetPassword}
        handleChange={handleSetPasswordChange}
        form={values}
        handleClose={handleClose}
        error={authState?.setPassword?.error?.errors}
        loading={authState?.setPassword?.loading}
      />
      }
      <Box mt={5} mb={4}>
        <Card className="user_card">
          <Grid container mt={3} mb={2} columnSpacing={{xs: 3, sm: 2, md: 3}}>
            <Grid item md={2} xs={12}>
              <CardMedia>
                <div className="user-img">
                  <img src={props.User} alt="user" />
                </div>
              </CardMedia>
            </Grid>
            <Grid item md={7} xs={12}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" className="text-font profile_name">
                  {props.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" />
              </CardContent>
            </Grid>
            <Grid item md={3} xs={12}>
              <CardActions className="forget-btn">
                <CustomButton fieldlabel={authState?.session?.data?.has_password ? 'Change Password' : 'Set Password'}
                  variant="contained"
                  onClick={() => setOpenBox(true)}
                  className="text-font action_button"
                />
              </CardActions>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </MyDiv>
  )
}
UserDetails.propTypes = {
  User: PropTypes.any,
  title: PropTypes.string,
  fieldlabel: PropTypes.string,
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(UserDetails)
