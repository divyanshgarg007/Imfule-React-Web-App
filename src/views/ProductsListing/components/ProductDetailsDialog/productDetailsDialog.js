/* eslint-disable radix */
import {React, useState, useEffect} from 'react'
import {Grid, Box, Drawer, Divider, Typography, CardContent, CardActions, IconButton} from '@mui/material'
import {Close as CloseIcon} from '@mui/icons-material'
import {styled} from '@mui/material/styles'
import {connect, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import moment from 'moment'
import {compose} from 'recompose'
import {ActionCreators} from '../../../../redux/actions'
import {getToken} from '../../../../utilities/authUtils'
import {CustomButton, PreviewCard, CustomDateTimePicker, Loader, Snackbar, AlertDialog} from '../../../../components'
import {ProductDetailsLeftPanel} from '..'
import MyDiv from './productDetailsDialog.style'

const CustomDrawer = styled(Drawer)(
  ({theme, open}) => ({
    '& .MuiDrawer-paperAnchorLeft': {
      width: '100%',
      [theme.breakpoints.up('xs')]: {
        width: '100%',
      },
      [theme.breakpoints.up('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.up('md')]: {
        width: '80%',
      },
    },
  }),
)
function ProductDetailsDialog(props) {
  const productState = useSelector((state) => state.productState)
  const userState = useSelector((state) => state.userState)
  const postState = useSelector((state) => state?.postState)
  const masterState = useSelector((state) => state?.masterState)
  const mediaState = useSelector((state) => state?.mediaState)
  const authState = useSelector((state) => state.authState)
  const [socialMediaData, setSocialMediaData] = useState([])
  const [imfuleCloudData, setImfuleCloudData] = useState([])
  const [scheduleDate, setScheduleDate] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [alert, setAlert] = useState(false)
  const [timeZone, setTimeZone] = useState({
    timezone: '',
    id: '',
  })
  const [alertLabel, setAlertLabel] = useState(
    {
      title: '',
      subtitle: '',
      button: '',
      close: '',
    },
  )
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(['00'])
  const handleHours = (event) => {
    const {
      target: {value},
    } = event
    setHours(
      typeof value === 'string' ? value.split(',') : value,
    )
  }
  const handleMinutes = (event) => {
    const {
      target: {value},
    } = event
    setMinutes(
      typeof value === 'string' ? value.split(',') : value,
    )
  }
  useEffect(() => {
    if (props?.scheduleData) {
      setScheduleDate(moment(props?.scheduleData).format('DD-MM-YYYY'))
      setHours(moment(props?.scheduleData).format('HH'))
      setMinutes([moment(props?.scheduleData).format('mm')])
    }
  }, [props?.scheduleData])

  useEffect(() => {
    let timeZone = null
    if ((props.productDetailType === 'Add')) {
      timeZone = userState?.getStore?.data?.payload.filter((store) => store.id === getToken('selectedStore'))[0]?.timezone
      if (timeZone && timeZone !== 'undefined') {
        const timeZoneData = masterState?.timeZoneList?.data?.payload.filter((store) => store.id === timeZone.id)[0]
        let data = {
          timezone: timeZoneData?.timezone,
          id: timeZoneData?.id,
        }
        setTimeZone(data)
      } else {
        let data = {
          timezone: '',
          id: '',
        }
        setTimeZone(data)
      }

    } else {
      const timeZoneData = masterState?.timeZoneList?.data?.payload.filter((store) => store.id === props.timezone)[0]
      let data = {
        timezone: timeZoneData?.timezone,
        id: timeZoneData?.id,
      }
      setTimeZone(data)
    }
  }, [props.open])
  // useEffect(() => {
  //   if (!userState?.connectedSocialMediaWithShops?.isLoaded) {
  //     props.actions.connectedSocialMediaWithShopsAction()
  //   }
  // }, [])

  useEffect(() => {
    if (authState?.session?.data?.company_id && userState?.getStore?.data?.payload[0]?.id) {
      let obj = {
        per_page: 20,
        page: 1,
        sort: 'id',
        order: 'desc',
      }
      props.actions.getMediaListAction(obj)
    }
  }, [props.productData])

  useEffect(() => {
    if (mediaState?.getMediaList?.data?.payload) {
      setImfuleCloudData(mediaState?.getMediaList?.data?.payload?.data)
    }
  }, [mediaState?.getMediaList])

  useEffect(() => {
    if (userState?.connectedSocialMediaWithShops?.data?.payload) {
      setSocialMediaData(userState.connectedSocialMediaWithShops.data.payload)
    }
  }, [userState.connectedSocialMediaWithShops])
  const handleSnackBarClose = () => {
    setMessage('')
    setStatus('')
  }
  const handleClose = () => {
    props.onClose()
    setScheduleDate('')
    setHours(0)
    setMinutes(['00'])
    setTimeZone({
      title: '',
      id: '',
    })
    props.actions.cleanUpSocialMediaPostState()
    //props.actions.cleanUpPostedState()
    props.actions.cleanUpStateStore()
    props.actions.cleanUpMediaState()
    handleSnackBarClose()
  }
  useEffect(() => {
    if (userState?.addPostOnSocialMedia?.data?.payload && props.productDetailType) {
      setMessage(userState.addPostOnSocialMedia?.data?.meta?.message)
      setStatus(userState.addPostOnSocialMedia?.data?.meta?.status)
      //props.actions.cleanUpPostedState()
      //props.actions.getCalendarPostedListAction()
      let data = {
        per_page: '20',
        page: 1,
      }
      if (props.startDate !== undefined && props.endDate !== undefined) {
        props.actions.getCalendarPostedListAction(props.startDate, props.endDate)
      } else {
        props.actions.archiveListAction(data)
        props.actions.getPostedListAction(data)
      }
      setTimeout(() => {
        handleClose()
      }, 2500)
    } else if (userState.addPostOnSocialMedia?.error?.meta) {
      setMessage(userState.addPostOnSocialMedia?.error.meta?.message)
      setStatus('error')
    }
  }, [userState.addPostOnSocialMedia])

  useEffect(() => {
    if (postState?.updatePostedData?.data?.payload && props.productDetailType) {
      setMessage(postState.updatePostedData?.data?.meta?.message)
      setStatus(postState.updatePostedData?.data?.meta?.status)
      let data = {
        per_page: '20',
        page: 1,
      }
      if (props.startDate !== undefined && props.endDate !== undefined) {
        props.actions.getCalendarPostedListAction(props.startDate, props.endDate)
      } else {
        props.actions.getPostedListAction(data)
      }
      setTimeout(() => {
        handleClose()
      }, 2500)
    } else if (postState.updatePostedData?.error?.meta) {
      setMessage(postState.updatePostedData?.error.meta?.message)
      setStatus('error')
    }
  }, [postState.updatePostedData])
  function changeTimeZone(date, timeZone) {
    if (typeof date === 'string') {
      return new Date(
        new Date(date).toLocaleString('en-US', {
          timeZone,
        }),
      )
    }

    return new Date(
      date.toLocaleString('en-US', {
        timeZone,
      }),
    )
  }
  const handleAddPostOnSocialMedia = () => {
    const addPostDataFacebook = []
    const addPostDataInstagram = []
    const addPostDataPinterest = []
    const addPostDataTwitter = []
    const addPostDataLinkedin = []
    const newDate = moment(`${scheduleDate} ${hours} ${minutes}`, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DD HH:mm:00')
    // let currentOptions = {
    //     timeZone: timeZone?.timezone ? timeZone?.timezone : 'Asia/Kolkata',
    //     year: 'numeric',
    //     month: 'numeric',
    //     day: 'numeric',
    //     hour: 'numeric',
    //     minute: 'numeric',
    //     second: 'numeric',
    //   },
    //   currentFormatter = new Intl.DateTimeFormat([], currentOptions)
    const laDate = changeTimeZone(new Date(), timeZone?.timezone ? timeZone?.timezone : 'Asia/Kolkata')
    if (moment(newDate).isSameOrAfter(laDate) || !scheduleDate) {
      const masterImage = props.productData?.images?.filter((image) => image.is_master === 1)[0]?.image_url
      if (props.productDetailType === 'Add' || props.productDetailType === 'Reshare') {
        postState?.addPostData.map((data) => {
          if (data.type === 1) {
            let obj = {
              title: props.productData?.product_name,
              page_id: data?.page_id,
              description: data.description.trim(),
              scheduled_at: scheduleDate ? newDate : '',
              type: scheduleDate ? 'schedule' : 'now',
              post_type: 'product_post',
              image: data.image,
              product_id: props.productData?.id,
              master_image: masterImage,
              timezone: timeZone?.id ? timeZone?.id : null,
            }
            return addPostDataFacebook.push(obj)
          } else if (data.type === 2) {
            let obj = {
              title: props.productData?.product_name,
              account_id: data?.page_id,
              description: data.description.trim(),
              scheduled_at: scheduleDate ? newDate : '',
              type: scheduleDate ? 'schedule' : 'now',
              post_type: 'product_post',
              image: data.image,
              product_id: props.productData?.id,
              master_image: masterImage,
              timezone: timeZone?.id ? timeZone?.id : null,
            }
            return addPostDataInstagram.push(obj)
          } else if (data.type === 3) {
            let obj = {
              title: data.title,
              board_id: data?.page_id,
              description: data.description.trim(),
              scheduled_at: scheduleDate ? newDate : '',
              type: scheduleDate ? 'schedule' : 'now',
              post_type: 'product_post',
              image: data.image,
              product_id: props.productData?.id,
              master_image: masterImage,
              timezone: timeZone?.id ? timeZone?.id : null,
            }
            return addPostDataPinterest.push(obj)
          } else if (data.type === 4) {
            let obj = {
              title: props.productData?.product_name,
              account_id: data?.page_id,
              description: data.description.trim(),
              scheduled_at: scheduleDate ? newDate : '',
              type: scheduleDate ? 'schedule' : 'now',
              post_type: 'product_post',
              image: data.image,
              product_id: props.productData?.id,
              master_image: masterImage,
              timezone: timeZone?.id ? timeZone?.id : null,
            }
            return addPostDataTwitter.push(obj)
          } else if (data.type === 5) {
            let obj = {
              title: props.productData?.product_name,
              organization_id: data?.page_id,
              description: data.description.trim(),
              scheduled_at: scheduleDate ? newDate : '',
              type: scheduleDate ? 'schedule' : 'now',
              post_type: 'product_post',
              image: data.image,
              product_id: props.productData?.id,
              master_image: masterImage,
              timezone: timeZone?.id ? timeZone?.id : null,
            }
            return addPostDataLinkedin.push(obj)
          }
        })
        const data = {
          payload: {
            facebook: addPostDataFacebook,
            instagram: addPostDataInstagram,
            pinterest: addPostDataPinterest,
            twitter: addPostDataTwitter,
            linkedin: addPostDataLinkedin,
          },
        }
        props.actions.postOnSocialMediaAction(data)
      } else if (props.productDetailType === 'Update') {
        postState?.addPostData.map((data) => {
          if (data.type === 1) {
            let obj = {
              id: data.id,
              title: props.productData?.product_name,
              page_id: data?.page_id,
              description: data.description.trim(),
              scheduled_at: scheduleDate ? newDate : '',
              type: scheduleDate ? 'schedule' : 'now',
              post_type: 'product_post',
              image: data.image,
              product_id: props.productData?.id,
              master_image: masterImage,
              timezone: timeZone?.id ? timeZone?.id : null,
            }
            return addPostDataFacebook.push(obj)
          } else if (data.type === 2) {
            let obj = {
              id: data.id,
              title: props.productData?.product_name,
              account_id: data?.page_id,
              description: data.description.trim(),
              scheduled_at: scheduleDate ? newDate : '',
              type: scheduleDate ? 'schedule' : 'now',
              post_type: 'product_post',
              image: data.image,
              product_id: props.productData?.id,
              master_image: masterImage,
              timezone: timeZone?.id ? timeZone?.id : null,
            }
            return addPostDataInstagram.push(obj)
          } else if (data.type === 3) {
            let obj = {
              id: data.id,
              title: data.title,
              board_id: data?.page_id,
              description: data.description.trim(),
              scheduled_at: scheduleDate ? newDate : '',
              type: scheduleDate ? 'schedule' : 'now',
              post_type: 'product_post',
              image: data.image,
              product_id: props.productData?.id,
              master_image: masterImage,
              timezone: timeZone?.id ? timeZone?.id : null,
            }
            return addPostDataPinterest.push(obj)
          } else if (data.type === 4) {
            let obj = {
              id: data.id,
              title: props.productData?.product_name,
              account_id: data?.page_id,
              description: data.description.trim(),
              scheduled_at: scheduleDate ? newDate : '',
              type: scheduleDate ? 'schedule' : 'now',
              post_type: 'product_post',
              image: data.image,
              product_id: props.productData?.id,
              master_image: masterImage,
              timezone: timeZone?.id ? timeZone?.id : null,
            }
            return addPostDataTwitter.push(obj)
          } else if (data.type === 5) {
            let obj = {
              id: data.id,
              title: props.productData?.product_name,
              organization_id: data?.page_id,
              description: data.description.trim(),
              scheduled_at: scheduleDate ? newDate : '',
              type: scheduleDate ? 'schedule' : 'now',
              post_type: 'product_post',
              image: data.image,
              product_id: props.productData?.id,
              master_image: masterImage,
              timezone: timeZone?.id ? timeZone?.id : null,
            }
            return addPostDataLinkedin.push(obj)
          }
        })
        const data = {
          payload: {
            facebook: addPostDataFacebook,
            instagram: addPostDataInstagram,
            pinterest: addPostDataPinterest,
            twitter: addPostDataTwitter,
            linkedin: addPostDataLinkedin,
          },
        }
        props.actions.updatePostedDataAction(props.postId, data)
      }
    } else {
      const alertData = {
        subtitle: 'Schedule date always greater than current date and time',
        close: 'Ok',
      }
      setAlertLabel(alertData)
      setAlert(true)
    }
  }

  const handleTimeZoneChange = (event, newValue) => {
    setTimeZone(newValue)
  }
  const handleAlertClose = () => {
    setAlertLabel('')
    setAlert(false)
  }
  const handleResetScheduleData = () => {
    setScheduleDate('')
    setHours(0)
    setMinutes(['00'])
  }
  const handleChangeIndex = (idx) => {
    props.actions.getPostDataIndexAction(idx)
  }
  const productPopup = (anchor) => (
    <MyDiv>
      <AlertDialog
        openDialog={alert}
        handleDeleteClose={handleAlertClose}
        handleClose={handleAlertClose}
        alertLabel={alertLabel}
      />
      {(productState?.productDetails?.loading || userState?.connectedPagesWithSocialMedia?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Snackbar
        message={message}
        severity={status}
        duration={2500}
        open={message.length > 0}
        close={handleSnackBarClose}
      />
      <Box className="sidebar-inner" >
        <Grid container>
          <Grid item md={12} xs={12}>
            <CardContent>
              <Grid container className="edit_grid">
                <Grid item xs={6} md={4} sm={4}>
                  <Typography gutterBottom variant="h5" component="div" className="text-font details_title" >
                    {props.productDetailType === 'Add' ? 'Add New Post' : props.productDetailType === 'Update' ? 'Update Post' : 'Reshare post'}
                  </Typography>
                </Grid>
                <Grid item xs={0} md={8} sm={8} display={{xs: 'none', lg: 'block', sm: 'block'}}>
                  <CardActions className="details_actions">
                    <CustomDateTimePicker
                      setValue={setScheduleDate}
                      value={scheduleDate || null}
                      handleTimeZoneChange={handleTimeZoneChange}
                      timeZone={timeZone}
                      handleHours={handleHours}
                      hours={hours}
                      handleMinutes={handleMinutes}
                      minutes={minutes}
                      handleResetScheduleData={handleResetScheduleData}
                    />
                    <CustomButton
                      name="product"
                      disabled={!(postState?.addPostData[0]?.currentNetwork && postState?.addPostData[0]?.page_id)}
                      fieldlabel={props.productDetailType === 'Add' ? 'Add New Post' : props.productDetailType === 'Update' ? 'Update Post' : 'Reshare post'}
                      loading={userState?.addPostOnSocialMedia?.loading || postState?.updatePostedData?.loading}
                      onClick={handleAddPostOnSocialMedia} variant="contained"
                      className={userState?.addPostOnSocialMedia?.loading || postState?.updatePostedData?.loading ? 'disable_action text-font' : 'text-font action_button'}
                    />
                    <div className="close_icon">
                      <IconButton onClick={handleClose} color="primary">
                        <CloseIcon />
                      </IconButton>
                    </div>
                  </CardActions>
                </Grid>
                <Grid item xs={6} display={{xs: 'block', lg: 'none', sm: 'none'}}>
                  <CardActions className="close_icon">
                    <IconButton onClick={handleClose} color="primary">
                      <CloseIcon />
                    </IconButton>
                  </CardActions>
                </Grid>
              </Grid>
              <Divider />
              <Box sx={{width: '100%'}} mt={4}>
                <Grid container>
                  <Grid item md={12} xs={12}>
                    <Grid container spacing={4} >
                      <Grid item xs={12} md={6}>
                        <ProductDetailsLeftPanel
                          productData={props.productData}
                          socialMediaData={socialMediaData}
                          imfuleCloudData={imfuleCloudData}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} className="preview_grid_box">
                        <Box className="preview_box_head">
                          <Typography
                            variant="h6"
                            color="text.primary"
                            className="text-font preview_title"
                          >
                            Preview
                          </Typography>
                        </Box>
                        <PreviewCard socialMediaType={postState.addPostData} productData={props.productData} handleChangeIndex={handleChangeIndex} />
                      </Grid>

                      <Grid item xs={12} display={{xs: 'block', lg: 'none', sm: 'none'}}>
                        <CardActions className="details_actions">
                          <CustomDateTimePicker
                            setValue={setScheduleDate}
                            value={scheduleDate || null}
                            handleTimeZoneChange={handleTimeZoneChange}
                            timeZone={timeZone}
                            handleHours={handleHours}
                            hours={hours}
                            handleMinutes={handleMinutes}
                            minutes={minutes}
                            handleResetScheduleData={handleResetScheduleData}
                          />
                          <CustomButton
                            disabled={!(postState?.addPostData[0]?.currentNetwork && postState?.addPostData[0]?.page_id)}
                            fieldlabel={props.productDetailType === 'Add' ? 'Add New Post' : props.productDetailType === 'Update' ? 'Update Post' : 'Reshare post'}
                            loading={userState?.addPostOnSocialMedia?.loading || postState?.updatePostedData?.loading}
                            onClick={handleAddPostOnSocialMedia} variant="contained"
                            className={userState?.addPostOnSocialMedia?.loading ? 'disable_action text-font' : 'text-font action_button'}
                          />
                        </CardActions>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Box>
    </MyDiv>
  )

  return (

    <CustomDrawer
      className="sidebar"
      anchor="left"
      open={props.open}
      onClose={handleClose}
    >
      {productPopup('left')}
    </CustomDrawer>
  )
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(ProductDetailsDialog)
