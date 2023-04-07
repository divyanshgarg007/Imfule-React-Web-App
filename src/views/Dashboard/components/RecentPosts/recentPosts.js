import {React, useEffect, useState} from 'react'
import {Box, Card, Typography, Divider, List, ListItem, ListItemText, ListItemAvatar, IconButton, Avatar, Chip} from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {connect, useSelector} from 'react-redux'
import {withRouter, useHistory} from 'react-router-dom'
import moment from 'moment'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import * as routesNames from '../../../../constants/routes'
import {ActionCreators} from '../../../../redux/actions'
import {getToken} from '../../../../utilities/authUtils'
import {CustomPostsSkeleton, Loader, MessageBox} from '../../../../components'
import {ProductDetailsDialog} from '../../../ProductsListing/components'
import CollageDetailsDialog from '../../../Promotion/components/CollageDetailsDialog'
import MyDiv from './recentPosts.style'

function RecentPosts(props) {
  const postState = useSelector((state) => state?.postState)
  const productState = useSelector((state) => state.productState)
  const authState = useSelector((state) => state.authState)
  const userState = useSelector((state) => state.userState)
  const [archiveData, setArchiveData] = useState([])
  const [openDetails, setOpenDetails] = useState(false)
  const [productData, setProductData] = useState([])
  const [postId, setPostId] = useState('')
  const history = useHistory()
  const [openCollageDetails, setOpenCollageDetails] = useState(false)
  const [timezone, setTimeZone] = useState()
  const handleClick = () => {
    history.push(routesNames.PRODUCTS_LISTING)
  }

  useEffect(() => {
    // setTimeout(() => {

    // }, 2500)
    if (!postState?.getArchiveList?.pagination?.payload && authState?.session?.data?.company_id && userState?.getStore?.data?.payload[0]?.id) {
      let data = {
        per_page: '20',
        page: 1,
      }
      props.actions.archiveListAction(data)
    }
  }, [authState?.session?.data?.company_id, userState?.getStore?.data?.payload[0]?.id])

  useEffect(() => {
    if (postState?.getArchiveList?.data) {
      setArchiveData(postState?.getArchiveList.data)
    }
  }, [postState?.getArchiveList])
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
        setOpenDetails(true)
      } else if (postState?.getSpecificAchiveData?.data?.payload?.post_type === 'promotion_post') {
        props.actions.updatePromotionDataAction(postData)
        setOpenCollageDetails(true)
      }
    }
  }, [postState?.getSpecificAchiveData])

  useEffect(() => {
    if (productState.productDetails?.data?.payload && productData.length === 0) {
      setProductData(productState.productDetails.data.payload)
    }
  }, [productState.productDetails])

  const handleReshareClick = (postId) => {
    props.actions.getSpecificArchiveListAction(postId)
  }
  const handleClose = () => {
    setOpenDetails(false)
    setProductData([])
    props.actions.cleanUpStateProductDetails()
  }
  const handleCloseCollageDetails = () => {
    setOpenCollageDetails(false)
  }
  return (
    <MyDiv>
      {(postState?.getArchiveList?.loading || !(authState?.session?.data?.company_id && userState?.getStore?.data?.payload)) &&
      <div>
        <CustomPostsSkeleton />
      </div>
      }
      {(postState?.getSpecificAchiveData?.loading) &&
      <div>
        <Loader />
      </div>
      }

      {(!(postState?.getArchiveList?.loading) && postState?.getArchiveList?.pagination?.payload?.data || userState?.getStore?.data?.payload?.length === 0) &&
      <Card className="latest_products_card adjust_card">
        <Box className="latest_card_header">
          <Typography gutterBottom variant="h5" component="div" className="text-font latest_card_title">
            {props.latesttitle}
          </Typography>
          <Typography variant="body2" className="latest_card_subtitle text-font">
            {props.latestsubtitle}
          </Typography>
          <Divider />
        </Box>
        {archiveData.length > 0 &&
        <Box className="latest_card_list">
          <List sx={{width: '100%', padding: '0'}}>
            {archiveData && archiveData.length > 0 && archiveData.slice(0, 5).map((row, index) => (
              <ListItem alignItems="center" key={index} row={row}>
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={row.master_image} sx={{borderRadius: '5px'}} />
                </ListItemAvatar>
                <ListItemText className="product_list_info" >
                  <Typography variant="h5">
                    {row.title}
                  </Typography>
                  <Typography variant="body2">
                    {row.posted_at ? moment(row.posted_at).format('DD-MM-YYYY HH:mm') : ''}
                  </Typography>
                </ListItemText>
                <Chip label={row.status === 'success' ? 'success' : 'failed'} className={row.status === 'success' ? 'success' : 'error_post'} />
                <IconButton edge="end" aria-label="delete" onClick={() => handleReshareClick(row.id)}>
                  <ChevronRightIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
        }
        {(postState?.getArchiveList?.pagination?.payload?.data?.length === 0 || postState?.getArchiveList?.error || userState?.getStore?.data?.payload?.length === 0) &&
          <MessageBox messageTitle="No Post Found" messageBtn="Create Post" handleClick={handleClick} disableBtn />
        }
      </Card>
      }


      <ProductDetailsDialog
        open={openDetails}
        onClose={handleClose}
        productData={productData}
        timezone={timezone?.id}
        productDetailType="Reshare"
        postId={postId}
      />
      <CollageDetailsDialog
        promotionDetailType="Reshare"
        postId={postId}
        timezone={timezone?.id}
        openCollageDetails={openCollageDetails}
        closeCollageDetails={handleCloseCollageDetails}
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
)(RecentPosts)
