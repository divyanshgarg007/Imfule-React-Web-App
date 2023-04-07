import React from 'react'
import {Grid, Box, Card, Typography} from '@mui/material'
import {CustomButton, CustomTextBox} from '../../components'
import Welcome from '../../images/logo.png'
import MyDiv from './updatePassword.style'
const UpdatePassword = React.memo((props) => {
  return (
    <MyDiv>
      <Box>
        <Grid container mt={4} mb={4}>
          <Grid item md={4} xs={12} />
          <Grid item md={4} xs={12}>
            <div className="welcome_img">
              <img src={Welcome} alt="pic" />
            </div>
            <div className="sign_in">
              <Card elevation={3} className="custom-card">
                <div className="custom-card-body">
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    textAlign="center"
                  >
                    Update password
                  </Typography>
                  <Grid>
                    <form noValidate autoComplete="off">
                      <Box sx={{p: 2}}>
                        <CustomTextBox fieldlabel="Old password" type="password" />
                      </Box>
                      <Box sx={{p: 2}}>
                        <CustomTextBox fieldlabel="New password" type="password" />
                      </Box>
                      <Box sx={{p: 2}}>
                        <CustomTextBox fieldlabel="Confirm password" type="password" />
                      </Box>
                      <Box sx={{p: 2}}>
                        <CustomButton fieldlabel="Submit" variant="contained" />
                      </Box>
                    </form>
                  </Grid>
                </div>
              </Card>
            </div>
          </Grid>
          <Grid item md={4} xs={12} />
        </Grid>
      </Box>
    </MyDiv>
  )
})
export default UpdatePassword
