import React from 'react'
import {ImageListItem, Checkbox, Box} from '@mui/material'
import {useSelector} from 'react-redux'
import {MessageBox, CustomButton} from '../../../../components'

export default function CloudVideos(props) {
  const label = {inputProps: {'aria-label': 'Checkbox demo'}}
  const mediaState = useSelector((state) => state.mediaState)
  // const handleCheck = (item) => (event) => {
  //   if (event.target.checked) {
  //     props.handleImage((selected) => [...selected, item])
  //   } else {
  //     props.handleImage((selected) => selected.filter((sid) => sid !== item))
  //   }
  // }

  return (
    <>
      {props?.imfuleCloudData.length > 0 &&
      <>
        {props?.imfuleCloudData && props.imfuleCloudData.filter((data) => data.media_type === 'Video').map((item, index) => (
          <ImageListItem key={index}>
            <video
              src={`${item.source}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${item.source}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              className="post_images"
              autoPlay muted loop
            />
            <Checkbox {...label}
              onChange={props.handleCheck(item)}
              checked={props.getCheckedStatus(item)}
              // checked={props?.selected?.includes(item?.source)}
              className="image_checkList"
            />
          </ImageListItem>
        ))}
      </>
      }
      {props?.imfuleCloudData.length === 0 &&
        <MessageBox messageTitle="No Data Found !!" disableBtn={false} />
      }
      {(mediaState?.getMediaList?.data?.payload?.pagination?.current_page !== mediaState?.getMediaList?.data?.payload?.pagination?.total_pages) &&
      <Box mt={3} className="load_btn">
        <CustomButton fieldlabel="Load more" variant="contained" onClick={() => props.handleLoadMoreCloud()} className="text-font action_button" />
      </Box>
      }
    </>
  )
}
