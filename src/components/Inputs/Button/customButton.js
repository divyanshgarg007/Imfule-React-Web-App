import React from 'react'
import {Button, CircularProgress} from '@mui/material'
import PropTypes from 'prop-types'
import MyDiv from './customButton.style'
export default function CustomButton(props) {
  return (
    <MyDiv>
      <Button
        {...props}
        type={props.type}
        fullWidth
        borderradius={20}
        size="medium"
        disableElevation
        className={props.className}
      >
        {
          props.loading ?
            <>
              <CircularProgress size={25} className="progress_icon" />
              <div className="progress_text">
                {props.fieldlabel}
              </div>
            </>
            :
            <div>
              {props.fieldlabel}
            </div>
        }
      </Button>
    </MyDiv>
  )
}
CustomButton.propTypes = {
  fieldlabel: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
}

