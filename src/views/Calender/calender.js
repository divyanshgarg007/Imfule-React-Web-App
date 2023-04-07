import React, {useState, useEffect} from 'react'
import {Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar} from '@mui/material'
import {connect, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import moment from 'moment'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import ShareIcon from '@mui/icons-material/Share'
import {isMobile} from 'react-device-detect'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {ActionCreators} from '../../redux/actions'
import {getToken} from '.././../utilities/authUtils'
import {Loader, Snackbar, AlertDialog} from '../../components'
import ProductDetailsDialog from '../ProductsListing/components/ProductDetailsDialog'
import CollageDetailsDialog from '../Promotion/components/CollageDetailsDialog'
import {ProductListingDialog} from './components'
import MyDiv from './calender.style'

function Calender(props) {
  const [open, setOpen] = useState(false)
  const [postId, setPostId] = useState('')
  const [openEdit, setOpenEdit] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const postState = useSelector((state) => state?.postState)
  const productState = useSelector((state) => state.productState)
  const [postedData, setPostedData] = useState([])
  const [scheduleData, setScheduleData] = useState()
  const [productData, setProductData] = useState([])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [productDetailsType, setProductDetailsType] = useState('')
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [openCollageDetails, setOpenCollageDetails] = useState(false)
  const [timezone, setTimeZone] = useState()
  const [alertLabel, setAlertLabel] = useState(
    {
      title: '',
      subtitle: '',
      button: '',
      close: '',
    },
  )
  const handleDateClick = (date) => {
    if (moment().format('YYYY-MM-DDTHH:mm:ss') === moment(date?.dateStr).format('YYYY-MM-DDTHH:mm:ss') || moment(date?.dateStr).isAfter(moment())) {
      setScheduleData(moment(date?.dateStr).format('YYYY-MM-DDTHH:mm:ss'))
      setOpenAdd(true)
    }
  }
  const handleAddClose = () => {
    setOpenAdd(false)
    setScheduleData('')
  }
  const handleEventClick = (data) => {
    data.jsEvent.preventDefault()
  }
  const handleEditClose = () => {
    setProductDetailsType('')
    setOpenEdit(false)
    setScheduleData()
  }
  const handleClose = () => {
    setAlertLabel('')
    setOpen(false)
    setPostId('')
  }
  useEffect(() => {
    if (startDate !== undefined && endDate !== undefined) {
      props.actions.getCalendarPostedListAction(startDate, endDate)
    }
  }, [startDate, endDate])
  useEffect(() => {
    if (postState?.getCalendarPostedList?.data?.payload) {
      const postData = []
      postState?.getCalendarPostedList?.data?.payload?.scheduled_posts?.map((data) => {
        let obj = {
          title: data.title,
          event_id: data.id,
          className: 'scheduled',
          start: moment(data.schedule_at).format('YYYY-MM-DDTHH:00:00'),
          end: moment(data.schedule_at).format('YYYY-MM-DDTHH:mm:ss'),
          url: data.master_image,
        }
        return postData.push(obj)
      })
      postState?.getCalendarPostedList?.data?.payload?.archive_posts?.map((data) => {
        let obj = {
          title: data.title,
          event_id: data.id,
          className: 'archive',
          start: moment(data.posted_at).format('YYYY-MM-DDTHH:00:00'),
          end: moment(data.posted_at).format('YYYY-MM-DDTHH:mm:ss'),
          url: data.master_image,
        }
        return postData.push(obj)
      })
      setPostedData(postData)
    }
  }, [postState?.getCalendarPostedList])
  const renderLimitDesc = (type) => {
    let limit
    if (type === 1) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.facebook?.description
    } else if (type === 2) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.instagram?.description
    } else if (type === 3) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.pinterest?.description
    } else if (type === 4) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.twitter?.description
    } else if (type === 5) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.linkedin?.description
    }
    return limit
  }
  const renderLimitTitle = (type) => {
    let limit
    if (type === 1) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.facebook?.title
    } else if (type === 2) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.instagram?.title
    } else if (type === 3) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.pinterest?.title
    } else if (type === 4) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.twitter?.title
    } else if (type === 5) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.linkedin?.title
    }
    return limit
  }
  const renderLimitImage = (type) => {
    let limit
    if (type === 1) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.facebook?.image
    } else if (type === 2) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.instagram?.image
    } else if (type === 3) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.pinterest?.image
    } else if (type === 4) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.twitter?.image
    } else if (type === 5) {
      limit = getToken('setting')?.SOCIAL_MEDIA_SETTING?.content_limitation?.linkedin?.image
    }
    return limit
  }
  useEffect(() => {
    if (postState?.getSpecificPostedData?.data?.payload) {
      setScheduleData(postState?.getSpecificPostedData?.data?.payload?.schedule_at)
      setPostId(postState?.getSpecificPostedData?.data?.payload?.id)
      setTimeZone(postState?.getSpecificPostedData?.data?.payload?.timezone)
      const postData = []
      postState?.getSpecificPostedData?.data?.payload?.post_item.map((data) => {
        let obj = {
          id: data.id,
          currentNetwork: data.social_media_id,
          page_id: (data.social_media_type === 1 || data.social_media_type === 3 || data.social_media_type === 5) ? data.page_id : data.social_media_id,
          page_name: data.social_media_type === 1 ? data.page_name : data.social_media_name,
          description: data.description,
          scheduled_at: null,
          post_type: null,
          image: data.image,
          type: data.social_media_type,
          pagesData: data.social_media_pages,
          title: data.title,
          limitDesc: renderLimitDesc(data.social_media_type),
          limitTitle: renderLimitTitle(data.social_media_type),
          imageLimit: renderLimitImage(data.social_media_type),
        }
        return postData.push(obj)
      })
      if (postState?.getSpecificPostedData?.data?.payload?.post_type === 'product_post') {
        props.actions.updatePostDataAction(postData)
        props.actions.getProductDetailsAction(postState?.getSpecificPostedData?.data?.payload?.product_id)
        setOpenEdit(true)
      } else {
        props.actions.updatePromotionDataAction(postData)
        setOpenCollageDetails(true)
      }
    }
  }, [postState?.getSpecificPostedData])
  useEffect(() => {
    if (productState.productDetails?.data?.payload && productData.length === 0) {
      setProductData(productState.productDetails.data.payload)
    }
  }, [productState.productDetails])
  useEffect(() => {
    if (postState?.deletePostedList?.data?.payload) {
      setMessage(postState?.deletePostedList?.data?.meta?.message)
      setStatus(postState?.deletePostedList?.data?.meta?.status)
      props.actions.cleanUpSocialMediaPostState()
      handleClose()
    } else if (postState?.deletePostedList?.error?.meta) {
      setMessage(postState?.deletePostedList.error.meta?.message)
      setStatus('error')
    }
  }, [postState?.deletePostedList])
  const handlePostEditClick = (postId) => {
    setProductDetailsType('Update')
    props.actions.getSpecificPostedDataAction(postId)
  }
  const handleDeletePost = (postId) => {
    const Data = {
      title: 'Are you sure?',
      subtitle: 'You have Selected to Delete Post',
      button: 'Delete',
      close: 'Cancel',
    }
    setAlertLabel(Data)
    setOpen(true)
    setPostId(postId)
  }
  const handleDeletePostedList = (postId) => {
    props.actions.deletePostedListAction(postId)
  }
  const handleSnackBarClose = () => {
    setTimeout(() => {
      setMessage('')
      setStatus('')
    }, 2500)
  }
  const handleReshareClick = (postId) => {
    setProductDetailsType('Reshare')
    props.actions.getSpecificArchiveListAction(postId)
  }


  useEffect(() => {
    if (postState?.getSpecificAchiveData?.data?.payload) {
      setPostId(postState?.getSpecificAchiveData?.data?.payload?.id)
      setTimeZone(postState?.getSpecificAchiveData?.data?.payload?.timezone)
      const postData = []
      postState?.getSpecificAchiveData?.data?.payload?.post_item.map((data) => {
        let obj = {
          currentNetwork: data.social_media_id,
          page_id: (data.social_media_type === 1 || data.social_media_type === 3 || data.social_media_type === 5) ? data.page_id : data.social_media_id,
          page_name: data.social_media_type === 1 ? data.page_name : data.social_media_name,
          description: data.description,
          scheduled_at: null,
          post_type: null,
          image: data.image,
          type: data.social_media_type,
          pagesData: data.social_media_pages,
          title: data.title,
          limitDesc: renderLimitDesc(data.social_media_type),
          limitTitle: renderLimitTitle(data.social_media_type),
          imageLimit: renderLimitImage(data.social_media_type),
        }
        return postData.push(obj)
      })

      if (postState?.getSpecificAchiveData?.data?.payload?.post_type === 'product_post') {
        props.actions.updatePostDataAction(postData)
        props.actions.getProductDetailsAction(postState?.getSpecificAchiveData?.data?.payload?.product_id)
        setOpenEdit(true)
      } else {
        props.actions.updatePromotionDataAction(postData)
        setOpenCollageDetails(true)
      }
    }
  }, [postState?.getSpecificAchiveData])
  const handleCloseCollageDetails = () => {
    setOpenCollageDetails(false)
    setScheduleData()
  }
  const render = (eventInfo, element) => {
    return (
      <Box className="event_list">
        <List sx={{width: '100%', padding: '0'}}>
          <ListItem alignItems="center">
            <ListItemAvatar className="event_img">
              <Avatar alt="Remy Sharp" src={eventInfo?.event?.url} sx={{borderRadius: '5px'}} />
            </ListItemAvatar>
            <ListItemText className="event_info">
              <Typography variant="h5">
                {eventInfo?.event?.title}
              </Typography>
              <Typography variant="body2">
                {eventInfo.timeText.slice(-5)}
              </Typography>
            </ListItemText>
          </ListItem>
          {eventInfo?.event?._def?.ui?.classNames[0] === 'archive' &&
          <Box className="reshare_events">
            <ShareIcon fontSize="small" className="share_icon" onClick={() => {handleReshareClick(eventInfo?.event?._def?.extendedProps?.event_id)}} />
          </Box>
          }
          {eventInfo?.event?._def?.ui?.classNames[0] === 'scheduled' &&
            <Box className="action_events">
              <EditIcon fontSize="small" className="share_icon" onClick={() => {handlePostEditClick(eventInfo?.event?._def?.extendedProps?.event_id)}} />
              <DeleteIcon fontSize="small" className="share_icon" onClick={() => {handleDeletePost(eventInfo?.event?._def?.extendedProps?.event_id)}} />
            </Box>
            // <PopoverActions postId={eventInfo?.event?._def?.extendedProps?.event_id} handleDeletePostedList={handleDeletePost} handleEditClick={handlePostEditClick} />
          }
        </List>
      </Box>
    )
  }
  return (
    <MyDiv>
      <Box mt={6}>
        {!isMobile ? (
          <FullCalendar
            plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: 'today ,timeGridWeek',
            }}
            eventTimeFormat={
              {
                hour: 'numeric',
                minute: '2-digit',
                meridiem: false,
                hour12: false,
              }
            }
            locale="en-GB"
            slotLabelFormat={
              {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              }
            }
            views={{
              week: {
                slotLabelInterval: {hours: 1},
                slotDuration: {hours: 1},
              },
            }
            }
            dayHeaderContent={(args) => {
              setStartDate(moment(args.view.activeStart).format('DD-MM-YYYY'))
              setEndDate(moment(args.view.activeEnd).format('DD-MM-YYYY'))
              return moment(args.date).format('Do ddd')
            }}

            selectable
            eventMaxStack={1}
            dateClick={handleDateClick}
            events={postedData}
            eventContent={render}
            eventClick={handleEventClick}
            stickyHeaderDates
            morePopoverClose={false}
          />
        ) : (
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: 'timeGridDay',
            }}
            eventTimeFormat={
              {
                hour: 'numeric',
                minute: '2-digit',
                meridiem: false,
                hour12: false,
              }
            }
            locale="en-GB"
            slotLabelFormat={
              {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              }
            }
            views={{
              day: {
                slotLabelInterval: {hours: 1},
                slotDuration: {hours: 1},
              },
            }
            }
            dayHeaderContent={(args) => {
              setStartDate(moment(args.view.activeStart).format('DD-MM-YYYY'))
              setEndDate(moment(args.view.activeEnd).format('DD-MM-YYYY'))
              return moment(args.date).format('Do ddd')
            }}

            selectable
            eventMaxStack={1}
            dateClick={handleDateClick}
            events={postedData}
            eventContent={render}
            eventClick={handleEventClick}
            stickyHeaderDates
            morePopoverClose={false}
          />
        )}
        <ProductListingDialog
          open={openAdd}
          onClose={handleAddClose}
          scheduleData={scheduleData}
        />
        <ProductDetailsDialog open={openEdit}
          onClose={handleEditClose}
          productData={productData}
          scheduleData={scheduleData}
          productDetailType={productDetailsType}
          postId={postId}
          timezone={timezone?.id}
          startDate={startDate}
          endDate={endDate}
        />
        <CollageDetailsDialog
          promotionDetailType={productDetailsType}
          scheduleData={scheduleData}
          postId={postId}
          openCollageDetails={openCollageDetails}
          closeCollageDetails={handleCloseCollageDetails}
          timezone={timezone?.id}
          startDate={startDate}
          endDate={endDate}
        />
        <AlertDialog
          openDialog={open}
          handleDeleteClose={handleClose}
          alertLabel={alertLabel}
          handleSubmit={handleDeletePostedList}
          handleClose={handleClose}
          id={postId}
        />
        <Snackbar
          message={message}
          severity={status}
          duration={2500}
          open={message.length > 0}
          close={handleSnackBarClose}
        />
        {(postState?.deletePostedList?.loading || postState?.getSpecificAchiveData?.loading || postState?.getSpecificPostedData?.loading || postState?.getCalendarPostedList?.loading) &&
        <div>
          <Loader />
        </div>
        }
      </Box>
    </MyDiv>
  )
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(Calender)
