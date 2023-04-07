import React from 'react'
import {Grid, Box, Dialog, DialogActions, DialogContent, DialogContentText, Slide, IconButton, Divider, Typography} from '@mui/material'
import {Close as CloseIcon} from '@mui/icons-material'
import PropTypes from 'prop-types'
import {CustomButton} from '../../..'
import MyDiv from './prestashopStepsDialog.style'
const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function PrestashopStepsDialog(props) {
  const handleContinue = () => {
    props.handleSteps()
  }
  const stepsPopup = () => (
    <MyDiv>
      <DialogContent className="no-scroll">
        <DialogContentText id="alert-dialog-slide-description" variant="body1"
          color="#000"
          textAlign="center"
          fontSize="1.3rem"
          fontFamily="Poppins"
          fontWeight="600"
          paddingBottom={'15px'}
        >
          Connect Prestashop
          <IconButton onClick={() => props.handleClosePrestashop()} className="close_listing">
            <CloseIcon />
          </IconButton>
        </DialogContentText>
        <Divider />
        <Box sx={{width: '100%'}}>
          <Grid container>
            <Grid item md={12} xs={12}>
              <Grid container >
                <Grid item md={12} xs={12}>
                  <Box className="listing_store_box" mt={3}>
                    <Typography variant="h6"
                      color="text.primary"
                      fontSize="0.9rem"
                      className="text-font"
                    >
                      1. Open <b>PrestaShop</b> Admin, go to the System <b>Menu Item</b>.
                    </Typography>
                    <Typography variant="h6"
                      color="text.primary"
                      fontSize="0.9rem"
                      className="text-font"
                    >
                      2. In the <b>Configure</b> Menu, Select <b>Advance Parameters</b>.
                    </Typography>
                    <Typography variant="h6"
                      color="text.primary"
                      fontSize="0.9rem"
                      className="text-font"
                    >
                      3. Click on <b>Advanced Parameter</b> and select <b>Webservice</b>.
                    </Typography>
                    <Typography variant="h6"
                      color="text.primary"
                      fontSize="0.9rem"
                      className="text-font"
                    >
                      4. After Click <b>Webservice</b>, enable <b>Prsetashop's Webservice</b>.
                    </Typography>
                    <Typography variant="h6"
                      color="text.primary"
                      fontSize="0.9rem"
                      className="text-font"
                    >
                      5. Then, <b>Add New Webservice Key</b> on top of the bar.
                    </Typography>
                    <Typography variant="h6"
                      color="text.primary"
                      fontSize="0.9rem"
                      className="text-font"
                    >
                      6. Then Click on <b>Generate key</b> button.
                    </Typography>
                    <Typography variant="h6"
                      color="text.primary"
                      fontSize="0.9rem"
                      className="text-font"
                    >
                      7. After that set <b>Status</b> Yes and also set the <b>Permissions</b> for (<b>categories,
                        customers,
                        employees,
                        images,
                        languages,
                        products,
                        shop_urls,
                        shops,
                        stores</b>).
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions className="custom_dialog_action">
        <CustomButton fieldlabel="Continue" variant="contained" className="text-font action_button" onClick={handleContinue} />
      </DialogActions>
    </MyDiv>
  )
  return (
    <Dialog
      stepspopupbox="openSteps"
      open={props.openSteps}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      onClose={() => props.handleClosePrestashop()}
      aria-describedby="alert-dialog-slide-description"
    >
      {stepsPopup('openSteps')}
    </Dialog>
  )
}
PrestashopStepsDialog.propTypes = {
  openSteps: PropTypes.bool,
}

