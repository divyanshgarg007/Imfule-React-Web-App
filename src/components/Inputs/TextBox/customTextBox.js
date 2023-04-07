import React from 'react'
import {styled} from '@mui/styles'
import TextField from '@mui/material/TextField'
import PropTypes from 'prop-types'
import MyDiv from './customTextBox.style'
const InputField = styled(TextField)({
  '& .MuiInput-underline:after': {
    borderBottomColor: '#aaa',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#aaa',
    },
    '&:hover fieldset': {
      borderColor: '#0628a5',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#aaa',
    },
  },
})


export default function CustomTextBox(props) {
  return (
    <MyDiv>
      <div className={props.error ? 'mb-0' : 'mb-2 placeholder_text'}>
        <InputField
        // {...props}
          fullWidth
          value={props.value}
          error={props.error}
          //helperText={props.helperText}
          onChange={props.onChange}
          type={props.type}
          placeholder={props.fieldlabel}
          disabled={props.disabled || false}
          rows={props.rows || 1}
          variant="outlined"
          size="small"
        />
        {props.error && <div className="error">{props.error}</div>}
      </div>
    </MyDiv>
  )
}
CustomTextBox.propTypes = {
  fieldlabel: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  rows: PropTypes.number,
  error: PropTypes.any,
}
