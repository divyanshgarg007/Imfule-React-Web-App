import {React, useEffect, useState} from 'react'
import {Grid, Box, Typography} from '@mui/material'
import {connect, useSelector} from 'react-redux'
import {withRouter, useHistory} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import PropTypes from 'prop-types'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, {tableCellClasses} from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import {styled} from '@mui/material/styles'
import moment from 'moment'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import DeleteIcon from '@mui/icons-material/Delete'
import {ActionCreators} from '../../redux/actions'
import FacebookImage from '.././../images/facebook.png'
import InstagramImage from '.././../images/instagram.png'
import * as routesNames from '../../constants/routes'
import PinterestImage from '.././../images/pinterest.png'
import TwitterImage from '.././../images/twitter.png'
import LinkedinImage from '.././../images/linkedin.png'
import {getToken} from '.././../utilities/authUtils'
import {Snackbar, AlertDialog, PopoverActions, CustomButton, CustomSchedulingSkeleton, Loader, MessageBox} from '../../components'
import ProductDetailsDialog from '../ProductsListing/components/ProductDetailsDialog'
import CollageDetailsDialog from '../Promotion/components/CollageDetailsDialog'
import MyDiv from './scheduled.style'
const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#d9dfd2',
    color: '#000',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#000',
  },
}))

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#fff',
    // height: '90px',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#f3f3f3',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const StyledTableRowChild = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#fff',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#fff',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

function Row(props) {
  const {row} = props
  const [open, setOpen] = useState(false)
  const handleDeletePostedList = (postId, type) => {
    props.handleDeletePostedList(postId, type)
  }
  const handleEditClick = (postId) => {
    props.handleEditClick(postId)
  }
  return (
    <>
      <StyledTableRow sx={{'& > *': {borderBottom: 'unset'}}}>
        <StyledTableRow className="product-info-tab">
          <StyledTableCell className="text-font image_data" sx={{borderBottom: 'none'}}>
            <img src={row.master_image} />
          </StyledTableCell>
          <StyledTableCell align="left" className="text-font wrap_text_line" sx={{borderBottom: 'none'}}>{row.title}</StyledTableCell>
        </StyledTableRow>
        <StyledTableCell align="left" className="text-font table_date" sx={{borderBottom: 'none'}}>{row.schedule_at ? moment(row.schedule_at).format('DD-MM-YYYY HH:mm') : ''}</StyledTableCell>
        <StyledTableCell align="center" className="text-font table_action" sx={{borderBottom: 'none'}}>
          <PopoverActions postId={row.id} handleDeletePostedList={handleDeletePostedList} handleEditClick={handleEditClick} /></StyledTableCell>
        <StyledTableCell align="right" sx={{width: '10%', borderBottom: 'none'}}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit className="scheduled_inner">
            <Box sx={{margin: 1}}>
              <Typography variant="h6" gutterBottom component="div" className="text-font schedule_head">
                Scheduled For
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  {row?.post_item?.length > 0 &&
                  <StyledTableRowChild>
                    <StyledTableCell className="inner_table_heading text-font">Social Media</StyledTableCell>
                    <StyledTableCell align="left" className="inner_table_heading text-font">Account Name</StyledTableCell>
                    <StyledTableCell align="left" className="inner_table_heading text-font">Page Name</StyledTableCell>
                    <StyledTableCell align="left" className="inner_table_heading text-font">Action</StyledTableCell>
                  </StyledTableRowChild>
                  }
                </TableHead>
                <TableBody>
                  {row?.post_item.map((scheduleRow) => (
                    <StyledTableRowChild key={scheduleRow.date}>
                      <StyledTableCell className="ln-height">
                        <img src={scheduleRow.social_media_type === 1 ? FacebookImage : scheduleRow.social_media_type === 2 ? InstagramImage
                          : scheduleRow.social_media_type === 3 ? PinterestImage : scheduleRow.social_media_type === 4 ? TwitterImage : LinkedinImage}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left" className="text-font">{scheduleRow.social_media_name}</StyledTableCell>
                      <StyledTableCell align="left" className="text-font">{scheduleRow.page_name}</StyledTableCell>
                      <StyledTableCell align="left" className="text-font">
                        <IconButton >
                          <DeleteIcon className="action_delete" onClick={() => props.handleDeletePostItem(scheduleRow.id, row.id, 'deletePostedItem')} />
                        </IconButton>

                      </StyledTableCell>
                    </StyledTableRowChild>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  )
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
}

function Scheduled(props) {
  const postState = useSelector((state) => state?.postState)
  const productState = useSelector((state) => state.productState)
  const [scheduledData, setScheduledData] = useState([])
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [open, setOpen] = useState(false)
  const [postId, setPostId] = useState('')
  const [parentPostId, setParentPostId] = useState('')
  const [type, setType] = useState('')
  const [openDetails, setOpenDetails] = useState(false)
  const [productData, setProductData] = useState([])
  const [scheduleData, setScheduleData] = useState()
  const [pages, setPages] = useState(1)
  const [isPageChange, setPageChange] = useState(false)
  const [timezone, setTimeZone] = useState()
  const history = useHistory()
  const [openCollageDetails, setOpenCollageDetails] = useState(false)
  const handleClick = () => {
    history.push(routesNames.PRODUCTS_LISTING)
  }
  const [alertLabel, setAlertLabel] = useState(
    {
      title: '',
      subtitle: '',
      button: '',
      close: '',
    },
  )

  useEffect(() => {
    if (!postState?.getPostedList?.pagination?.payload) {
      let data = {
        per_page: '20',
        page: pages,
      }
      props.actions.getPostedListAction(data)
    }
  }, [])
  useEffect(() => {
    if (isPageChange) {
      let data = {
        per_page: '20',
        page: pages,
      }
      props.actions.getPostedListLoadMoreAction(data)
    }
  }, [pages])
  const handleLoadMore = () => {
    const newPages = pages + 1
    setPages(newPages)
    setPageChange(true)
  }
  useEffect(() => {
    if (postState?.getPostedList?.data) {
      setScheduledData(postState?.getPostedList.data)
    }
  }, [postState?.getPostedList])
  useEffect(() => {
    if (postState?.deletePostedItem?.data?.payload) {
      setMessage(postState?.deletePostedItem?.data?.meta?.message)
      setStatus(postState?.deletePostedItem?.data?.meta?.status)
      props.actions.cleanUpSocialMediaPostState()
    } else if (postState?.deletePostedItem?.error?.meta) {
      setMessage(postState?.deletePostedItem.error.meta?.message)
      setStatus('error')
    }
  }, [postState?.deletePostedItem])
  useEffect(() => {
    if (postState?.deletePostedList?.data?.payload) {
      setMessage(postState?.deletePostedList?.data?.meta?.message)
      setStatus(postState?.deletePostedList?.data?.meta?.status)
      props.actions.cleanUpSocialMediaPostState()
    } else if (postState?.deletePostedList?.error?.meta) {
      setMessage(postState?.deletePostedList.error.meta?.message)
      setStatus('error')
    }
  }, [postState?.deletePostedList])
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
  const handleSubmit = (postId, type, parentPostId) => {
    setOpen(false)
    if (type === 'deletePostedList') {
      props.actions.deletePostedListAction(postId)
    } else if (type === 'deletePostedItem') {
      props.actions.deletePostedItemAction(postId, parentPostId)
    }
  }
  const handleDeletePostItem = (postItemId, postId, type) => {
    const deleteData = {
      title: 'Are You Sure ?',
      subtitle: 'You have Selected to Delete Post Item',
      button: 'Delete',
      close: 'Cancel',
    }
    setAlertLabel(deleteData)
    setOpen(true)
    setPostId(postItemId)
    setType(type)
    setParentPostId(postId)
  }
  const handleDeletePostedList = (postId, type) => {
    const deleteData = {
      title: 'Are You Sure ?',
      subtitle: 'You have Selected to Delete Post',
      button: 'Delete',
      close: 'Cancel',
    }
    setAlertLabel(deleteData)
    setOpen(true)
    setPostId(postId)
    setType(type)
  }
  const handleSnackBarClose = () => {
    setTimeout(() => {
      setMessage('')
      setStatus('')
    }, 2500)
  }
  const handleDeleteClose = () => {
    setAlertLabel('')
    setOpen(false)
    setPostId('')
    setType('')
  }
  const handleEditClick = (postId) => {
    props.actions.getSpecificPostedDataAction(postId)
  }
  const handleClose = () => {
    setOpenDetails(false)
    setProductData([])
    setScheduleData()
    props.actions.cleanUpStateProductDetails()
  }
  const handleCloseCollageDetails = () => {
    setOpenCollageDetails(false)
    setScheduleData()
  }
  return (
    <MyDiv>
      {(postState?.getPostedList?.loading) &&
      <div>
        <CustomSchedulingSkeleton />
      </div>
      }
      {(postState?.getSpecificPostedData?.loading || postState?.deletePostedList?.loading || postState?.deletePostedItem?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <AlertDialog
        openDialog={open}
        handleDeleteClose={handleDeleteClose}
        handleClose={handleDeleteClose}
        alertLabel={alertLabel}
        handleSubmit={handleSubmit}
        id={postId}
        parentPostId={parentPostId}
        type={type}
      />
      <ProductDetailsDialog open={openDetails}
        onClose={handleClose}
        productData={productData}
        scheduleData={scheduleData}
        productDetailType="Update"
        postId={postId}
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
      {(!postState?.getPostedList?.loading) &&
      <div>
        <Box className="scheduled_box">
          <Grid container rowSpacing={3} columnSpacing={{xs: 1, sm: 3, md: 3}}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography gutterBottom variant="h5" component="div" className="scheduled_heading text-font">
                Upcoming Posts
              </Typography>
            </Grid>
          </Grid>
          {scheduledData.length > 0 &&
          <Box mt={2}>
            <TableContainer style={{borderRadius: '10px 10px 0 0'}}>
              <Table aria-label="collapsible table" style={{border: '1px solid rgba(224, 224, 224, 1)'}}>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="left" className="scheduled_table_heading text-font">Product</StyledTableCell>
                    <StyledTableCell align="left" className="scheduled_table_heading text-font">Scheduled At</StyledTableCell>
                    <StyledTableCell align="center" className="scheduled_table_heading text-font">Action</StyledTableCell>
                    <StyledTableCell />
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {scheduledData && scheduledData.map((row, index) => (
                    <Row key={index}
                      row={row}
                      handleDeletePostedList={handleDeletePostedList}
                      handleDeletePostItem={handleDeletePostItem}
                      handleEditClick={handleEditClick}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {(postState?.getPostedList?.pagination?.payload?.pagination?.current_page !== postState?.getPostedList?.pagination?.payload?.pagination?.total_pages) &&
            <Box mt={3} className="load_btn">
              <CustomButton fieldlabel="Load more" variant="contained" onClick={handleLoadMore} className="text-font action_button" />
            </Box>
            }
          </Box>
          }
          {scheduledData && scheduledData.length === 0 &&
          <MessageBox messageTitle="No Schedule Post Found" messageBtn="Schedule Post" handleClick={handleClick} disableBtn />
          }
        </Box>
      </div>
      }
    </MyDiv>
  )
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(Scheduled)
