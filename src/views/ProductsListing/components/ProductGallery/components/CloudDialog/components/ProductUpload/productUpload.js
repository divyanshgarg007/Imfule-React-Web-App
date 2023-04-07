import React from 'react'
import {Box, ImageList, ImageListItem, Grid, Checkbox} from '@mui/material'
import MyDiv from './productUpload.style'

export default function ProductUpload(props) {
  const label = {inputProps: {'aria-label': 'Checkbox demo'}}

  return (
    <MyDiv>
      <Box>
        <Grid container>
          <Grid item xs={12} md={12}>
            <ImageList className="products_image_list">
              {props?.images && props.images.map((item, index) => (
                <ImageListItem key={index}>
                  <img
                    src={`${item.image_url}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item}
                    loading="lazy"
                    className="post_images"
                  />
                  <Checkbox {...label} checked={props?.selected?.includes(item?.image_url)}
                    onChange={() => props.handleSelectImage(item?.image_url)} className="image_check"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
      </Box>
    </MyDiv>
  )
}
