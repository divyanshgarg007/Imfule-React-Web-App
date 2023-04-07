import {React, useEffect, useState} from 'react'
import {Box, Card, Typography, Divider, Stepper, Step, StepLabel, StepContent} from '@mui/material'
import {connect, useSelector} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import * as routesNames from '../../../../constants/routes'
import {ActionCreators} from '../../../../redux/actions'
import {CustomOnBoardingSkeleton} from '../../../../components'
import MyDiv from './onBoarding.style'

let steps = [
  {
    id: 'profile_completed',
    label: 'Profile Completion',
    link: routesNames.OVERVIEW,
    active: true,
    className: '',
  },
  {
    id: 'user_shop',
    label: 'Import Shop Store',
    link: routesNames.STORE,
    active: true,
    className: '',
  },
  {
    id: 'user_social_media',
    label: 'Social Media Accounts',
    link: routesNames.NETWORK,
    active: true,
    className: '',
  },
]

function OnBoarding(props) {
  const userState = useSelector((state) => state?.userState)
  const [, setStepperData] = useState()

  useEffect(() => {
    if (!userState?.getStepperData?.data?.payload) {
      props.actions.getStepperAction()
    }
  }, [])
  useEffect(() => {
    if (userState?.getStepperData?.data?.payload) {
      let data = userState?.getStepperData?.data?.payload
      steps.map((step, index) => {
        step.active = !((typeof (data[step.id]) !== 'undefined' && data[step.id] !== 0))
        step.className = ((typeof (data[step.id]) !== 'undefined' && data[step.id] !== 0)) ? 'completed' : ''
      })
      setStepperData(data)
    }
  }, [userState?.getStepperData])

  return (
    <MyDiv>
      {(userState?.getStepperData?.loading) &&
        <div>
          <CustomOnBoardingSkeleton />
        </div>
      }
      {!(userState?.getStepperData?.loading) &&
        <Card className="onboarding_card adjust_card">
          <Box className="onboarding_card_header">
            <Typography gutterBottom variant="h5" component="div" className="text-font onboarding_card_title">
              {props.steptitle}
            </Typography>
            <Typography variant="body2" className="onboarding_card_subtitle text-font">
              {props.stepsubtitle}
            </Typography>
            <Divider />
          </Box>
          <Box className="onboarding_card_list">
            <Stepper orientation="vertical">
              {steps.map((step, index) => (
                <Step key={index} active={step.active}
                  className={step.className}
                >
                  <StepLabel className="steps-heading">
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Box>
                      <div className="config_btn">
                        <Link to={step.link} >
                          <Typography className="text-font">Configure</Typography>
                        </Link>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Card>
      }
    </MyDiv>
  )
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(OnBoarding)
