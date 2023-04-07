import {React, useEffect, useState} from 'react'
import {Box, Card, Typography, Divider, List, ListItem, ListItemText, ListItemAvatar, IconButton, Avatar} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {connect, useSelector} from 'react-redux'
import {withRouter, useHistory} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import moment from 'moment'
import * as routesNames from '../../../../constants/routes'
import {ActionCreators} from '../../../../redux/actions'
import {ProductDetailsDialog} from '../../../ProductsListing/components'
import {getToken} from '../../../../utilities/authUtils'
import {CustomPostsSkeleton, Snackbar, Loader, MessageBox} from '../../../../components'
import CollageDetailsDialog from '../../../Promotion/components/CollageDetailsDialog'
import MyDiv from './upcomingPosts.style'

function UpcomingPosts(props) {
  const postState = useSelector((state) => state?.postState)
  const productState = useSelector((state) => state.productState)
  const authState = useSelector((state) => state.authState)
  const userState = useSelector((state) => state.userState)
  const [upcomingData, setUpcomingData] = useState([])
  const [openDetails, setOpenDetails] = useState(false)
  const [productData, setProductData] = useState([])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [postId, setPostId] = useState('')
  const [scheduleData, setScheduleData] = useState()
  const history = useHistory()
  const [timezone, setTimeZone] = useState()
  const [openCollageDetails, setOpenCollageDetails] = useState(false)
  const handleClick = () => {
    history.push(routesNames.PRODUCTS_LISTING)
  }

  useEffect(() => {
    // setTimeout(() => {
    // }, 2500)
    if (!postState?.getPostedList?.pagination?.payload && authState?.session?.data?.company_id && userState?.getStore?.data?.payload[0]?.id) {
      let data = {
        per_page: '20',
        page: 1,
      }
      props.actions.getPostedListAction(data)
    }
  }, [authState?.session?.data?.company_id, userState?.getStore?.data?.payload[0]?.id])

  useEffect(() => {
    if (postState?.getPostedList?.data) {
      setUpcomingData(postState?.getPostedList.data)
    }
  }, [postState?.getPostedList])
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
        setOpenDetails(true)
      } else if (postState?.getSpecificPostedData?.data?.payload?.post_type === 'promotion_post') {
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

  const handleClose = () => {
    setOpenDetails(false)
    setProductData([])
    setScheduleData()
    props.actions.cleanUpStateProductDetails()
  }
  const handleProductDetails = (postId) => {
    props.actions.getSpecificPostedDataAction(postId)
  }

  const handleSnackBarClose = () => {
    setTimeout(() => {
      setMessage('')
      setStatus('')
    }, 2500)
  }
  const handleCloseCollageDetails = () => {
    setOpenCollageDetails(false)
    setScheduleData()
  }
  return (
    <MyDiv>
      {(postState?.getPostedList?.loading || !(authState?.session?.data?.company_id && userState?.getStore?.data?.payload)) &&
      <div>
        <CustomPostsSkeleton />
      </div>
      }
      {(postState?.getSpecificPostedData?.loading) &&
      <div>
        <Loader />
      </div>
      }
      {(!(postState?.getPostedList?.loading) && postState?.getPostedList?.pagination?.payload?.data || userState?.getStore?.data?.payload?.length === 0) &&
      <Card className="upcoming_card adjust_card">
        <Box className="card_header">
          <Typography gutterBottom variant="h5" component="div" className="text-font card_title">
            {props.upcomingtitle}
          </Typography>
          <Typography variant="body2" className="card_subtitle text-font">
            {props.upcomingsubtitle}
          </Typography>
          <Divider />
        </Box>
        {upcomingData.length > 0 &&
          <Box className="card_list">
            <List sx={{width: '100%', padding: '0'}}>
              {upcomingData && upcomingData.length > 0 && upcomingData.slice(0, 5).map((row, index) => (
                <ListItem alignItems="center" key={index} row={row} >
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={row.master_image} sx={{borderRadius: '5px'}} />
                  </ListItemAvatar>
                  <ListItemText className="posts_info" >
                    <Typography variant="h5">
                      {row.title}
                    </Typography>
                    <Typography variant="body2">
                      {row.schedule_at ? moment(row.schedule_at).format('DD-MM-YYYY HH:mm') : ''}
                    </Typography>
                  </ListItemText>
                  <IconButton onClick={() => handleProductDetails(row.id)} >
                    <ChevronRightIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Box>
        }
        {(postState?.getPostedList?.pagination?.payload?.data?.length === 0 || postState?.getPostedList?.error || userState?.getStore?.data?.payload?.length === 0) &&
          <MessageBox messageTitle="No Schedule Post Found" messageBtn="Schedule Post" handleClick={handleClick} disableBtn />
        }
      </Card>
      }

      <ProductDetailsDialog
        open={openDetails}
        onClose={handleClose}
        productData={productData}
        scheduleData={scheduleData}
        postId={postId}
        productDetailType="Update"
        timezone={timezone?.id}
      />
      <CollageDetailsDialog
        promotionDetailType="Update"
        scheduleData={scheduleData}
        postId={postId}
        timezone={timezone?.id}
        openCollageDetails={openCollageDetails}
        closeCollageDetails={handleCloseCollageDetails}
      />
      <Snackbar
        message={message}
        severity={status}
        duration={2500}
        open={message.length > 0}
        close={handleSnackBarClose}
      />
    </MyDiv>
  )
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(UpcomingPosts)
