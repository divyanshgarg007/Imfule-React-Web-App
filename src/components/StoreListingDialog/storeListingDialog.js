import React, {useState} from 'react'
import {Grid, Box, Dialog, DialogContent, DialogContentText, Slide, CardActionArea, IconButton, Divider} from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import {connect, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import PropTypes from 'prop-types'
import {Close as CloseIcon} from '@mui/icons-material'
import {Loader} from '..'
import Shopify from '../../images/shopify.png'
import Prestashop from '../../images/prestashop.png'
import {ActionCreators} from '../../redux/actions'
import {getToken} from '../../utilities/authUtils'
import {PrestashopStepsDialog, StoreAddress, PrestashopStoreAddress} from './components'
import MyDiv from './storeListingDialog.style'
const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

function StoreListingDialog(props) {
  const userState = useSelector((state) => state.userState)
  const [openShopify, setOpenShopify] = useState(false)
  const [openSteps, setOpenSteps] = useState(false)
  const [storeAddress, setStoreAddress] = useState('')
  const [prestaShopData, setPrestaShopData] = useState({
    storeName: '',
    storeUrl: '',
    key: '',
  })
  const [openPrestashop, setOpenPrestashop] = useState(false)

  const handlePrestashop = () => {
    setOpenPrestashop(false)
    props.actions.cleanUpStateStore()
    setPrestaShopData({
      storeName: '',
      storeUrl: '',
      key: '',
    })
  }
  const handlePrestaShopChange = (prop) => (event) => {
    setPrestaShopData({
      ...prestaShopData,
      [prop]: event.target.value,
    })
  }
  const handleShopify = () => {
    setOpenShopify(false)
    setStoreAddress('')
    props.actions.cleanUpStateStore()
  }

  const handleSteps = () => {
    setOpenSteps(false)
    setOpenPrestashop(true)
  }

  const handleNextPrestashop = () => {
    setOpenSteps(true)
    props.handleListing()
  }

  const handleNextShopify = () => {
    // setOpenShopify(true)
    // props.handleListing()
    window.location.href = getToken('setting')?.SHOPIFY_GENERAL_SETTINGS?.shopify_store_url
  }
  const handleAddStore = (shopType) => {
    if (shopType === 'shopify') {
      let data = {
        shop_url: storeAddress,
      }
      props.actions.addStoreAction(shopType, data)
    } else if (shopType === 'prestashop') {
      let data = {
        shop_name: prestaShopData?.storeName,
        shop_url: prestaShopData?.storeUrl,
        key: prestaShopData?.key,
      }
      props.actions.addStoreAction(shopType, data)
    }

  }
  const handleStoreAddressChange = (e) => {
    setStoreAddress(e.target.value)
  }
  const handleClosePrestashop = () => {
    setOpenSteps(false)
    props.actions.cleanUpState()
  }
  const listingPopup = () => (
    <MyDiv>
      {props.loading &&
      <div>
        <Loader />
      </div>
      }
      <DialogContent className="no-scroll">
        <DialogContentText id="alert-dialog-slide-description" variant="body1"
          color="#000"
          textAlign="center"
          fontSize="1.3rem"
          fontFamily="Poppins"
          fontWeight="600"
          paddingBottom={'15px'}
        >
          Connect or Add Store
          <IconButton onClick={() => props.handleListing()} className="close_listing">
            <CloseIcon />
          </IconButton>
        </DialogContentText>
        <Divider />
        <Box sx={{width: '100%'}}>
          <Grid container>
            <Grid item md={12} xs={12}>
              <Grid container >
                <Grid item md={12} xs={12}>
                  <Box className="listing_store_box" mt={3} mb={1}>
                    {getToken('setting')?.active_shop?.map((data) => {
                      return (<>
                        {data.slug === 'shopify' &&
                          <Card className="listing_cards">
                            <CardActionArea sx={{background: '#d9dfd2'}} onClick={handleNextShopify}>
                              <div className="store_image">
                                <img src={Shopify} alt="pic" />
                              </div>
                              <CardContent>
                                <Typography variant="h5" component="div" className="text-font store_names">
                                  Connect Shopify
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        }
                        {data.slug === 'prestashop' &&
                        <Card className="listing_cards">
                          <CardActionArea sx={{background: '#c8e7ef'}} onClick={handleNextPrestashop}>
                            <div className="store_image">
                              <img src={Prestashop} alt="pic" />
                            </div>
                            <CardContent>
                              <Typography variant="h5" component="div" className="text-font store_names">
                                Connect Prestashop
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                        }
                      </>
                      )
                    })}
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <PrestashopStepsDialog
        openSteps={openSteps}
        handleSteps={handleSteps}
        // handleSubmit={handleAddStore}
        // handleChange={handlePrestaShopChange}
        // form={prestaShopData}
        // loading={userState?.addStore?.loading}
        handleClosePrestashop={handleClosePrestashop}
      />
      <StoreAddress
        openPopup={openShopify}
        handleShopify={handleShopify}
        handleSubmit={handleAddStore}
        handleChange={handleStoreAddressChange}
        storeAddress={storeAddress}
        error={userState?.addStore?.error?.errors?.shop_url[0]}
        loading={userState?.addStore?.loading}
      />
      <PrestashopStoreAddress
        openStore={openPrestashop}
        handlePrestashop={handlePrestashop}
        handleSubmit={handleAddStore}
        handleChange={handlePrestaShopChange}
        form={prestaShopData}
        error={userState?.addStore?.error?.errors?.shop_url[0]}
        loading={userState?.addStore?.loading}
      />
    </MyDiv>
  )
  return (
    <Dialog
      popuplistingbox="openListingPopup"
      open={props.openListingPopup}
      TransitionComponent={Transition}
      keepMounted
      fullWidth
      onClose={() => props.handleListing()}
      aria-describedby="alert-dialog-slide-description"
    >
      {listingPopup('openListingPopup')}
    </Dialog>
  )
}
StoreListingDialog.propTypes = {
  openListingPopup: PropTypes.bool,
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(StoreListingDialog)
