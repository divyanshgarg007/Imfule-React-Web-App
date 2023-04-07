import React from 'react'
import Menu from '@mui/material/Menu'
import {styled} from '@mui/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MyDiv from './popoverActions.style'

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

export default function PopoverActions(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleDeletePostedList = (postId, type) => {
    props.handleDeletePostedList(postId, type)
    handleClose()
  }
  const handleEditClick = (postId) => {

    props.handleEditClick(postId)
    handleClose()
  }
  return (
    <MyDiv>
      <IconButton aria-label="delete"
        onClick={handleClick}
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        className="action_icon"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <CustomMenuItem onClick={() => handleEditClick(props.postId)} className="text-font scheduled_menu">
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit</CustomMenuItem>
        <CustomMenuItem onClick={() => handleDeletePostedList(props.postId, 'deletePostedList')} className="text-font scheduled_menu">
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete</CustomMenuItem>
      </Menu>
    </MyDiv>
  )
}
