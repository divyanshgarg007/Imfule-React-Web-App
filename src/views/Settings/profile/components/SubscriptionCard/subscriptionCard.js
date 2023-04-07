/* eslint-disable no-unused-vars */
import {React, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect, useSelector} from 'react-redux'
import {Grid, Box, CardContent, CardActions, Alert, Stack, Typography, AlertTitle} from '@mui/material'
import {CustomButton} from '../../../../../components'
import * as routesNames from '../../../../../constants/routes'
import PlanListing from '../PlanListing'
import MyDiv from './subscriptionCard.style'

export default function SubscriptionCard(props) {
  const subscriptionState = useSelector((state) => state.subscriptionState)
  const [subscriptionList, setSubscriptionList] = useState([])
  useEffect(() => {
    if (subscriptionState?.subscriptionList?.data?.payload) {
      setSubscriptionList(subscriptionState.subscriptionList.data.payload)
    }
  }, [subscriptionState?.subscriptionList])
  return (
    <MyDiv>
      <Box mt={2} className="box_tabs">
        <Grid container className="edit_grid">
          <Grid item md={12} xs={12}>
            <Grid item xs={12} md={12} >
              <Stack sx={{width: '100%'}} spacing={2}>
                <Alert severity="warning">
                  <AlertTitle variant="h5" component="div" className="text-font detail_heading">We need your attention!</AlertTitle>
                  <div className="text-font detail_title">Your 30 days Trial started. To start using product, please &nbsp;
                    <Link to={{pathname: 'https://imfule.com'}} target="_blank" style={{textDecoration: 'none'}}>
                      Explore.
                    </Link>
                  </div>
                </Alert>
              </Stack>
            </Grid>
            {/* <CardContent className="content-body">
              <Box sx={{width: '100%'}} mt={2}>
                <Grid container >
                  <Grid item xs={12} md={12}>
                    <Typography variant="h5" component="div" className="text-font detail_heading">
                      Active Until Dec 09, 2021
                    </Typography>
                    <Typography variant="body2"
                      className="text-font detail_title"
                    >
                      We Will Send You A Notification Upon Subscription Expiration
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} mt={3}>
                    <Typography variant="h5" component="div" className="text-font detail_heading">
                      $24.99 Per Month
                    </Typography>
                    <Typography variant="body2"
                      className="text-font detail_title"
                    >
                      Extended Pro Package. Up To 100 Agents & 25 Projects
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} mt={3}>
                    <CardActions className="set-right">
                      <CustomButton fieldlabel="Cancel Subscription" variant="outlined" className="text-font action_button_outlined" />
                      <CustomButton fieldlabel="Upgrade Plan" variant="contained" className="text-font action_button" />
                    </CardActions>
                  </Grid>

                </Grid>
              </Box>
            </CardContent> */}
          </Grid>
        </Grid>
        <Typography variant="h5" component="div" className="text-font planHeading">
          Imfule Plans
        </Typography>
        <Grid container rowSpacing={{xs: 0, sm: 0, md: 3}} columnSpacing={{xs: 1, sm: 3, md: 3}}>
          {subscriptionList?.map((data, index) => {
            return (<Grid item md={3} xs={12} sm={6} key={index}>
              <PlanListing subscriptionList={data} />
            </Grid>)
          })}

          {/* <Grid item md={3} xs={12} sm={6}>
            <PlanListing />
          </Grid>
          <Grid item md={3} xs={12} sm={6}>
            <PlanListing />
          </Grid> */}
        </Grid>
      </Box>
    </MyDiv>
  )
}
SubscriptionCard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  priceSubtitle: PropTypes.string,
  // usermessage: PropTypes.string,
  price: PropTypes.any,
}
