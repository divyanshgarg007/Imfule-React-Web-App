/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Avatar from '@mui/material/Avatar'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
// import Photogrid from 'react-facebook-photo-grid'
// import {ReactPhotoCollage} from 'react-photo-collage'
// import FbImageLibrary from 'react-fb-image-grid'
import ReactImageGrid from '@cordelia273/react-image-grid'
import MyDiv from './facebook.style'
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: '#000',
    },
    children: `${name.split(' ')[0][0]}`,
  }
}
export default function Facebook(props) {
  return (
    <MyDiv>
      <Box>
        <Card className={`preview_box ${props.device}`}>
          <Grid container columnSpacing={{xs: 1, sm: 2, md: 3}} className="card_header">
            <Grid item xs={1} md={1} sm={1}>
              {props?.socialMediaData?.page_name &&
              <Avatar className="custom-avatar" {...stringAvatar(props?.socialMediaData?.page_name)} />
              }
            </Grid>
            <Grid item xs={10} md={10} sm={10} >
              <Typography gutterBottom variant="h5" component="div" className="text-font page_title">
                {props?.socialMediaData?.page_name}
              </Typography>
            </Grid>
            {/* <Grid item xs={1} md={1} sm={1} className="more_icon">
              <MoreHorizIcon />
            </Grid> */}

          </Grid>
          <CardContent className="card_middle">
            <Typography variant="body2"
              className="text-font product_description"
            >
              <p id="p_wrap">{props?.socialMediaData?.description}</p>
            </Typography>
          </CardContent>
          <CardMedia className="product_images">
            {/* <Photogrid
              images={props?.socialMediaData?.image}
              maxWidth={'100%'}
            /> */}
            {/* <ReactPhotoCollage {...imageData} /> */}
            <ReactImageGrid images={props?.socialMediaData?.image} />
          </CardMedia>
        </Card>
      </Box>
    </MyDiv>
  )
}
