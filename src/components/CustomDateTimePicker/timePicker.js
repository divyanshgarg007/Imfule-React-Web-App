import React from 'react'
import {Box, Grid, Typography} from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import {useSelector} from 'react-redux'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import MyDiv from './customDateTimePicker.style'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 'auto',
    },
  },
}

const hourData = [...Array(24).keys()]
const minuteData = [
  '00',
  '15',
  '30',
  '45',
]

export default function TimePicker(props) {

  const masterState = useSelector((state) => state.masterState)
  const data1 = []
  masterState?.timeZoneList?.data?.payload?.map((data) => {
    let obj = {
      timezone: data.timezone,
      id: data.id,
    }
    return data1.push(obj)
  })

  return (
    <MyDiv>
      <Grid container spacing={1} className="time_grid">
        <Grid item xs={6} sm={3} md={3}>
          <Box>
            <Typography
              variant="h6"
              color="text.primary"
              fontSize="0.9rem"
              className="text-font"
            >
              Hours
            </Typography>
            <FormControl fullWidth size="small">
              <Select className="custom-media-select"
                id="hours"
                value={String(props.hours).padStart(2, 0)}
                onChange={props.handleHours}
                MenuProps={MenuProps}
              >
                {hourData.map((hour) => (
                  <MenuItem
                    key={hour}
                    value={String(hour).padStart(2, 0)}
                    dense
                  >
                    {String(hour).padStart(2, 0)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6} sm={3} md={3}>
          <Box>
            <Typography
              variant="h6"
              color="text.primary"
              fontSize="0.9rem"
              className="text-font"
            >
              Minutes
            </Typography>
            <FormControl fullWidth size="small">
              <Select className="custom-media-select"
                id="minutes"
                value={props.minutes}
                onChange={props.handleMinutes}
                MenuProps={MenuProps}
              >
                {minuteData.map((minute) => (
                  <MenuItem
                    key={minute}
                    value={minute}
                    dense
                  >
                    {minute}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box>
            <Typography
              variant="h6"
              color="text.primary"
              fontSize="0.9rem"
              className="text-font"
            >
              Time Zone
            </Typography>
            <Autocomplete
              className="timezone_box"
              fullWidth
              disableClearable
              options={data1}
              value={props.timeZone}
              onChange={(newValue, receivedValue) => props.handleTimeZoneChange(newValue, receivedValue)}
              getOptionSelected={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.timezone}
              size="small"
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </Box>
        </Grid>
      </Grid>
    </MyDiv>
  )
}
