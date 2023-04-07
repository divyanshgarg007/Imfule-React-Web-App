import React from 'react'
import {Grid, Box, Dialog, DialogActions, DialogContent, DialogContentText, Slide, Typography} from '@mui/material'
import PropTypes from 'prop-types'
import {CustomButton, CustomTextBox, Loader} from '../../../'
import Shopify from '../../../../images/shopify.png'
import MyDiv from './storeAddressDialog.style'
const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function StoreAddress(props) {
  const popup = () => (
    <MyDiv>
      {props.loading &&
      <div>
        <Loader />
      </div>
      }
      <div className="store_image">
        <img src={Shopify} alt="pic" />
      </div>
      <DialogContent className="no-scroll">
        <DialogContentText id="alert-dialog-slide-description" variant="body1"
          color="#000"
          textAlign="center"
          fontSize="1rem"
          fontFamily="Poppins"
          fontWeight="600"
        >
          Continue to your store
        </DialogContentText>
        <Box sx={{width: '100%'}} mt={3}>
          <Grid container>
            <Grid item md={12} xs={12}>
              <Grid container >
                <Grid item md={12} xs={12}>
                  <Box mt={2}>
                    <Typography
                      variant="h6"
                      color="text.primary"
                      fontSize="0.9rem"
                      className="text-font"
                      align="left"
                    >
                      Store address
                    </Typography>
                    <CustomTextBox
                      type="text"
                      required
                      variant="standard"
                      fieldlabel="https://your-store-name.myshopify.com/"
                      name="storeAddress"
                      value={props.storeAddress}
                      onChange={props.handleChange}
                      error={props.error}
                      helperText={props.error}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions className="custom_dialog_action">
        <CustomButton fieldlabel="Cancel" variant="outlined" onClick={() => props.handleShopify()} className="text-font action_button_outlined" />
        <CustomButton fieldlabel="Submit" disabled={!props.storeAddress} variant="contained" onClick={() => props.handleSubmit('shopify')} className="text-font action_button" />
      </DialogActions>
    </MyDiv>
  )

  return (

    <Dialog
      popupbox="openPopup"
      open={props.openPopup}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      onClose={() => props.handleShopify()}
      aria-describedby="alert-dialog-slide-description"
    >
      {popup('openPopup')}
    </Dialog>
  )
}
StoreAddress.propTypes = {
  openPopup: PropTypes.bool,
}
