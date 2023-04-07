import React, {useState, useEffect} from 'react'
import {Grid, Stack, IconButton, Typography, Snackbar} from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import AddIcon from '@mui/icons-material/Add'
import {connect, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import {ActionCreators} from '../../../../../../redux/actions'
import CloudDialog from '../CloudDialog/cloudDialog'
import {Snackbar as SnackAlert, Loader, AlertDialog} from '../../../../../../components'
import MyDiv from './addImage.style'
const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})
function AddImage(props) {
  const [openCloud, setOpenCloud] = useState(false)
  const [deletedData, setDeletedData] = useState({})
  const postState = useSelector((state) => state?.postState)
  const mediaState = useSelector((state) => state?.mediaState)
  const postStateIndex = postState?.getPosition
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [alertPopUp, setAlertPopup] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState('')
  const [statusImage, setStatusImage] = useState(false)
  const [messageImage, setMessageImage] = useState('')
  const [alertLabel, setAlertLabel] = useState(
    {
      title: '',
      subtitle: '',
      button: '',
      close: '',
    },
  )
  const handleClickOpen = () => {
    setOpenCloud(true)
  }
  const handleDeleteClose = () => {
    setAlertLabel('')
    setAlertPopup(false)
    setSelectedMedia('')
  }
  const handleCloseCloud = () => {
    props.actions.cleanUpMediaState()
    setOpenCloud(false)
    handleDeleteClose()
  }
  const handleSelectImage = (data) => {
    const validFileIndex = postState?.addPostData[postStateIndex]?.image?.findIndex(((e) => e === data))
    if (validFileIndex !== -1) {
      props.actions.onChangeSocialMediaAction(postState?.addPostData?.map(
        (shareholder, sidx) => {
          if (postStateIndex !== sidx) {return shareholder} else {
            shareholder?.image?.splice(validFileIndex, 1)
            return {...shareholder, image: shareholder?.image,
            }
          }
        }),
      )
    } else if (validFileIndex === -1 && postState?.addPostData[postStateIndex]?.image.length + 1 <= postState?.addPostData[postStateIndex]?.imageLimit) {
      props.actions.onChangeSocialMediaAction(postState?.addPostData?.map(
        (shareholder, sidx) => {
          if (postStateIndex !== sidx) {return shareholder} else {
            return {...shareholder, image: [].concat(shareholder.image, data),
            }
          }
        }),
      )
    } else if (postState?.addPostData[postStateIndex]?.type && postState?.addPostData[postStateIndex]?.image.length + 1 >= postState?.addPostData[postStateIndex]?.imageLimit) {
      setMessageImage(`You cannot select more than ${postState?.addPostData[postStateIndex]?.imageLimit} image.`)
      setStatusImage(true)
    }
  }
  const handleDeleteImage = (media, selected) => {
    if (!selected) {
      const deleteData = {
        title: 'Are You Sure ?',
        subtitle: 'Do you want to delete this image from cloud',
        button: 'Delete',
        close: 'Cancel',
      }
      setAlertLabel(deleteData)
      setAlertPopup(true)
      setSelectedMedia(media)
    } else {
      const deleteData = {
        subtitle: 'You cannot delete selected image',
        close: 'OK',
      }
      setAlertLabel(deleteData)
      setAlertPopup(true)
    }

  }
  const handleSubmit = (media, selected) => {
    setAlertPopup(false)
    props.actions.deleteMediaAction(media?.id)
  }
  useEffect(() => {
    if (mediaState?.deleteMedia?.data?.payload) {
      setMessage(mediaState?.deleteMedia?.data?.meta?.message)
      setStatus(mediaState?.deleteMedia?.data?.meta?.status)
      setDeletedData(mediaState?.deleteMedia?.data?.payload)
    } else if (mediaState?.deleteMedia?.error?.meta) {
      setMessage(mediaState?.deleteMedia?.error.meta?.message)
      setStatus('error')
    }
  }, [mediaState?.deleteMedia])
  const handleSnackBarClose = () => {
    setMessage('')
    setStatus('')
  }
  const handleCloseImage = () => {
    setMessageImage('')
    setStatusImage(false)
  }
  return (
    <MyDiv>
      <SnackAlert
        message={message}
        severity={status}
        duration={2500}
        open={message.length > 0}
        close={handleSnackBarClose}
      />
      <Snackbar open={statusImage} autoHideDuration={2500} onClose={handleCloseImage} >
        <Alert className="redirection_msg_yellow text-font" onClose={handleCloseImage} severity="info" sx={{width: '100%'}}>
          {messageImage}
        </Alert>
      </Snackbar>
      <AlertDialog
        openDialog={alertPopUp}
        handleDeleteClose={handleDeleteClose}
        handleClose={handleDeleteClose}
        alertLabel={alertLabel}
        handleSubmit={handleSubmit}
        id={selectedMedia}
      />
      {(mediaState?.deleteMedia?.loading) &&
      <div>
        <Loader />
      </div>
      }
      <Grid container>
        <Grid item xs={12} md={12} >
          <Stack direction="row" alignItems="center" spacing={2} className="add_img_box">
            <IconButton className="add_imgs" disabled={!postState?.addPostData[postStateIndex]?.type} onClick={handleClickOpen}>
              <AddIcon />
            </IconButton>
            <Typography
              variant="h6"
              fontSize="0.9rem"
              className="text-font"
            >Add More Images</Typography>
          </Stack>
          <CloudDialog openCloud={openCloud} closeCloud={handleCloseCloud}
            images={props?.images} selected={props?.selected}
            deletedData={deletedData}
            imfuleCloudData={props.imfuleCloudData}
            handleSelectImage={handleSelectImage}
            title="My Uploads"
            countitems="5 Items"
            handleDeleteImage={handleDeleteImage}
          />
        </Grid>
      </Grid>
    </MyDiv>
  )
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(AddImage)
