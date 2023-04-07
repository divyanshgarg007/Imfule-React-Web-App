import React from 'react'
import {Grid, Box, Dialog, DialogActions, DialogContent, DialogContentText, Slide, Typography} from '@mui/material'
import PropTypes from 'prop-types'
import {CustomButton, CustomTextBox, Loader} from '../../../'
import Prestashop from '../../../../images/prestashop.png'
import MyDiv from './prestashopStoreAddress.style'
const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function PrestashopStoreAddress(props) {
  const popupStore = () => (
    <MyDiv>
      {props.loading &&
      <div>
        <Loader />
      </div>
      }
      <div className="store_image">
        <img src={Prestashop} alt="pic" />
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
                      Store Name
                    </Typography>
                    <CustomTextBox
                      type="text"
                      required
                      variant="standard"
                      name="storeName"
                      value={props?.form?.storeName}
                      onChange={props?.handleChange('storeName')}
                      fieldlabel="Your Store Name"
                      // error={props?.error}
                      // helperText={props?.error}
                    />
                  </Box>
                  <Box mt={2}>
                    <Typography
                      variant="h6"
                      color="text.primary"
                      fontSize="0.9rem"
                      className="text-font"
                      align="left"
                    >
                      Store Url
                    </Typography>
                    <CustomTextBox
                      type="text"
                      required
                      variant="standard"
                      name="storeUrl"
                      value={props?.form?.storeUrl}
                      onChange={props.handleChange('storeUrl')}
                      fieldlabel="https://imfule.com/prestashop/"
                      error={props.error}
                      helperText={props.error}
                    />
                  </Box>
                  <Box mt={2}>
                    <Typography
                      variant="h6"
                      color="text.primary"
                      fontSize="0.9rem"
                      className="text-font"
                      align="left"
                    >
                      Access Key
                    </Typography>
                    <CustomTextBox
                      type="text"
                      required
                      variant="standard"
                      name="key"
                      value={props?.form?.key}
                      onChange={props.handleChange('key')}
                      fieldlabel="H41GMY8M8P9VHS3R5DIZ72DPH8FBCJER"
                      // error={props.error}
                      // helperText={props.error}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions className="custom_dialog_action">
        <CustomButton fieldlabel="Cancel" variant="outlined" onClick={() => props.handlePrestashop()} className="text-font action_button_outlined" />
        <CustomButton fieldlabel="Submit" disabled={!(props?.form?.storeName && props?.form?.storeUrl && props?.form?.key)}
          variant="contained" onClick={() => props.handleSubmit('prestashop')} className="text-font action_button"
        />
      </DialogActions>
    </MyDiv>
  )
  return (
    <Dialog
      popupbox="openStore"
      open={props.openStore}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      onClose={() => props.handlePrestashop()}
      aria-describedby="alert-dialog-slide-description"
    >
      {popupStore('openStore')}
    </Dialog>
  )
}
PrestashopStoreAddress.propTypes = {
  openStore: PropTypes.bool,
}

