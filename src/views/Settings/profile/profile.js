/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import {Box, Card, Tabs, Tab} from '@mui/material'
import {TabContext} from '@mui/lab'
import {withRouter, Switch, Route, Link, Redirect} from 'react-router-dom'
import {connect, useSelector} from 'react-redux'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import {ActionCreators} from '../../../redux/actions'
import * as routesNames from '../../../constants/routes'
import {getToken} from '../../../utilities/authUtils'
import MyDiv from './profile.style'
import {OverviewCard, SubscriptionCard, NetworkSettingsCard, StoreCard, CompanyCard} from './components'
function Profile(props) {
  useEffect(() => {
    props.actions.checkSession()
    props.actions.getCountryList()
    if (getToken('companyID') && getToken('companyID') !== 'undefined') {
      props.actions.getCompanyAction(getToken('companyID'))
      props.actions.getSubscriptionList()
    }

  }, [])
  return (
    <MyDiv>
      <Box sx={{width: '100%'}} className="tabs_box">
        <Card className="tabs_card">
          <TabContext value={window.location.pathname}>
            <Tabs sx={{borderBottom: 1, borderColor: 'divider'}}
              value={
                window.location.pathname !== '/'
                  ? window.location.pathname
                  : false
              }
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
              className="tab_btn"
            >
              <Tab
                label="Overview"
                value={routesNames.OVERVIEW}
                component={Link}
                to={routesNames.OVERVIEW}
                className="text-font tab_color"
              />
              <Tab label="Company" value={routesNames.COMPANY}
                component={Link}
                to={routesNames.COMPANY} className="text-font tab_color"
              />
              <Tab
                value={routesNames.STORE}
                label="Store"
                component={Link}
                to={routesNames.STORE} className="text-font tab_color"
              />
              <Tab
                value={routesNames.NETWORK}
                label="Network"
                component={Link}
                to={routesNames.NETWORK}
                className="text-font tab_color"
              />
              <Tab
                label="Subscription"
                value={routesNames.SUBSCRIPTION}
                component={Link}
                to={routesNames.SUBSCRIPTION}
                className="text-font tab_color"
              />
            </Tabs>
            <Switch>
              <Redirect from="/profile" exact to={{pathname: routesNames.OVERVIEW}} />
              <Route exact path={routesNames.STORE} component={StoreCard} />
              <Route exact path={routesNames.NETWORK} component={NetworkSettingsCard} />
              <Route exact path={routesNames.OVERVIEW}component={OverviewCard} />
              <Route exact path={routesNames.COMPANY} component={CompanyCard} />
              <Route exact path={routesNames.SUBSCRIPTION} component={SubscriptionCard} />
            </Switch>
          </TabContext>
        </Card>
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
)(Profile)
