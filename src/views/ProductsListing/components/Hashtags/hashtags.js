import React, {useState} from 'react'
import {MultiSelect} from 'react-multi-select-component'
import {Menu} from '@mui/material'
import MyDiv from './hashtags.style'

export default function Hashtags(props) {

  const options = [
    {label: 'Grapes 🍇', value: 'grapes'},
    {label: 'Mango 🥭', value: 'mango'},
    {label: 'Strawberry 🍓', value: 'strawberry'},
    {label: 'Watermelon 🍉', value: 'watermelon'},
    {label: 'Pear 🍐', value: 'pear', disabled: true},
    {label: 'Apple 🍎', value: 'apple'},
    {label: 'Tangerine 🍊', value: 'tangerine'},
    {label: 'Pineapple 🍍', value: 'pineapple'},
    {label: 'Peach 🍑', value: 'peach'},
  ]

  const [selected, setSelected] = useState([])

  return (
    <MyDiv>
      <Menu className="hashtag_list"
        anchorEl={props.openHashtag}
        open={props.open}
        onClose={props.closeHashtag}
        PaperProps={{
          elevation: 0,
          sx: {
            'overflow': 'visible',
            'filter': 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            'mt': 1.5,
            'width': 300,
            'padding': '3px 10px',
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
              left: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{horizontal: 'left', vertical: 'top'}}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
      >
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy={'Select'}
        />
      </Menu>
    </MyDiv>
  )
}
