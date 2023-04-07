import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import ReactImageGrid from '@cordelia273/react-image-grid'
import MyDiv from './twitter.style'
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: '#000',
    },
    children: `${name.split(' ')[0][0]}`,
  }
}
export default function Twitter(props) {
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
          </Grid>
          <CardContent className="card_middle">
            <Typography variant="body2"
              className="text-font product_description"
            >
              <p id="p_wrap">{props?.socialMediaData?.description}</p>
            </Typography>
          </CardContent>
          <CardMedia>
            <ReactImageGrid images={props?.socialMediaData?.image} />
          </CardMedia>
        </Card>
      </Box>
    </MyDiv>
  )
}
