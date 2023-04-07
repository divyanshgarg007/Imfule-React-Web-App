import React, {useState} from 'react'
import {Box, Grid, ImageList, ImageListItem, Snackbar} from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import {connect, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import Checkbox from '@mui/material/Checkbox'
import {ActionCreators} from '../../../../redux/actions'
import MyDiv from './productGallery.style'
const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const label = {inputProps: {'aria-label': 'Checkbox demo'}}

function ProductGallery(props) {
  const postState = useSelector((state) => state?.postState)
  const postStateIndex = postState?.getPosition
  const [status, setStatus] = useState(false)
  const [message, setMessage] = useState('')
  const handleSelectImage = (data) => {
    const validFileIndex = postState?.addPostData[postStateIndex]?.image?.findIndex(((e) => e === data))
    if (validFileIndex !== -1 && postState?.addPostData[postStateIndex]?.type) {
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
      setStatus(true)
      setMessage(`You cannot select more than ${postState?.addPostData[postStateIndex]?.imageLimit} image.`)
    }
  }
  const handleClose = () => {
    setMessage('')
    setStatus(false)
  }
  return (
    <MyDiv>
      <Box sx={{flexGrow: 1}} mt={3}>
        <Grid container>
          <Grid item xs={12} md={12}>
            <ImageList cols={3} gap={8} className="products_image_list">
              {props?.selected && props.selected.map((item, index) => {
                return (<ImageListItem key={index}>
                  {/* {item.media_type === 'Video' &&
                  <video
                    src={`${item}?w=248&fit=crop&auto=format`}
                    srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item}
                    loading="lazy"
                    className="post_images"
                  />
                  } */}
                  <img
                    src={`${item}?w=248&fit=crop&auto=format`}
                    srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item}
                    loading="lazy"
                    className="post_images"
                  />
                  <Checkbox {...label} checked={item}
                    onChange={() => handleSelectImage(item)} className="image_check"
                  />
                </ImageListItem>)
              })}
            </ImageList>
          </Grid>
          <Snackbar open={status} autoHideDuration={2500} onClose={handleClose} >
            <Alert className="redirection_msg_yellow text-font" onClose={handleClose} severity="info" sx={{width: '100%'}}>
              {message}
            </Alert>
          </Snackbar>
        </Grid>
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
)(ProductGallery)
