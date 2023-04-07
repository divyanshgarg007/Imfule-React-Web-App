/* eslint-disable no-unused-vars */
import React, {memo} from 'react'
import {Box, ImageList, ImageListItem, Grid, Checkbox, Typography} from '@mui/material'
import {MessageBox} from '../../../../../../../../components'
// import DeleteIcon from '@mui/icons-material/Delete'
import MyDiv from './cloudUpload.style'

const CloudUpload = memo((props) => {
  const label = {inputProps: {'aria-label': 'Checkbox demo'}}
  return (
    <>
      {props?.imfuleCloudData.length > 0 &&
        <>
          {props?.imfuleCloudData && props.imfuleCloudData.map((item) => {
            return (<ImageListItem key={item.id}>
              {/* <IconButton className="delete_image" onClick={() => props.handleDeleteImage(item, props?.selected?.includes(item?.source))}>
                    <DeleteIcon />
                  </IconButton> */}
              {/* {item.media_type === 'Video' &&
              <video
                src={`${item.source}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item}
                loading="lazy"
                className="post_images"
                autoPlay muted loop
              />
              } */}
              {item.media_type === 'Image' &&
              <img
                src={`${item.source}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item}
                loading="lazy"
                className="post_images"
              />
              }
              <Checkbox {...label} checked={props?.selected?.includes(item?.source)}
                onChange={() => props.handleSelectImage(item?.source)} className="image_check"
              />
            </ImageListItem>)
          })}
        </>
      }
      {props?.imfuleCloudData.length === 0 && props.emptyBox &&
        <MessageBox messageTitle="No Data Found !!" disableBtn={false} />
      }
    </>
  )
})
export default CloudUpload
