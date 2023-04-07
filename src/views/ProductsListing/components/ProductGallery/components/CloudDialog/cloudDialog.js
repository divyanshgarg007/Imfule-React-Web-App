import React, {useState, useEffect, useCallback} from 'react'
import {Dialog, DialogContent, DialogTitle, Slide, Box, Grid, Tabs, Tab, Divider, Typography, ImageList} from '@mui/material'
import PropTypes from 'prop-types'
import {styled} from '@mui/material/styles'
import {TabContext, TabPanel} from '@mui/lab'
import ComputerIcon from '@mui/icons-material/Computer'
import {Close as CloseIcon} from '@mui/icons-material'
import apiInstance from '../../../../../../config/api/axios'
import {ProductUpload, CloudUpload, ProgressStatus} from './components'
import MyDiv from './cloudDialog.style'

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

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function CloudDialog(props) {
  const [value, setValue] = useState('1')
  const [imfuleCloudData, setImmuneCloudData] = useState([])
  const [imfuleData, setImfuleData] = useState()
  const descriptionElementRef = React.useRef(null)
  const progress = React.useRef({})
  const [emptyBox, setEmptyBox] = useState(true)
  React.useEffect(() => {
    if (props.openCloud) {
      const {current: descriptionElement} = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [props.openCloud])
  React.useEffect(() => {
    setImmuneCloudData(props.imfuleCloudData)
  }, [props.imfuleCloudData])
  React.useEffect(() => {
    if (props.deletedData) {
      const newData = imfuleCloudData.filter((data) => data.id !== props.deletedData.id)
      setImmuneCloudData(newData)
    }
  }, [props.deletedData])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [selectedFiles, setSelectedFiles] = useState([])
  const [, forceUpdate] = useState()
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
  useEffect(() => {
    if (imfuleData !== undefined && imfuleData !== null) {
      setImmuneCloudData([imfuleData, ...imfuleCloudData])
      setImfuleData()
    }
  }, [imfuleData])

  return (
    <Dialog
      open={props.openCloud}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      maxWidth={'md'}
      onClose={() => props.closeCloud()}
      className="dialog_height"
    >
      <MyDiv>
        <Grid container sx={{alignItems: 'center', padding: '20px 0px 0px!important'}}>
          <Grid xs={6} md={7}>
            <DialogTitle className="text-font" gutterBottom
              variant="h5"
              component="div"
              sx={{fontSize: '1.3rem', padding: '0px 24px!important', fontWeight: '600'}}
            >{props.title}</DialogTitle>
          </Grid>
          {value === '2' &&
          <Grid xs={4} md={4}>
            <Box sx={{display: 'flex', justifyContent: 'end'}}>
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
          </Grid>
          }
          <Grid xs={2} md={1}>
            <Box className="close_cloud">
              <CloseIcon onClick={() => props.closeCloud()} />
            </Box>
          </Grid>
        </Grid>
        <Box sx={{padding: '0px 24px!important'}}>
          <Typography variant="body1"
            className="text-font"
            fontWeight="500"
            color="#333"
            fontSize="0.9rem"
            paddingBottom={'10px'}
          >
            {value === '1' ? props?.images?.length : imfuleCloudData?.length} items
          </Typography>
          <Divider />
        </Box>
        <DialogContent sx={{padding: '0px 24px'}}>
          <Box sx={{width: '100%'}} className="tabs_box">
            <TabContext value={value}>
              <Grid container>
                <Grid item xs={12} md={3} className="cloud_border">
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    className="tab_btn"
                  >
                    <Tab label="Product Images" value="1" className="text-font tab_color" />
                    <Tab label="Imfule Cloud" value="2" className="text-font tab_color" />
                  </Tabs>
                </Grid>
                <Grid item xs={12} md={9}
                  sx={{height: '400px', overflowY: 'scroll'}} className="data_border"
                >
                  <TabPanel sx={{padding: '0px'}} value="1">
                    <ProductUpload
                      images={props?.images}
                      selected={props?.selected}
                      handleSelectImage={props.handleSelectImage}
                    /></TabPanel>
                  <TabPanel sx={{padding: '0px'}} value="2">
                    <Grid container>
                      <Grid item xs={12} md={12}>
                        <ImageList className="products_image_list">
                          <ProgressStatus
                            selectedFiles={selectedFiles}
                            progressPercentage={progress.current}
                          />
                          <CloudUpload
                            imfuleCloudData={imfuleCloudData}
                            selected={props?.selected}
                            handleSelectImage={props.handleSelectImage}
                            handleDeleteImage={props.handleDeleteImage}
                            emptyBox={emptyBox}
                          />
                        </ImageList>
                      </Grid>
                    </Grid>
                  </TabPanel>
                </Grid>
              </Grid>
            </TabContext>
          </Box>
        </DialogContent>
      </MyDiv>
    </Dialog>
  )
}
CloudDialog.propTypes = {
  title: PropTypes.string,
  countitems: PropTypes.any,
  fieldlabel: PropTypes.string,
}
