import * as React from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import {MenuItem, ListItemIcon, Typography} from '@mui/material'
import {styled} from '@mui/styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import InventoryIcon from '@mui/icons-material/Inventory'
import {Add as AddIcon} from '@mui/icons-material'
import {CustomButton, StoreListingDialog} from '../..'
import {getToken} from '../../../utilities/authUtils'
import MyDiv from './header.style'

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
export default function StoreMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(false)
  const open = Boolean(anchorEl)
  const [openListing, setOpenListing] = React.useState(false)

  const handleListingOpen = () => {
    setOpenListing(true)
  }
  const handleListing = () => {
    setOpenListing(false)
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (event) => {
    setAnchorEl(false)
  }
  const handleSelect = (event) => {
    props.onChange(event.currentTarget)
  }
  const [storeName, setStoreName] = React.useState('')
  React.useEffect(() => {
    // eslint-disable-next-line eqeqeq
    if (typeof props.storedata != 'undefined' && props.storedata) {
      let selectStore = props.storedata.filter((store) => store.id === getToken('selectedStore'))
      setStoreName(selectStore[0]?.shop_name)
    }
  }, [props.storedata])
  return (
    <MyDiv>
      <Box className="store_items">
        {/* <CustomButton variant="outlined" fieldLabel={storeName || 'Select Store'} className="text-font store_button" onClick={handleClick} endIcon={<KeyboardArrowDownIcon />} /> */}
        <Typography onClick={handleClick} className="text-font" >{storeName || 'Select Store'} <KeyboardArrowDownIcon /></Typography>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            'overflow': 'visible',
            'filter': 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            'mt': 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        {props.storedata.length > 0 &&
        <div>
          {props.storedata.map((name) => (
            <CustomMenuItem key={name.id} value={name.id} onClick={handleSelect}>
              <ListItemIcon fontSize="small">
                <InventoryIcon />
              </ListItemIcon>{name.shop_name}</CustomMenuItem>
          ))}
        </div>
        }
        {props.storedata.length === 0 &&
        <Box sx={{margin: '6px 15px'}}>
          <CustomButton fieldlabel="Add store" variant="contained" onClick={() => handleListingOpen()} startIcon={<AddIcon />} className="text-font action_button" />
        </Box>
        }
      </Menu>
      <StoreListingDialog openListingPopup={openListing}
        handleListing={handleListing}
      />
    </MyDiv>
  )
}
