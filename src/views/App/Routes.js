/* eslint-disable no-unused-vars */
import React from 'react'
import {
  Switch, Route, BrowserRouter, Redirect,
} from 'react-router-dom'

import AppLayout from '../../config/layouts'
import {getToken} from '../../utilities/authUtils'
import * as routesNames from '../../constants/routes'
import {
  Login,
  Signup,
  ForgotPassword,
  UpdatePassword,
  VerifyOTP,
  Dashboard,
  Profile,
  ShopifyResponse,
  ShopifyInstall,
  ProductsListing,
  Calender,
  ForgotChangePassword,
  FacebookResponse,
  PinterestResponse,
  TwitterResponse,
  LinkedinResponse,
  Scheduled,
  Archive,
  OverviewCard,
  SubscriptionCard,
  NetworkSettingsCard,
  StoreCard,
  CompanyCard,
  Redirecting,
  Promotion,
} from '..'

const Routes = () => {
  const PrivateRoute = ({component: Component, ...rest}) => {
    return (<Route
      {...rest}
      render={(props) => getToken('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to={{pathname: routesNames.LOGIN}} />
      )}
    />)
  }

  return (
    <BrowserRouter>
      <Switch>
        <Redirect from="/" exact to={{pathname: routesNames.PROFILE}} />
        <Route exact path={routesNames.LOGIN} component={Login} />
        <Route exact path={routesNames.SIGNUP} component={Signup} />
        <Route exact path={routesNames.FORGOT_PASSWORD} component={ForgotPassword} />
        <Route exact path={routesNames.UPDATE_PASSWORD} component={UpdatePassword} />
        <Route exact path={routesNames.VERIFY_OTP} component={VerifyOTP} />
        <Route exact path={routesNames.SHOPIFY_RESPONSE} component={ShopifyResponse} />
        <Route exact path={routesNames.SHOPIFY_INSTALL} component={ShopifyInstall} />
        <Route exact path={routesNames.FACEBOOK_RESPONSE} component={FacebookResponse} />
        <Route exact path={routesNames.TWITTER_RESPONSE} component={TwitterResponse} />
        <Route exact path={routesNames.PINTEREST_RESPONSE} component={PinterestResponse} />
        <Route exact path={routesNames.LINKEDIN_RESPONSE} component={LinkedinResponse} />
        <Route exact path={routesNames.FORGOT_CHANGE_PASSWORD} component={ForgotChangePassword} />
        <Route exact path={routesNames.REDIRECTING} component={Redirecting} />
        <AppLayout>
          <PrivateRoute exact path={routesNames.DASHBOARD} component={Dashboard} />
          <PrivateRoute path={routesNames.PROFILE} component={Profile} />
          <PrivateRoute exact path={routesNames.CALENDER} component={Calender} />
          <PrivateRoute exact path={routesNames.PRODUCTS_LISTING} component={ProductsListing} />
          <PrivateRoute exact path={routesNames.SCHEDULED} component={Scheduled} />
          <PrivateRoute exact path={routesNames.ARCHIVE} component={Archive} />
          <PrivateRoute exact path={routesNames.PROMOTION} component={Promotion} />
        </AppLayout>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
