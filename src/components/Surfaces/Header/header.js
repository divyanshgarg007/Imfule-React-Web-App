import React, {useEffect, useState} from 'react'
import {Box, Toolbar, IconButton, Typography, Menu, MenuItem, Stack, Avatar, AppBar, ListItemIcon} from '@mui/material'
import {NavLink, useHistory, withRouter, useLocation, Link} from 'react-router-dom'
import {Person, Logout, Menu as MenuIcon} from '@mui/icons-material'
import {connect, useSelector} from 'react-redux'
import {bindActionCreators} from 'redux'
import {styled} from '@mui/styles'
import {compose} from 'recompose'
import Welcome from '../../../images/logo.png'
import * as routesNames from '../../../constants/routes'
import {ActionCreators} from '../../../redux/actions'
import {setToken, getToken, removeToken} from '../../../utilities/authUtils'
import MyDiv from './header.style'
import Sidebar from './sideBar'
import StoreMenu from './storeMenu'

const CustomMenuItem = styled(MenuItem)(({theme}) => ({
  '&.MuiMenuItem-root': {
    color: '#000',
    fontWeight: '500',
    fontSize: '0.9rem',
    fontFamily: 'Poppins',
    textTransform: 'capitalize',
  },
  '& .MuiListItemIcon-root': {
    color: '#283c86!important',
  },
}))
const Header = (props) => {
  const [anchorEl, setAnchorEl] = useState(false)
  const [sideBarState, setSideBarState] = useState(false)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(false)
  const authState = useSelector((state) => state.authState)
  const userState = useSelector((state) => state.userState)
  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const [storeData, setStoreData] = useState([])
  const [selectedStore, setSelectedStore] = useState('')
  const router = useHistory()
  const location = useLocation()
  const {pathname} = location
  const splitLocation = pathname.split('/')
  // const classes = infoDropdown()
  useEffect(() => {
    setTimeout(props.actions.getStoreAction(), 5000)
    if (!authState?.session?.data) {
      props.actions.checkSession()
    }
    props.actions.getTimeZoneList()
  }, [])

  useEffect(() => {
    if (!userState?.connectedSocialMediaWithShops?.isLoaded && authState?.session?.data?.company_id && userState?.getStore?.data?.payload[0]?.id) {
      props.actions.connectedSocialMediaWithShopsAction()
    }
  }, [authState?.session?.data?.company_id, userState?.getStore?.data?.payload[0]?.id])

  useEffect(() => {
    if (userState?.getStore?.data?.payload && userState?.getStore?.data?.payload[0]) {
      setStoreData(userState.getStore.data.payload)
      if (!getToken('selectedStore')) {
        setSelectedStore(userState?.getStore?.data?.payload[0]?.id)
        setToken('selectedStore', userState?.getStore?.data?.payload[0]?.id)
      } else {
        setSelectedStore(getToken('selectedStore'))
      }
    }
  }, [userState.getStore])
  useEffect(() => {
    if (authState?.signOut?.data?.payload || authState?.signOut?.error || authState?.signOut?.data === 'invalidUser') {
      props.actions.cleanUpState()
      router.push(routesNames.LOGIN)
      removeToken('companyID')
      removeToken('selectedStore')
      removeToken('token')
    }
  }, [authState?.signOut])
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(false)
  }

  const handleMenuClose = () => {
    setAnchorEl(false)
    handleMobileMenuClose()
  }
  const handleLogout = () => {
    props.actions.logout()
    handleMenuClose()
  }
  const handleProfile = () => {
    router.push(routesNames.OVERVIEW)
    handleMenuClose()
  }
  const getCompanyID = (storeID) => {
    let item = storeData.find((data) => data.id === storeID)
    return item && item.company_id
  }
  const handleStoreChange = (event) => {
    setSelectedStore(event.value)
    setToken('selectedStore', event.value)
    const companyID = getCompanyID(event.value)
    if (companyID) {
      setToken('companyID', companyID)
      window.location.reload()
    }
  }
  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <CustomMenuItem onClick={handleProfile}>
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        My Profile
      </CustomMenuItem>
      <CustomMenuItem onClick={handleLogout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </CustomMenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    />
  )

  return (
    <MyDiv>
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static" className="custom-header">
          <Toolbar elevation={1} className="center_align">
            <IconButton className="drawer-icon"
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{display: {xs: 'block', sm: 'none'}}}
              onClick={() => setSideBarState(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{display: {xs: 'block', sm: 'block'}}}
              className="logo-web"
            >
              <Link to={routesNames.DASHBOARD}>
                <img src={Welcome} alt="pic" />
              </Link>

            </Typography>
            <Box sx={{display: {xs: 'none', sm: 'flex', md: 'flex'}}} className="custom-menu">
              <MenuItem className={splitLocation[1] === 'dashboard' ? 'active_menu' : 'menuitem text-font'}>
                <NavLink to={routesNames.DASHBOARD} style={{textDecoration: 'none'}}>Dashboard
                </NavLink>
              </MenuItem>
              <MenuItem className={splitLocation[1] === 'products' ? 'active_menu' : 'menuitem text-font'}>
                <NavLink to={routesNames.PRODUCTS_LISTING} style={{textDecoration: 'none'}}>Products
                </NavLink>
              </MenuItem>
              <MenuItem className={splitLocation[1] === 'calender' ? 'active_menu' : 'menuitem text-font'}>
                <NavLink to={routesNames.CALENDER} style={{textDecoration: 'none'}}>Calender
                </NavLink>
              </MenuItem>
              <MenuItem className={splitLocation[1] === 'scheduled' ? 'active_menu' : 'menuitem text-font'}>
                <NavLink to={routesNames.SCHEDULED} style={{textDecoration: 'none'}}>Upcoming
                </NavLink>
              </MenuItem>
              <MenuItem className={splitLocation[1] === 'archive' ? 'active_menu' : 'menuitem text-font'}>
                <NavLink to={routesNames.ARCHIVE} style={{textDecoration: 'none'}}>Archive
                </NavLink>
              </MenuItem>
              <MenuItem className={splitLocation[1] === 'promotion' ? 'active_menu' : 'menuitem text-font'}>
                <NavLink to={routesNames.PROMOTION} style={{textDecoration: 'none'}}>Promotion
                </NavLink>
              </MenuItem>
              <MenuItem className={splitLocation[1] === 'profile' ? 'active_menu' : 'menuitem text-font'}>
                <NavLink to={routesNames.OVERVIEW} style={{textDecoration: 'none'}}>Settings
                </NavLink>
              </MenuItem>
            </Box>
            <Box sx={{display: {xs: 'none', md: 'flex'}, columnGap: '15px'}} >
              <MenuItem className="store_list">
                <StoreMenu
                  value={selectedStore}
                  onChange={handleStoreChange}
                  storedata={storeData}
                />
              </MenuItem>
              <Stack
                direction="row"
                spacing={2}
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar alt="Remy Sharp" className="custom_avatar" />
              </Stack>
            </Box>
            <Box sx={{display: {xs: 'flex', md: 'none'}}} >
              <Stack
                direction="row"
                spacing={2}
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar alt="Remy Sharp" className="custom_avatar" />
              </Stack>
            </Box>
          </Toolbar>
          <Sidebar selectedStore={selectedStore} handleStoreChange={handleStoreChange} storeData={storeData} toggleSidebar={setSideBarState} status={sideBarState} />
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
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
)(Header)
