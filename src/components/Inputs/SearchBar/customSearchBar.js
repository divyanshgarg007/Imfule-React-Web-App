import React from 'react'
import {styled} from '@mui/material/styles'
import {Box, InputBase} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import MyDiv from './customSearchBar.style'

const Search = styled('div')(({theme}) => ({
  position: 'relative',
}))

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#283c86',
}))

const StyledInputBase = styled(InputBase)(({theme}) => ({
  'color': 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 0, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      border: '1px solid #c4c4c4',
      borderRadius: '4px',
    },
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      border: '1px solid #c4c4c4',
      borderRadius: '4px',
    },
  },
}))

export default function CustomSearchBar(props) {
  return (
    <MyDiv>
      <Box className="search_box">
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase className="search_wrap"
            inputProps={{'aria-label': 'search'}}
            onChange={props.onChange}
          />
        </Search>
      </Box>
    </MyDiv>
  )
}
