import {React, useState} from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import StaticDatePicker from '@mui/lab/StaticDatePicker'
import moment from 'moment'
import {Popover, Box} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import {CustomButton} from '..'
import TimePicker from './timePicker.js'
import MyDiv from './customDateTimePicker.style'

export default function CustomDateTimePicker(props) {
  const [open, setOpen] = useState(false)
  const [btnEL, setBtnEL] = useState()
  const handleBtnClick = (e) => {
    setBtnEL(e.currentTarget)
    setOpen(true)
  }
  // let currentOptions = {
  //     timeZone: props?.timeZone?.timezone ? props?.timeZone?.timezone : 'Asia/Kolkata',
  //     year: 'numeric',
  //     month: 'numeric',
  //     day: 'numeric',
  //     hour: 'numeric',
  //     minute: 'numeric',
  //     second: 'numeric',
  //   },
  //   currentFormatter = new Intl.DateTimeFormat([], currentOptions)
  // let dateNew = currentFormatter.format(new Date())
  // console.log(moment.tz(new Date(), props?.timeZone?.timezone).format(), new Date(dateNew).toString())
  function changeTimeZone(date, timeZone) {
    if (typeof date === 'string') {
      return new Date(
        new Date(date).toLocaleString('en-US', {
          timeZone,
        }),
      )
    }

    return new Date(
      date.toLocaleString('en-US', {
        timeZone,
      }),
    )
  }

  const laDate = changeTimeZone(new Date(), props?.timeZone?.timezone ? props?.timeZone?.timezone : 'Asia/Kolkata')
  return (
    <MyDiv>
      <Box className="dateTime_btn">
        <CustomButton variant="outlined" onClick={handleBtnClick} className="text-font action_button_date_time"
          fieldlabel={props.value ? moment(`${props.value} ${props.hours} ${props.minutes}`, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY HH:mm') : 'Schedule'}
        />
        {props.value &&
        <RefreshIcon onClick={props.handleResetScheduleData} />
        }
      </Box>
      <Popover
        id={Date.now()}
        open={open}
        anchorEl={btnEL}
        onClose={() => setOpen(false)}
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
              right: 50,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        sx={{
          '& .MuiPaper-root': {
            overflow: 'unset',
            marginTop: '1rem',
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={props.value ? moment(props.value).format('DD-MM-YYYY') : ''}
            minDate={laDate}
            allowSameDateSelection
            onChange={(newValue) => {
              props.setValue(moment(newValue).format('DD-MM-YYYY'))
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            handleTimeZoneChange={props.handleTimeZoneChange}
            timeZone={props.timeZone}
            handleHours={props.handleHours}
            hours={props.hours}
            handleMinutes={props.handleMinutes}
            minutes={props.minutes}
          />
          {/* <StaticDateTimePicker
            displayStaticWrapperAs="desktop"
            openTo="day"
            value={props.value}
            onChange={(newValue) => {
              props.setValue(newValue)
            }}
            minDate={new Date()}
            ampm={false}
            ampmInClock={false}
            renderInput={(params) => <TextField {...params} />}
          /> */}
        </LocalizationProvider>
      </Popover>
    </MyDiv>
  )
}
