import React from 'react'
import {Box, Grid, Card, CardContent, CardMedia, CardActions, Typography, Fab, Tooltip} from '@mui/material'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import NoImage from '../../../../images/no-image.jpg'
import {ActionCreators} from '../../../../redux/actions'
import MyDiv from './productCard.style'

const ProductCard = (props) => {
  return (
    <MyDiv>
      <Box mt={5} mb={12}>
        <Grid container rowSpacing={4} columnSpacing={{sm: 4, md: 4}}>
          {props.productData && props.productData.map((product) =>
            (<Grid key={product.id} item xs={12} md={2} sm={4}>
              <Card className="product-card">
                <CardActions className="add_post">
                  <Tooltip title="Add Post" arrow>
                    <Fab aria-label="add" onClick={() => props.handleProductDetails(product.id)}>
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                </CardActions>
                <CardMedia>
                  <div className="product-img">
                    {product && product?.images?.length > 0 &&
                    <img src={product?.images?.filter((image) => image.is_master === 1)[0]?.image_url} />
                    }
                    {product && product?.images.length === 0 &&
                    <img src={NoImage} alt="No Image" />
                    }
                  </div>
                </CardMedia>
                <CardContent align="center" className="product_content" >
                  <Typography variant="h6"
                    color="text.primary"
                    className="text-font product-title"
                  >
                    <Tooltip title={product.product_name} arrow>
                      <div>{product.product_name}</div>
                    </Tooltip>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>),
          )}
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
)(ProductCard)
