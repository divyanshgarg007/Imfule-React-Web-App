import React from 'react'
import {Box, Link, Typography, Divider, Chip, Button, Avatar} from '@mui/material'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {withRouter} from 'react-router-dom'
import {compose} from 'recompose'
import {ActionCreators} from '../../redux/actions'
import {getToken} from '../../utilities/authUtils'
import MyDiv from './authTopPanel.style'
function AuthTopPanel(props) {
  const SignInWithShopify = () => {
    props.actions.cleanUpState()
    window.location.href = getToken('setting')?.SHOPIFY_GENERAL_SETTINGS?.shopify_store_url
  }
  const SignInPrestashop = () => {
    props.actions.cleanUpState()
    props.setOpenSteps(true)
  }
  return (
    <MyDiv>
      <Typography
        mt={3}
        gutterBottom
        variant="h5"
        component="div"
        color="#000"
        fontWeight="600"
        className="signin_heading"
        textAlign="center"
      >
        {props.title}
      </Typography>
      <Box className="top_box">
        {getToken('setting')?.active_shop?.map((data) => {
          return (<>
            {data.slug === 'shopify' &&
            <Link onClick={SignInWithShopify} className="login-image">
              <Button
                className="btn-shopify"
                startIcon={
                  <Avatar
                    src={
                      props.shopifyImg
                    }
                    className="shopify-iconbutton"
                  />
                }
              >
                <Typography variant="h6"
                  color="text.primary"
                  fontSize="1rem"
                  className="shopify-text"
                > {props.buttontitle} </Typography>
              </Button>
            </Link>
            }
            {data.slug === 'prestashop' &&
            <Link onClick={SignInPrestashop} className="login-image">
              <Button
                className="btn-prestashop"
                startIcon={
                  <Avatar
                    src={
                      props.PrestashopImg
                    }
                    className="shopify-iconbutton"
                  />
                }
              >
                <Typography variant="h6"
                  color="text.primary"
                  fontSize="1rem"
                  className="shopify-text"
                > {props.buttontitlePrestashop} </Typography>
              </Button>
            </Link>
            }
          </>
          )
        })}
      </Box>
      <Box className="custom-separate">
        <Divider>
          <Chip label={props.separate} className="separate text-font" />
        </Divider>
      </Box>
    </MyDiv>
  )
}
AuthTopPanel.propTypes = {
  fieldlabel: PropTypes.string,
  handleSignInWithShopify: PropTypes.func,
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(AuthTopPanel)

