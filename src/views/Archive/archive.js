/* eslint-disable no-unused-vars */
import {React, useEffect, useState} from 'react'
import {Grid, Box, Typography, Tooltip} from '@mui/material'
import PropTypes from 'prop-types'
import {connect, useSelector} from 'react-redux'
import {withRouter, useHistory} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import moment from 'moment'
import TableBody from '@mui/material/TableBody'
import TableCell, {tableCellClasses} from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import {styled} from '@mui/material/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Chip from '@mui/material/Chip'
import ShareIcon from '@mui/icons-material/Share'
import * as routesNames from '../../constants/routes'
import {ActionCreators} from '../../redux/actions'
import FacebookImg from '.././../images/facebook.png'
import InstagramImg from '.././../images/instagram.png'
import PinterestImg from '.././../images/pinterest.png'
import TwitterImage from '.././../images/twitter.png'
import LinkedinImage from '.././../images/linkedin.png'
import {getToken} from '.././../utilities/authUtils'
import ProductDetailsDialog from '../ProductsListing/components/ProductDetailsDialog'
import {CustomSchedulingSkeleton, CustomButton, Loader, MessageBox} from '../../components'
import CollageDetailsDialog from '../Promotion/components/CollageDetailsDialog'
import MyDiv from './archive.style'
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
    // height: '20px',
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
  const handlePostUrl = (url) => {
    window.open(url)
  }
  const handleReshareClick = (postId) => {
    props.handleReshareClick(postId)
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

        {/* <StyledTableCell align="left" className="text-font wrap_text_line" sx={{borderBottom: 'none'}}>{row.title}</StyledTableCell> */}
        <StyledTableCell align="left" className="text-font table_date" sx={{borderBottom: 'none'}}>{row.posted_at ? moment(row.posted_at).format('DD-MM-YYYY HH:mm') : ''}</StyledTableCell>
        <StyledTableCell align="center" className="text-font table_action" sx={{borderBottom: 'none'}}>
          <IconButton onClick={() => {handleReshareClick(row.id)}}>
            <ShareIcon className="action_delete" />
          </IconButton>
        </StyledTableCell>
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
                Archive For
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledTableRowChild>
                    <StyledTableCell className="inner_table_heading text-font">Social Media</StyledTableCell>
                    <StyledTableCell align="left" className="inner_table_heading text-font">Account Name</StyledTableCell>
                    <StyledTableCell align="left" className="inner_table_heading text-font">Page Name</StyledTableCell>
                    <StyledTableCell align="left" className="inner_table_heading text-font">Status</StyledTableCell>
                    <StyledTableCell align="left" className="inner_table_heading text-font" />
                  </StyledTableRowChild>
                </TableHead>
                <TableBody>
                  {row?.post_item.map((scheduleRow) => (
                    <StyledTableRowChild key={scheduleRow.date}>
                      <StyledTableCell className="ln-height">
                        <img src={scheduleRow.social_media_type === 1 ? FacebookImg : scheduleRow.social_media_type === 2 ? InstagramImg
                          : scheduleRow.social_media_type === 3 ? PinterestImg : scheduleRow.social_media_type === 4 ? TwitterImage : LinkedinImage}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left" className="text-font">{scheduleRow.social_media_name}</StyledTableCell>
                      <StyledTableCell align="left" className="text-font">{scheduleRow.page_name}</StyledTableCell>
                      <StyledTableCell align="left" className="text-font">
                        <Chip label={scheduleRow.status === 'success' ? 'success' : 'failed'} className={scheduleRow.status === 'success' ? 'success_post' : 'error_post'} />
                      </StyledTableCell>
                      <StyledTableCell align="left" className="text-font" >
                        {scheduleRow.status === 'success' &&
                        <Chip label="View Post" className="view_post"
                          onClick={() => handlePostUrl(scheduleRow?.post_url)}
                        />
                        }
                        {scheduleRow.status !== 'success' &&
                        <Tooltip title={scheduleRow?.post_response} arrow>
                          <Chip label="View Error" className="view_post" />
                        </Tooltip>
                        }
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


function Archive(props) {
  const postState = useSelector((state) => state?.postState)
  const productState = useSelector((state) => state.productState)
  const [archiveData, setArchiveData] = useState([])
  const [openDetails, setOpenDetails] = useState(false)
  const [productData, setProductData] = useState([])
  const [postId, setPostId] = useState('')
  const [pages, setPages] = useState(1)
  const [isPageChange, setPageChange] = useState(false)
  const [timezone, setTimeZone] = useState()
  const history = useHistory()
  const [openCollageDetails, setOpenCollageDetails] = useState(false)
  const handleClick = () => {
    history.push(routesNames.PRODUCTS_LISTING)
  }

  useEffect(() => {
    if (!postState?.getArchiveList?.pagination?.payload) {
      let data = {
        per_page: '20',
        page: pages,
      }
      props.actions.archiveListAction(data)
    }
  }, [])
  useEffect(() => {
    if (isPageChange) {
      let data = {
        per_page: '20',
        page: pages,
      }
      props.actions.archiveListLoadMoreAction(data)
    }
  }, [pages])
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
  const handleLoadMore = () => {
    const newPages = pages + 1
    setPages(newPages)
    setPageChange(true)
  }
  const handleCloseCollageDetails = () => {
    setOpenCollageDetails(false)
  }
  return (
    <MyDiv>
      {(postState?.getArchiveList?.loading) &&
        <div>
          <CustomSchedulingSkeleton />
        </div>
      }
      {(postState?.getSpecificAchiveData?.loading) &&
        <div>
          <Loader />
        </div>
      }
      <ProductDetailsDialog open={openDetails}
        onClose={handleClose}
        productData={productData}
        productDetailType="Reshare"
        postId={postId}
        timezone={timezone?.id}
      />
      <CollageDetailsDialog
        promotionDetailType="Reshare"
        postId={postId}
        timezone={timezone?.id}
        openCollageDetails={openCollageDetails}
        closeCollageDetails={handleCloseCollageDetails}
      />
      {(!postState?.getArchiveList?.loading) &&
      <div>
        <Box className="scheduled_box">
          <Grid container rowSpacing={3} columnSpacing={{xs: 1, sm: 3, md: 3}}>
            <Grid item xs={12} sm={12} md={12}>
              <Typography gutterBottom variant="h5" component="div" className="scheduled_heading text-font">
                Archived Posts
              </Typography>
            </Grid>
          </Grid>
          {archiveData.length > 0 &&
          <Box mt={2}>
            <TableContainer style={{borderRadius: '10px 10px 0 0'}}>
              <Table aria-label="collapsible table" style={{border: '1px solid rgba(224, 224, 224, 1)'}}>
                <TableHead>
                  <StyledTableRow>
                    {/* <StyledTableCell className="scheduled_table_heading text-font">Product Image</StyledTableCell> */}
                    <StyledTableCell align="left" className="scheduled_table_heading text-font">Product</StyledTableCell>
                    <StyledTableCell align="left" className="scheduled_table_heading text-font">Archive Date</StyledTableCell>
                    <StyledTableCell align="center" className="scheduled_table_heading text-font">Re-share</StyledTableCell>
                    <StyledTableCell />
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {archiveData.map((row, index) => (
                    <Row key={index} row={row} handleReshareClick={handleReshareClick} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {(postState?.getArchiveList?.pagination?.payload?.pagination?.current_page !== postState?.getArchiveList?.pagination?.payload?.pagination?.total_pages) &&
            <Box mt={3} className="load_btn">
              <CustomButton fieldlabel="Load more" variant="contained" onClick={handleLoadMore} className="text-font action_button" />
            </Box>
            }
          </Box>
          }
          {archiveData && archiveData.length === 0 &&
          <MessageBox messageTitle="No Post Found" messageBtn="Create Post" handleClick={handleClick} disableBtn />
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
)(Archive)
