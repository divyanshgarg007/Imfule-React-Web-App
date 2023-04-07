import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import MyDiv from './pinterest.style'

export default function Pinterest(props) {
  return (
    <MyDiv>
      <Box>
        <Card className={`preview_box ${props.device}`}>
          <Grid container columnSpacing={{xs: 1, sm: 2, md: 3}} className="card_header">
            <Grid item xs={6} md={6} sm={6} >
              <CardMedia className="product_images">
                <div className="product_images">
                  <img src={props?.socialMediaData?.image} />
                </div>
              </CardMedia>
            </Grid>
            <Grid item xs={6} md={6} sm={6} >
              <CardContent className="card_middle">
                <Typography variant="h6"
                  className="text-font product_title"
                >
                  {props?.socialMediaData?.title}
                </Typography>
                <Typography variant="body2"
                  className="text-font product_description"
                >
                  <p id="p_wrap">{props?.socialMediaData?.description}</p>
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </MyDiv>
  )
}
