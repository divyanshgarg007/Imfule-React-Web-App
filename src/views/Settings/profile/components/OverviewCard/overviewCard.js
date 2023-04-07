import {React, useState, useEffect, useRef} from 'react'
import {Grid, Box, CardContent, CardActions, Divider, Typography} from '@mui/material'
import PropTypes from 'prop-types'
import {connect, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import SimpleReactValidator from 'simple-react-validator'
import {CustomButton, Snackbar} from '../../../../../components'
import ChangePassword from '../ChangePassword/changePassword'
import SetPassword from '../SetPassword/setPassword'
import EditProfile from '../EditProfile/editProfile'
import {ActionCreators} from '../../../../../redux/actions'
import MyDiv from './overviewCard.style'
const OverviewCard = (props) => {
  const authState = useSelector((state) => state.authState)
  const masterState = useSelector((state) => state.masterState)
  const [openProfileEditor, setOpenProfileEditor] = useState(false)
  const [OpenBox, setOpenBox] = useState(false)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [profileValues, setProfileValues] = useState({})
  const [changePasswordValues, setChangePasswordValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [values, setValues] = useState({
    password: '',
    confirmPassword: '',
  })
  const simpleValidator = useRef(new SimpleReactValidator())
  const simpleValidator1 = useRef(new SimpleReactValidator())
  const simpleValidator2 = useRef(new SimpleReactValidator())
  const [, forceUpdate] = useState()
  const [, forceUpdate1] = useState()
  const [, forceUpdate2] = useState()
  const [user, setUser] = useState(null)
  const [countryList, setCountryList] = useState([])
  useEffect(() => {
    if (authState?.session?.data) {
      setUser(authState.session.data)
    }
  }, [authState?.session])
  useEffect(() => {
    if (masterState?.countries?.data) {
      setCountryList(masterState.countries.data?.payload)
    }
  }, [masterState?.countries])
  const handleProfileChange = (prop) => (event) => {
    setProfileValues({
      ...profileValues,
      [prop]: event.target.value,
    })
  }
  const handleChangePasswordChange = (prop) => (event) => {
    setChangePasswordValues({
      ...changePasswordValues,
      [prop]: event.target.value,
    })
  }
  const handleSetPasswordChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    })
  }
  const handleClose = () => {
    setOpenProfileEditor(false)
    setProfileValues({})
    setOpenBox(false)
    setChangePasswordValues({
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
    if (authState?.updateProfile?.data?.payload) {
      setMessage(authState.updateProfile.data.meta?.message)
      setStatus('success')
      handleClose()
    } else if (authState?.updateProfile?.error?.meta) {
      setMessage(authState.updateProfile.error.meta?.message)
      setStatus('error')
    }
  }, [authState?.updateProfile])
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

  const handleProfileUpdate = (values) => {
    let isValid = simpleValidator.current.allValid()

    if (!isValid) {
      simpleValidator.current.showMessages(true)
      forceUpdate(1)
    }
    if (simpleValidator.current.allValid()) {
      props.actions.updateProfileAction(values)
    }
  }
  const handleChangePassword = (form) => {
    let isValid = simpleValidator1.current.allValid()

    if (!isValid) {
      simpleValidator1.current.showMessages(true)
      forceUpdate1(1)
    }
    if (simpleValidator1.current.allValid()) {
      props.actions.changePassword(form)
    }
  }
  const handleSetPassword = (form) => {
    let isValid = simpleValidator2.current.allValid()

    if (!isValid) {
      simpleValidator2.current.showMessages(true)
      forceUpdate2(1)
    }
    if (simpleValidator2.current.allValid()) {
      props.actions.setPassword(form)
    }
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
      <EditProfile
        openDrawer={openProfileEditor}
        closeDrawer={handleClose}
        handleProfileUpdate={handleProfileUpdate}
        userData={user}
        countryList={countryList}
        loading={authState?.updateProfile?.loading}
        handleChange={handleProfileChange}
        setValues={setProfileValues}
        values={profileValues}
        error={authState?.updateProfile?.error?.errors}
        Validator={simpleValidator.current}
      />
      {authState?.session?.data?.has_password &&
        <ChangePassword
          openPopup={OpenBox}
          closePopup={setOpenBox}
          handleChangePassword={handleChangePassword}
          error={authState?.changePassword?.error?.errors}
          handleChange={handleChangePasswordChange}
          setChangePasswordValues={setChangePasswordValues}
          form={changePasswordValues}
          handleClose={handleClose}
          loading={authState?.changePassword?.loading}
          Validator={simpleValidator1.current}
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
        Validator={simpleValidator2.current}
      />
      }
      <Box className="box_tabs">
        {/* <Profile /> */}
        <Grid container>
          <Grid item md={12} xs={12}>
            <CardContent className="content-body">
              <Grid container className="edit_grid">
                <Grid item xs={12} md={6} sm={6}>
                  <Typography gutterBottom variant="h5" component="div" className="text-font detail_heading">
                    Profile Details
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6} sm={6}>
                  <CardActions className="profile_actions">
                    <CustomButton fieldlabel="Edit Profile" variant="outlined" onClick={() => setOpenProfileEditor(true)} className="text-font action_button_outlined" />
                    <CustomButton
                      fieldlabel={authState?.session?.data?.has_password ? 'Change Password' : 'Set Password'}
                      variant="contained"
                      onClick={() => setOpenBox(true)}
                      className="text-font action_button"
                    />
                  </CardActions>
                </Grid>
              </Grid>
              <Divider />
              <Box sx={{width: '100%'}} mt={4}>
                <Grid container>
                  <Grid item md={6} xs={12}>
                    <Grid container rowSpacing={3} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                      {/* <Grid item xs={12}>
                        <CardMedia>
                          <div className="user-img">
                            <Avatar
                              alt="Remy Sharp"
                            />
                          </div>
                        </CardMedia>
                      </Grid> */}
                      <Grid item xs={6}>
                        <Typography variant="body2"
                          className="text-font detail_title"
                        >
                          Name
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" className="text-font detail_subtitle">
                          {user?.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" className="text-font detail_title">
                          Phone Number
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" className="text-font detail_subtitle">
                          {user?.phone}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" className="text-font detail_title">
                          Email
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" className="text-font detail_subtitle">
                          {user?.email}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={6} xs={12} />
                </Grid>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Box>
    </MyDiv>
  )
}
OverviewCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  userData: PropTypes.any,
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(OverviewCard)
