import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import {UpcomingPosts, RecentPosts, OnBoarding} from './components'
import MyDiv from './dashboard.style'

export default function Dashboard() {
  return (
    <MyDiv>
      <Box className="dashboard_box">
        <Grid container rowSpacing={3} columnSpacing={{xs: 1, sm: 3, md: 3}}>
          <Grid item xs={12} sm={6} md={4}>
            <OnBoarding steptitle="On Boarding" stepsubtitle="This Is Your Profile Completion" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <UpcomingPosts upcomingtitle="Upcoming Posts" upcomingsubtitle="Some New Upcoming Posts Are Here" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <RecentPosts latesttitle="Recent Posts" latestsubtitle="Some New Recent Posts Are Here" />
          </Grid>
        </Grid>
      </Box>
    </MyDiv>
  )
}
