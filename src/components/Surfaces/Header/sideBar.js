import * as React from 'react'
import {Box, IconButton, Divider, MenuItem} from '@mui/material'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import PropTypes from 'prop-types'
import {Close as CloseIcon} from '@mui/icons-material'
import {NavLink, useLocation} from 'react-router-dom'
import * as routesNames from '../../../constants/routes'
import MyDiv from './header.style'
import StoreMenu from './storeMenu'

export default function Sidebar(props) {
  const location = useLocation()
  const {pathname} = location
  const splitLocation = pathname.split('/')
  const list = (anchor) => (
    <MyDiv>
      <Box
        sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300}}
        role="presentation"
      >
        <IconButton onClick={() => props.toggleSidebar(false)} color="primary" className="mobile_icon">
          <CloseIcon />
        </IconButton>
        <Box sx={{display: {xs: 'display', sm: 'display', md: 'none'}}} className="custom-menu-mobile" >
          <MenuItem className={splitLocation[1] === 'dashboard' ? 'active_menu' : 'menuitem text-font'} onClick={() => props.toggleSidebar(false)}>
            <NavLink to={routesNames.DASHBOARD} style={{textDecoration: 'none'}}>Dashboard
            </NavLink>
          </MenuItem>
          <Divider />
          <MenuItem className={splitLocation[1] === 'profile' ? 'active_menu' : 'menuitem text-font'} onClick={() => props.toggleSidebar(false)}>
            <NavLink to={routesNames.PROFILE} style={{textDecoration: 'none'}}>Settings
            </NavLink>
          </MenuItem>
          <Divider />
          <MenuItem className={splitLocation[1] === 'products' ? 'active_menu' : 'menuitem text-font'} onClick={() => props.toggleSidebar(false)}>
            <NavLink to={routesNames.PRODUCTS_LISTING} style={{textDecoration: 'none'}}>Products
            </NavLink>
          </MenuItem>
          <Divider />
          <MenuItem className={splitLocation[1] === 'calender' ? 'active_menu' : 'menuitem text-font'} onClick={() => props.toggleSidebar(false)}>
            <NavLink to={routesNames.CALENDER} style={{textDecoration: 'none'}}>Calender
            </NavLink>
          </MenuItem>
          <Divider />
          <MenuItem className={splitLocation[1] === 'scheduled' ? 'active_menu' : 'menuitem text-font'} onClick={() => props.toggleSidebar(false)}>
            <NavLink to={routesNames.SCHEDULED} style={{textDecoration: 'none'}}>Upcoming
            </NavLink>
          </MenuItem>
          <Divider />
          <MenuItem className={splitLocation[1] === 'archive' ? 'active_menu' : 'menuitem text-font'} onClick={() => props.toggleSidebar(false)}>
            <NavLink to={routesNames.ARCHIVE} style={{textDecoration: 'none'}}>Archive
            </NavLink>
          </MenuItem>
          <Divider />
          {/* <MenuItem className={splitLocation[1] === 'redirecting' ? 'active_menu' : 'menuitem text-font'}>
            <NavLink to={routesNames.REDIRECTING} style={{textDecoration: 'none'}}>Redirecting
            </NavLink>
          </MenuItem> */}
          <MenuItem className="store_list">
            <StoreMenu
              value={props.selectedStore}
              onChange={props.handleStoreChange}
              storedata={props.storeData}
            />
          </MenuItem>
        </Box>
      </Box>
    </MyDiv>
  )

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor="left"
          open={props.status}
          onClose={() => props.toggleSidebar(false)}
          onOpen={() => props.toggleSidebar(true)}
        >
          {list('left')}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  )
}

Sidebar.propTypes = {
  status: PropTypes.bool,
  toggleSidebar: PropTypes.func,
  selectedStore: PropTypes.any,
  handleStoreChange: PropTypes.func,
  storedata: PropTypes.any,
}
