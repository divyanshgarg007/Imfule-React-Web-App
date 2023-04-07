import React from 'react'
import PropTypes from 'prop-types'
import {Box, Grid, Card, CardContent, CardActions, Skeleton} from '@mui/material'
import MyDiv from './customCardSkeleton.style'

function CardSkeletons(props) {
  const {loading = false} = props
  return (
    <MyDiv>
      <Box mt={5} mb={12}>
        <Grid container rowSpacing={4} columnSpacing={{sm: 4, md: 4}}>
          {[...Array(props?.length || 6).keys()].map((index) => (
            <Grid key={index} item xs={12} md={2} sm={4}>
              <Card className="product-card">
                <CardActions className="skeleton_add">
                  {loading ? (
                    <Skeleton animation="wave" variant="circular" width={35} height={35} className="add_button" />
                  ) : ''}
                </CardActions>
                {loading ? (
                  <Skeleton sx={{height: 150}} animation="wave" variant="rectangular" />
                ) : ''}
                <CardContent align="center">
                  {loading ? (
                    <Skeleton animation="wave" height={10} width="80%" />
                  ) : ''}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </MyDiv>
  )
}
CardSkeletons.propTypes = {
  loading: PropTypes.bool,
}
export default function CustomCardSkeleton() {
  return (
    <div>
      <CardSkeletons loading />
    </div>
  )
}
