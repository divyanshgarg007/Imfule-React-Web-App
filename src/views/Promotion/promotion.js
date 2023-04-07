import React, {useState, useEffect, useCallback} from 'react'
import {Box, Grid, Tabs, Tab, Typography, Divider, ImageList, ImageListItem, Snackbar} from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import {TabContext, TabPanel} from '@mui/lab'
import {compose} from 'recompose'
import {connect, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import CloseIcon from '@mui/icons-material/Close'
import ComputerIcon from '@mui/icons-material/Computer'
import {styled} from '@mui/material/styles'
import {getToken} from '../../utilities/authUtils'
import {CustomButton, Loader} from '../../components'
import {ActionCreators} from '../../redux/actions'
import apiInstance from '../../config/api/axios'
import {ProgressStatus} from '../ProductsListing/components/ProductGallery/components/CloudDialog/components'
import CollageDetailsDialog from './components/CollageDetailsDialog'
import {ProductImages, CloudImages, CollageDialog} from './components'
import MyDiv from './promotion.style'
const Input = styled('input')({
  display: 'none',
})
const Label = styled('label')({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  background: 'linear-gradient(to right,#2a2653,#ef305e)',
  borderRadius: '4px',
  padding: '6px 16px',
})
const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})
function Promotion(props) {
  const productState = useSelector((state) => state.productState)
  const mediaState = useSelector((state) => state?.mediaState)
  const promotionState = useSelector((state) => state?.promotionState)
  const authState = useSelector((state) => state.authState)
  const userState = useSelector((state) => state.userState)
  const [value, setValue] = useState('1')
  const [openCollagePopup, setOpenCollagePopup] = useState(false)
  const [productData, setProductData] = useState([])
  const [imfuleCloudData, setImfuleCloudData] = useState([])
  const [openCollageDetails, setOpenCollageDetails] = useState(false)
  const [selected, setSelected] = useState([])
  const [loader, setloader] = useState(false)
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState(false)
  const [pages, setPages] = useState(1)
  const [loadMore, setLoadMore] = useState(false)
  const [pagesCloud, setPagesCloud] = useState(1)
  const [loadMoreCloud, setLoadMoreCloud] = useState(false)
  const [image, setImage] = useState()
  const progress = React.useRef({})
  const [, forceUpdate] = useState()
  const [imfuleData, setImfuleData] = useState()
  const [emptyBox, setEmptyBox] = useState(true)
  const [selectedFiles, setSelectedFiles] = useState([])
  useEffect(() => {
    if (imfuleData !== undefined && imfuleData !== null) {
      setImfuleCloudData([imfuleData, ...imfuleCloudData])
      setImfuleData()
    }
  }, [imfuleData])
  useEffect(() => {
    if (mediaState?.getMediaList?.data?.payload && !loadMoreCloud) {
      setImfuleCloudData(mediaState?.getMediaList?.data?.payload?.data)
    } else if (mediaState?.getMediaList?.data?.payload && loadMoreCloud) {
      setImfuleCloudData(imfuleCloudData?.concat(mediaState?.getMediaList?.data?.payload?.data))
      setLoadMoreCloud(false)
    }
  }, [mediaState?.getMediaList])
  useEffect(() => {
    return () => {
      props.actions.cleanUpStateProductList()
      props.actions.cleanUpMediaState()
    }
  }, [])
  const filteredProductList = () => {
    let data = {
      selectedCategory: '',
      selectedSorting: 'id',
      order: 'desc',
      per_page: '18',
      page: pages,
      shop_id: getToken('selectedStore'),
      title: '',
    }
    props.actions.getProductsAction(data, getToken('companyID'), [])
  }

  useEffect(() => {
    if (productState?.products?.data?.payload) {
      setProductData(productState.products.data.payload.data)
    }
  }, [productState?.products])

  useEffect(() => {
    if (authState?.session?.data?.company_id && userState?.getStore?.data?.payload[0]?.id) {
      let obj = {
        per_page: 18,
        page: pagesCloud,
        sort: 'id',
        order: 'desc',
      }
      props.actions.getMediaListAction(obj)
    }
    filteredProductList()
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleCloseCollage = () => {
    setOpenCollagePopup(false)
  }

  const handleClickOpen = () => {
    if (selected.length === 1) {
      setStatus(true)
      setMessage('Please select more than 1 image')
    } else {
      setOpenCollagePopup(true)
    }
  }

  // const handleClickOpenVideo = () => {
  //   setOpenCollageDetails(true)
  // }

  let videoCount = 0
  let imageCount = 0

  const handleCheck = (item) => (event) => {
    if (event.target.checked) {
      selected.map((data) => {
        if (data.type === 'video') {
          videoCount++
        } else if (data.type === 'image') {
          imageCount++
        }
      })
      if (imageCount === 4) {
        setStatus(true)
        setMessage('You cannot select more than 4 images')
        return false
      }
      if (videoCount > 0) {
        setSelected([])
      }
      setSelected((selected) => [...selected, {type: 'image', image: item, id: selected.length.toString()}])
    } else {
      setSelected((selected) => selected.filter((sid) => sid.image !== item))
    }
  }

  // const handleCheckVideo = (item) => (event) => {
  //   if (event.target.checked) {
  //     selected.map((data) => {
  //       if (data.type === 'video') {
  //         videoCount++
  //       } else if (data.type === 'image') {
  //         imageCount++
  //       }
  //     })
  //     if (videoCount === 1) {
  //       setStatus(true)
  //       setMessage('You cannot select more than 1 Video')
  //       return false
  //     }
  //     if (imageCount > 0) {
  //       setSelected([])
  //     }
  //     setSelected((selected) => [...selected, {type: 'video', image: item, id: selected.length.toString()}])
  //   } else {
  //     setSelected((selected) => selected.filter((sid) => sid.image !== item))
  //   }
  // }

  const getCheckedStatus = (item) => {
    let filter = selected?.filter((sid) => sid.image === item)
    return filter.length > 0
  }

  const handleRemove = (item) => {
    setSelected((selected) => selected.filter((sid) => sid.image !== item))
  }

  const handleClear = () => {
    setSelected([])
  }

  const handleCollageDetails = (value) => {
    setOpenCollageDetails(true)
    handleCloseCollage()
  }

  const handleCloseCollageDetails = () => {
    setOpenCollageDetails(false)
  }
  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, {type: mime})
  }
  const handleImage = (dataUrl) => {
    setloader(true)
    const yourFile = dataURLtoFile(dataUrl, 'collage_image')
    let formData = new FormData()
    formData.append('image', yourFile)
    formData.append('type_id ', 3)
    formData.append('media_type ', 'collage')
    formData.append('title', yourFile.name)
    apiInstance
      .post('cloud/media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        if (response && response.meta.status === 'success') {
          let obj = {
            per_page: 18,
            page: 1,
            sort: 'id',
            order: 'desc',
          }
          props.actions.getMediaListAction(obj)
          setImage(response.payload.source)
          props.actions.onChangeSocialMediaPromotionAction(promotionState?.addPromotionData?.map(
            (shareholder, sidx) => {
              if (promotionState?.getPromotionPosition !== sidx) {return shareholder} else {
                return {...shareholder, image: [].concat(shareholder.image, response.payload.source),
                }
              }
            }))
          setloader(false)
        }
      }).catch((error) => {
        console.log(error.response.data)
        setloader(false)
      })
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setStatus(false)
  }
  const handleLoadMore = () => {
    const newPages = pages + 1
    setPages(newPages)
    setLoadMore(true)
  }
  const handleLoadMoreCloud = () => {
    const newPages = pagesCloud + 1
    setPagesCloud(newPages)
    setLoadMoreCloud(true)
  }
  useEffect(() => {
    if (productState?.products?.data?.payload && loadMore) {
      setProductData(productData?.concat(productState.products.data.payload.data))
      setLoadMore(false)
    } else if (productState?.products?.data?.payload && !loadMore) {
      setProductData(productState.products.data.payload.data)
    }
  }, [productState?.products])
  useEffect(() => {
    filteredProductList()
  }, [pages])
  useEffect(() => {
    let obj = {
      per_page: 18,
      page: pagesCloud,
      sort: 'id',
      order: 'desc',
    }
    props.actions.getMediaListAction(obj)
  }, [pagesCloud])
  ///Image upload
  const submitHandler = useCallback((e) => {
  //e.preventDefault()
    let formData = new FormData()
    formData.append('media', e)
    if (e.type === 'video/mp4') {
      formData.append('type_id', 2)
    } else {
      formData.append('type_id', 1)
    }
    formData.append('title', e.name)
    apiInstance
      .post('cloud/media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (data) => {
          progress.current = {
            ...progress.current,
            [e.name]: {
              ...progress.current[e.name],
              status: Math.round((100 * data.loaded) / data.total),
            },
          }
          forceUpdate(data.loaded)
        },
      }).then((response) => {
        if (response && response.meta.status === 'success') {
          progress.current = {
            ...progress.current,
            [e.name]: {
              ...progress.current[e.name],
              status: -1,
            },
          }
          setImfuleData(response.payload)
        }
      }).catch((error) => {
        progress.current = {
          ...progress.current,
          [e.name]: {
            ...progress.current[e.name],
            status: -2,
          },
        }
        console.log(error.response.data)
      })
  }, [])
  // console.log(event.target.checked)
  return (
    <MyDiv>
      {(productState?.products?.loading) &&
      <div>
        <Loader />
      </div>
      }

      <Snackbar open={status} autoHideDuration={2500} onClose={handleClose} >
        <Alert className="redirection_msg_yellow text-font" onClose={handleClose} severity="info" sx={{width: '100%'}}>
          {message}
        </Alert>
      </Snackbar>
      <Box mt={6} mb={6}>
        <Typography gutterBottom variant="h5" component="div" className="promotion_heading text-font">
          {(value === '3' ? 'Video Promotion' : 'The Easiest Collage Maker on the Imfule')}
        </Typography>
        <Typography gutterBottom variant="h5" component="div" className="promotion_subheading text-font">
          {(value === '3' ? 'You can promote videos on social media' : 'The Easiest Collage Maker on the Imfule')}
        </Typography>
        <Divider className="left_select" sx={{margin: '0 auto'}} />
      </Box>
      <Box sx={{width: '100%'}} className="tabs_box_promote">
        <TabContext value={value}>
          <Grid container>
            <Grid item xs={12} md={3}>
              <Box className="left_sidebar">
                <Box>
                  <Typography gutterBottom variant="h5" component="div" className="select_images text-font">
                    Choose Media From Here
                    <Divider className="left_select" />
                  </Typography>
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    className="tab_btn_promote"
                  >
                    <Tab label="Product Images" value="1" className="text-font tab_color_promote" />
                    <Tab label="Cloud Images" value="2" className="text-font tab_color_promote" />
                    {/* <Tab label="Cloud Videos" value="3" className="text-font tab_color_promote" /> */}
                  </Tabs>
                </Box>
                {selected && selected.length > 0 &&
                <Box className="selected_images">
                  <Typography gutterBottom variant="h5" component="div" className="select_images text-font">
                    Selected Media
                    <Divider className="left_select" />
                  </Typography>
                  {/* <Typography gutterBottom variant="h5" component="div" className="select_images_subhead text-font">
                    You can either select images or videos
                  </Typography> */}
                  <ImageList className="products_imageListSelected">
                    {selected && selected.map((item, index) => (
                      <ImageListItem key={index}>
                        {item.image.media_type === 'Video' &&
                        <video
                          src={`${item.image.source}?w=164&h=164&fit=crop&auto=format`}
                          srcSet={`${item.image.source}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          alt={item.title}
                          loading="lazy"
                          className="post_images_selected"
                          autoPlay muted loop
                        />
                        }
                        {item.image.media_type === 'Image' &&
                        <img
                          src={`${item.image.source}?w=164&h=164&fit=crop&auto=format`}
                          srcSet={`${item.image.source}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          alt={item.title}
                          loading="lazy"
                          className="post_images_selected"
                        />
                        }
                        {item.image.type === 'product' &&
                        <img
                          src={`${item.image.image_url}?w=164&h=164&fit=crop&auto=format`}
                          srcSet={`${item.image.image_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                          alt={item.title}
                          loading="lazy"
                          className="post_images_selected"
                        />
                        }
                        <CloseIcon className="clear_image" onClick={() => handleRemove(item.image)} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                  {selected && selected.length > 0 &&
                  <Box className="collage_btn">
                    <CustomButton fieldlabel="Clear All" variant="outlined" className="text-font action_button_outlined" onClick={() => handleClear()} />
                    {value === '3' ? '' : <CustomButton fieldlabel="Continue" variant="contained"
                      className="text-font action_button" onClick={handleClickOpen}
                    />
                    }
                    {/* <CustomButton fieldlabel="Share" variant="contained"
                      className="text-font action_button" onClick={handleClickOpenVideo}
                    /> */}
                  </Box>
                  }
                </Box>
                }
              </Box>
            </Grid>
            <Grid item xs={12} md={9} className="list_grid">
              {(value !== '1') &&
              <Box sx={{display: 'flex', justifyContent: 'end', marginBottom: '25px'}}>
                <Label htmlFor="icon-button-file">
                  <Input accept="image/*,video/*" id="icon-button-file" multiple type="file" onChange={(e) => {
                    progress.current = Array.from(e?.target?.files).reduce((initialFiles, file) => {
                      initialFiles[file.name] = {
                        id: file.name,
                        status: 0,
                      }
                      return initialFiles
                    }, {})
                    setSelectedFiles(e.target.files)
                    setEmptyBox(false)
                    Array.from(e?.target?.files).forEach((file, index) => submitHandler(file, index))
                  }}onClick={(event) => {
                    event.currentTarget.value = null
                  }}
                  />

                  <ComputerIcon aria-label="upload picture" sx={{color: '#fff', marginRight: '7px'}} />
                  <Typography aria-label="upload picture"
                    variant="h6"
                    fontSize="0.9rem"
                    className="text-font"
                    color="#fff"
                  >Upload</Typography>
                </Label>
              </Box>
              }
              <TabPanel sx={{padding: '0px'}} value="1">
                <ProductImages productData={productData} handleCheck={handleCheck} getCheckedStatus={getCheckedStatus} selected={selected} handleLoadMore={handleLoadMore} />
              </TabPanel>
              <TabPanel sx={{padding: '0px'}} value="2">
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <ImageList className="products_image_list">
                      <ProgressStatus
                        selectedFiles={selectedFiles}
                        progressPercentage={progress.current}
                      />
                      <CloudImages
                        imfuleCloudData={imfuleCloudData}
                        handleCheck={handleCheck}
                        getCheckedStatus={getCheckedStatus}
                        selected={selected}
                        handleLoadMoreCloud={handleLoadMoreCloud}
                        emptyBox={emptyBox}
                      />
                    </ImageList>
                  </Grid>
                </Grid>
              </TabPanel>
              {/* <TabPanel sx={{padding: '0px'}} value="3">
                <Grid container>
                  <Grid item xs={12} md={12}>
                    <ImageList className="products_image_list">
                      <ProgressStatus
                        selectedFiles={selectedFiles}
                        progressPercentage={progress.current}
                      />
                      <CloudVideos
                        imfuleCloudData={imfuleCloudData}
                        handleCheck={handleCheckVideo}
                        getCheckedStatus={getCheckedStatus}
                        selected={selected}
                        handleLoadMoreCloud={handleLoadMoreCloud}
                        emptyBox={emptyBox}
                      />
                    </ImageList>
                  </Grid>
                </Grid>
              </TabPanel> */}
            </Grid>
          </Grid>
        </TabContext>
      </Box>
      <CollageDialog
        handleImage={handleImage}
        openCollagePopup={openCollagePopup}
        closeCollage={handleCloseCollage}
        handleCollageDetails={handleCollageDetails}
        selected={selected}
        title="My Collage Images"
        loader={loader}
      />
      <CollageDetailsDialog
        promotionDetailType="Add"
        openCollageDetails={openCollageDetails}
        closeCollageDetails={handleCloseCollageDetails}
        image={image}
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
)(Promotion)
