import React from 'react'
import {Drawer, Box, Grid, CardContent, Divider, CardActions, IconButton, Typography} from '@mui/material'
import {styled} from '@mui/material/styles'
import {Close as CloseIcon} from '@mui/icons-material'
import ProductsListing from '../../../ProductsListing/productsListing'
import MyDiv from './productListingDialog.style'

const CustomDrawer = styled(Drawer)(
  ({theme, open}) => ({
    '& .MuiDrawer-paperAnchorLeft': {
      width: '100%',
      [theme.breakpoints.up('xs')]: {
        width: '100%',
      },
      [theme.breakpoints.up('sm')]: {
        width: '100%',
      },
      [theme.breakpoints.up('md')]: {
        width: '80%',
      },
    },
  }),
)

export default function ProductListingDialog(props) {
  const handleClose = () => {
    props.onClose()
  }
  return (
    <CustomDrawer
      className="product_listing_popup"
      anchor="left"
      open={props.open}
      onClose={handleClose}
    >
      <MyDiv>
        <Box>
          <Grid container>
            <Grid item md={12} xs={12}>
              <CardContent>
                <Grid container className="edit_grid">
                  <Grid item xs={6} md={6} sm={6}>
                    <Typography gutterBottom variant="h5" component="div" className="text-font listing_title">
                      My Products
                    </Typography>
                  </Grid>
                  <Grid item xs={0} md={6} sm={6} display={{xs: 'none', lg: 'block', sm: 'block'}}>
                    <CardActions className="calender_actions">
                      <IconButton onClick={handleClose} color="primary">
                        <CloseIcon />
                      </IconButton>
                    </CardActions>
                  </Grid>
                  <Grid item xs={6} display={{xs: 'block', lg: 'none', sm: 'none'}}>
                    <CardActions className="calender_actions">
                      <IconButton onClick={handleClose} color="primary">
                        <CloseIcon />
                      </IconButton>
                    </CardActions>
                  </Grid>
                </Grid>
                <Divider />
              </CardContent>
            </Grid>
          </Grid>
        </Box>
        <Box mt={0} ml={2} mr={2}>
          <ProductsListing
            heading="title"
            className="product_listing_box"
            scheduleData={props.scheduleData}
            productListDialogClose={handleClose}
          />
        </Box>

      </MyDiv>
    </CustomDrawer>
  )
}
