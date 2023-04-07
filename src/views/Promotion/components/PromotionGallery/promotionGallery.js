import React from 'react'
import {Box, Grid, Skeleton} from '@mui/material'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import {compose} from 'recompose'
import {ActionCreators} from '../../../../redux/actions'
import MyDiv from './promotionGallery.style'


function PromotionGallery(props) {
  console.log(props.selected)
  return (
    <MyDiv>
      <Box mt={3}>
        <Grid container>
          <Grid item xs={12} md={12}>
            {props?.selected?.length > 0 ? <img className="imageCollage" src={props.selected} /> : <Skeleton variant="rectangular" animation="wave" className="collage_skeleton" />
            }
          </Grid>
        </Grid>
      </Box>
    </MyDiv>
  )
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch),
})

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(PromotionGallery)
